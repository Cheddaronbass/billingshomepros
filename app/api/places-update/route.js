import { createClient } from "@supabase/supabase-js";

function normalizePhone(phone) {
  return (phone || "").replace(/\D/g, "").slice(-10);
}

function normalizeDomain(url) {
  if (!url) return "";

  try {
    return new URL(url).hostname
      .replace(/^www\./, "")
      .toLowerCase();
  } catch {
    return "";
  }
}

function normalizeName(name) {
  return (name || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\b(incorporated|inc|llc|ltd|corp|corporation|co|company)\b/g, "")
    .replace(/[^a-z0-9]/g, "");
}

async function searchGoogle(textQuery) {
  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount",
      },
      body: JSON.stringify({
        textQuery,
        pageSize: 3,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message || "Google Places search failed."
    );
  }

  return data.places || [];
}

export async function POST(request) {
  try {
    const adminSecret = request.headers.get("x-admin-secret");

    if (
      !adminSecret ||
      adminSecret !== process.env.ADMIN_API_SECRET
    ) {
      return Response.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    );

    const { data: businesses, error } = await supabase
      .from("businesses")
      .select(
        "id,name,phone,website,service_area,google_match_status"
      )
      .eq("google_match_status", "unmatched")
      .order("id")
      .limit(5);

    if (error) {
      console.error("Business lookup error:", error);

      return Response.json(
        {
          error: "Unable to load businesses.",
          details: error.message,
          code: error.code,
        },
        { status: 500 }
      );
    }

    const results = [];

    for (const business of businesses) {
      let candidates = [];
      let searchMethod = "name";

      try {
        // First try the normal business-name search.
        candidates = await searchGoogle(
          `${business.name} Billings Montana`
        );

        // If Google found nothing, retry using the phone number.
        if (!candidates.length && business.phone) {
          searchMethod = "phone";

          candidates = await searchGoogle(
            `${business.phone} Billings Montana`
          );
        }
      } catch (googleError) {
        console.error(
          `Google search error for business ${business.id}:`,
          googleError
        );

        results.push({
          id: business.id,
          name: business.name,
          status: "google_error",
        });

        continue;
      }

      if (!candidates.length) {
        const { error: updateError } = await supabase
          .from("businesses")
          .update({
            google_match_status: "not_found",
          })
          .eq("id", business.id);

        if (updateError) {
          results.push({
            id: business.id,
            name: business.name,
            status: "database_error",
          });

          continue;
        }

        results.push({
          id: business.id,
          name: business.name,
          status: "not_found",
          searchMethod,
        });

        continue;
      }

      // Prefer a candidate whose phone or website matches our record.
      let candidate =
        candidates.find((place) => {
          const phoneMatch =
            normalizePhone(business.phone) &&
            normalizePhone(business.phone) ===
              normalizePhone(place.nationalPhoneNumber);

          const websiteMatch =
            normalizeDomain(business.website) &&
            normalizeDomain(business.website) ===
              normalizeDomain(place.websiteUri);

          return phoneMatch || websiteMatch;
        }) || candidates[0];

      const nameMatch =
        normalizeName(business.name) ===
        normalizeName(candidate.displayName?.text);

      const phoneMatch =
        normalizePhone(business.phone) &&
        normalizePhone(business.phone) ===
          normalizePhone(candidate.nationalPhoneNumber);

      const websiteMatch =
        normalizeDomain(business.website) &&
        normalizeDomain(business.website) ===
          normalizeDomain(candidate.websiteUri);

      if (nameMatch && (phoneMatch || websiteMatch)) {
        const { error: updateError } = await supabase
          .from("businesses")
          .update({
            google_place_id: candidate.id,
            google_rating: candidate.rating ?? null,
            google_review_count:
              candidate.userRatingCount ?? null,
            google_match_status: "matched",
            google_last_updated: new Date().toISOString(),
          })
          .eq("id", business.id);

        if (updateError) {
          results.push({
            id: business.id,
            name: business.name,
            status: "database_error",
          });

          continue;
        }

        results.push({
          id: business.id,
          name: business.name,
          status: "matched",
          rating: candidate.rating ?? null,
          reviews: candidate.userRatingCount ?? null,
          searchMethod,
        });
      } else {
        const { error: updateError } = await supabase
          .from("businesses")
          .update({
            google_match_status: "review",
          })
          .eq("id", business.id);

        if (updateError) {
          results.push({
            id: business.id,
            name: business.name,
            status: "database_error",
          });

          continue;
        }

        results.push({
          id: business.id,
          name: business.name,
          status: "review",
          googleCandidate:
            candidate.displayName?.text || null,
          phoneMatch: Boolean(phoneMatch),
          websiteMatch: Boolean(websiteMatch),
          nameMatch: Boolean(nameMatch),
          searchMethod,
        });
      }
    }

    return Response.json({
      businessesProcessed: results.length,
      results,
    });
  } catch (error) {
    console.error("Places update error:", error);

    return Response.json(
      {
        error: "Something went wrong.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
