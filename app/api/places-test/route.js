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
    .replace(/[^a-z0-9]/g, "");
}

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_PUBLISHABLE_KEY
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
        { error: "Unable to load businesses." },
        { status: 500 }
      );
    }

    const results = [];

    for (const business of businesses) {
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
            textQuery: `${business.name} Billings Montana`,
            pageSize: 3,
          }),
        }
      );

      const googleData = await response.json();

      if (!response.ok) {
        results.push({
          business,
          status: "error",
          googleError: googleData,
        });

        continue;
      }

      const candidates = googleData.places || [];

      if (candidates.length === 0) {
        results.push({
          business,
          status: "not_found",
          candidate: null,
        });

        continue;
      }

      const candidate = candidates[0];

      const directoryPhone = normalizePhone(business.phone);
      const googlePhone = normalizePhone(
        candidate.nationalPhoneNumber
      );

      const directoryDomain = normalizeDomain(business.website);
      const googleDomain = normalizeDomain(candidate.websiteUri);

      const directoryName = normalizeName(business.name);
      const googleName = normalizeName(
        candidate.displayName?.text
      );

      const phoneMatch =
        directoryPhone &&
        googlePhone &&
        directoryPhone === googlePhone;

      const websiteMatch =
        directoryDomain &&
        googleDomain &&
        directoryDomain === googleDomain;

      const nameMatch =
        directoryName &&
        googleName &&
        directoryName === googleName;

      let status = "review";

      if (nameMatch && (phoneMatch || websiteMatch)) {
        status = "strong_match";
      }

      results.push({
        business,
        status,
        matchChecks: {
          nameMatch: Boolean(nameMatch),
          phoneMatch: Boolean(phoneMatch),
          websiteMatch: Boolean(websiteMatch),
        },
        candidate,
      });
    }

    return Response.json({
      mode: "PREVIEW ONLY - NO DATABASE CHANGES",
      businessesChecked: results.length,
      results,
    });
  } catch (error) {
    console.error("Bulk Places preview error:", error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
