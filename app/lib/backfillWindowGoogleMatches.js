import "server-only";
import { findGooglePlaceCandidate } from "./findGooglePlaceCandidate";

// The Windows & Doors importer adds qualified installers but does not invent
// Google Place IDs. Backfill only high-confidence, local, operational matches.
// Each scheduled run searches at most five pending records to bound API usage.
function normalizeName(name = "") {
  return String(name)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\b(incorporated|inc|llc|ltd|corp|corporation|co|company)\b/g, "")
    .replace(/[^a-z0-9]/g, "");
}

export async function backfillWindowGoogleMatches(db) {
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    return { checked: 0, matched: 0, review: 0, notFound: 0, errors: 0, unavailable: true };
  }

  const { data, error } = await db.from("businesses")
    .select("id,name,phone,website,category,services,google_place_id,google_match_status")
    .or('category.eq.windows-doors,services.cs.{"Windows & Doors"}')
    .is("google_place_id", null)
    .order("id", { ascending: true })
    .limit(100);
  if (error) {
    console.error("Windows Google matching: listing lookup failed", error.code);
    return { checked: 0, matched: 0, review: 0, notFound: 0, errors: 1 };
  }

  const pending = (data || [])
    .filter((business) => !business.google_match_status || business.google_match_status === "unmatched")
    .slice(0, 5);
  const counts = { checked: pending.length, matched: 0, review: 0, notFound: 0, errors: 0 };
  await Promise.all(pending.map(async (business) => {
    try {
      // Never search by name alone for an automatic approval.
      if (!business.phone || String(business.phone).replace(/\D/g, "").length < 10) {
        const { error: writeError } = await db.from("businesses")
          .update({ google_match_status: "review" })
          .eq("id", business.id).is("google_place_id", null);
        if (writeError) throw writeError;
        counts.review += 1;
        return;
      }
      const { candidates } = await findGooglePlaceCandidate({
        name: business.name,
        phone: business.phone,
      });
      const match = candidates.find((candidate) =>
        candidate.phoneMatches &&
        normalizeName(candidate.name) === normalizeName(business.name) &&
        candidate.businessStatus === "OPERATIONAL" &&
        /\b(Billings|Laurel)\b/i.test(candidate.address) &&
        /\b(MT|Montana)\b/i.test(candidate.address)
      );
      if (match) {
        // One Google identity must not be assigned to two BHP records.
        const { data: used, error: duplicateError } = await db.from("businesses")
          .select("id").eq("google_place_id", match.placeId).neq("id", business.id).limit(1);
        if (duplicateError) throw duplicateError;
        if (used?.length) {
          const { error: writeError } = await db.from("businesses")
            .update({ google_match_status: "review" })
            .eq("id", business.id).is("google_place_id", null);
          if (writeError) throw writeError;
          counts.review += 1;
          return;
        }
        const { data: saved, error: writeError } = await db.from("businesses")
          .update({
            google_place_id: match.placeId,
            google_match_status: "matched",
            google_last_updated: new Date().toISOString(),
          })
          .eq("id", business.id).is("google_place_id", null)
          .select("id");
        if (writeError) throw writeError;
        if (saved?.length) counts.matched += 1;
        return;
      }
      const nextStatus = candidates.length ? "review" : "not_found";
      const { error: writeError } = await db.from("businesses")
        .update({ google_match_status: nextStatus })
        .eq("id", business.id).is("google_place_id", null);
      if (writeError) throw writeError;
      if (nextStatus === "review") counts.review += 1;
      else counts.notFound += 1;
    } catch (error) {
      // Keep failed items pending so a temporary Google outage can retry.
      console.error("Windows Google matching failed for listing", business.id, error?.message);
      counts.errors += 1;
    }
  }));
  console.info("Windows Google matching summary", counts);
  return counts;
}
