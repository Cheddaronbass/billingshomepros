// One-time operator-triggered Google identity matching for BHP Windows & Doors.
// Run only in a production Vercel build with existing server-side credentials.
// No guessed place IDs; uncertain matches are left for manual review.
const { createClient } = require("@supabase/supabase-js");

const digits = (s) => String(s || "").replace(/\D/g, "").slice(-10);
const normalize = (s) => String(s || "").toLowerCase()
  .replace(/&/g, "and")
  .replace(/\b(incorporated|inc|llc|ltd|corp|corporation|co|company)\b/g, "")
  .replace(/[^a-z0-9]/g, "");

async function main() {
  if (process.env.VERCEL_ENV !== "production") {
    console.log("BHP_GOOGLE_ONEOFF", JSON.stringify({ skipped: "not_production" }));
    return;
  }
  const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const googleKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!dbUrl || !key || !googleKey) {
    console.log("BHP_GOOGLE_ONEOFF", JSON.stringify({ skipped: "credentials_unavailable_in_build" }));
    return;
  }
  const db = createClient(dbUrl, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data, error } = await db.from("businesses")
    .select("id,name,phone,google_match_status,google_place_id")
    .or('category.eq.windows-doors,services.cs.{"Windows & Doors"}')
    .is("google_place_id", null)
    .order("id", { ascending: true })
    .limit(35);
  if (error) throw new Error("Listing selection failed: " + error.code);

  const counts = { candidates: data.length, searched: 0, matched: 0, review: 0, notFound: 0, errors: 0 };
  const details = [];
  for (const business of data) {
    let state = "error";
    try {
      if (digits(business.phone).length !== 10) {
        state = "review";
      } else {
        counts.searched++;
        const resp = await fetch("https://places.googleapis.com/v1/places:searchText", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": googleKey,
            "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.businessStatus",
          },
          body: JSON.stringify({ textQuery: business.name + " Billings MT", maxResultCount: 5 }),
          signal: AbortSignal.timeout(12000),
        });
        if (!resp.ok) throw new Error("Google HTTP " + resp.status);
        const places = (await resp.json()).places || [];
        const match = places.find((place) =>
          place.id &&
          place.businessStatus === "OPERATIONAL" &&
          digits(place.nationalPhoneNumber) === digits(business.phone) &&
          normalize(place.displayName?.text) === normalize(business.name) &&
          /\b(Billings|Laurel)\b/i.test(place.formattedAddress || "") &&
          /\b(MT|Montana)\b/i.test(place.formattedAddress || ""));
        if (match) {
          const { data: alreadyUsed, error: dupeError } = await db.from("businesses")
            .select("id").eq("google_place_id", match.id).neq("id", business.id).limit(1);
          if (dupeError) throw new Error("Duplicate lookup failed");
          if (alreadyUsed && alreadyUsed.length) {
            state = "review";
          } else {
            const { data: written, error: writeError } = await db.from("businesses")
              .update({ google_place_id: match.id, google_match_status: "matched", google_last_updated: new Date().toISOString() })
              .eq("id", business.id).is("google_place_id", null).select("id");
            if (writeError) throw new Error("Match save failed");
            state = written?.length ? "matched" : "review";
          }
        } else {
          state = places.length ? "review" : "notFound";
        }
      }
      if (state !== "matched") {
        const { error: updateError } = await db.from("businesses")
          .update({ google_match_status: state === "notFound" ? "not_found" : "review" })
          .eq("id", business.id).is("google_place_id", null);
        if (updateError) throw new Error("Review queue save failed");
      }
      counts[state]++;
    } catch (err) {
      counts.errors++;
      // Do not change database status if Google or Supabase temporarily fails.
      state = "error";
      console.error("BHP_GOOGLE_ONEOFF_ERROR", JSON.stringify({ name: business.name, reason: err.message }));
    }
    details.push({ name: business.name, status: state });
  }
  console.log("BHP_GOOGLE_ONEOFF", JSON.stringify({ ...counts, details }));
}
main().catch(err => { console.error("BHP_GOOGLE_ONEOFF_FATAL", err.message); process.exitCode = 1; });
