import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

function normalizePhone(phone = "") {
  return phone.replace(/\D/g, "").slice(-10);
}

function normalizeDomain(url = "") {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

export async function POST(request) {
  try {
    // Protect this route
    const adminSecret = request.headers.get("x-admin-secret");

    if (!adminSecret || adminSecret !== process.env.ADMIN_API_SECRET) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const businessId = Number(body.businessId);

    if (!businessId) {
      return Response.json(
        { error: "A valid businessId is required." },
        { status: 400 }
      );
    }

    // Load the business
    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id,name,phone,website,google_match_status")
      .eq("id", businessId)
      .single();

    if (businessError || !business) {
      return Response.json(
        {
          error: "Business not found.",
          details: businessError?.message,
        },
        { status: 404 }
      );
    }

    if (business.google_match_status !== "review") {
      return Response.json(
        {
          error: "Business is not awaiting Google review.",
          currentStatus: business.google_match_status,
        },
        { status: 400 }
      );
    }

    // Search Google again so we don't trust candidate data from the browser
    const googleResponse = await fetch(
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

    if (!googleResponse.ok) {
      const googleError = await googleResponse.text();

      return Response.json(
        {
          error: "Google Places search failed.",
          details: googleError,
        },
        { status: 502 }
      );
    }

    const googleData = await googleResponse.json();
    const candidates = googleData.places || [];

    if (!candidates.length) {
      return Response.json(
        { error: "No Google candidate found." },
        { status: 404 }
      );
    }

    // Pick the strongest candidate based on phone/website
    const businessPhone = normalizePhone(business.phone);
    const businessDomain = normalizeDomain(business.website);

    let bestCandidate = null;
    let bestScore = -1;

    for (const candidate of candidates) {
      const candidatePhone = normalizePhone(candidate.nationalPhoneNumber);
      const candidateDomain = normalizeDomain(candidate.websiteUri);

      let score = 0;

      if (
        businessPhone &&
        candidatePhone &&
        businessPhone === candidatePhone
      ) {
        score += 2;
      }

      if (
        businessDomain &&
        candidateDomain &&
        businessDomain === candidateDomain
      ) {
        score += 2;
      }

      if (score > bestScore) {
        bestScore = score;
        bestCandidate = candidate;
      }
    }

    if (!bestCandidate || bestScore < 2) {
      return Response.json(
        {
          error: "No sufficiently strong candidate found.",
          candidates: candidates.map((candidate) => ({
            name: candidate.displayName?.text,
            phone: candidate.nationalPhoneNumber,
            website: candidate.websiteUri,
            address: candidate.formattedAddress,
          })),
        },
        { status: 400 }
      );
    }

    // Save approved Google data
    const { error: updateError } = await supabase
      .from("businesses")
      .update({
        google_place_id: bestCandidate.id,
        google_rating: bestCandidate.rating ?? null,
        google_review_count: bestCandidate.userRatingCount ?? null,
        google_match_status: "matched",
        google_last_updated: new Date().toISOString(),
      })
      .eq("id", business.id);

    if (updateError) {
      return Response.json(
        {
          error: "Unable to update business.",
          details: updateError.message,
          code: updateError.code,
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      businessId: business.id,
      businessName: business.name,
      googleCandidate: bestCandidate.displayName?.text,
      placeId: bestCandidate.id,
      rating: bestCandidate.rating ?? null,
      reviews: bestCandidate.userRatingCount ?? null,
      phoneMatch:
        normalizePhone(business.phone) ===
        normalizePhone(bestCandidate.nationalPhoneNumber),
      websiteMatch:
        normalizeDomain(business.website) ===
        normalizeDomain(bestCandidate.websiteUri),
    });
  } catch (error) {
    console.error("Places approval error:", error);

    return Response.json(
      {
        error: "Unexpected server error.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
