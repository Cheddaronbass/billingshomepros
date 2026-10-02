import { createClient } from "@supabase/supabase-js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get("id");

    if (!businessId) {
      return Response.json(
        { error: "Business ID is required." },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_PUBLISHABLE_KEY
    );

    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select(
        "id,name,phone,website,service_area,google_place_id,google_rating,google_review_count"
      )
      .eq("id", businessId)
      .single();

    if (businessError || !business) {
      console.error("Business lookup error:", businessError);

      return Response.json(
        { error: "Business not found." },
        { status: 404 }
      );
    }

    const queryParts = [
      business.name,
      business.service_area || "Billings, Montana",
    ];

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
          textQuery: queryParts.join(" "),
          pageSize: 3,
        }),
      }
    );

    const googleData = await response.json();

    if (!response.ok) {
      console.error("Google Places error:", googleData);

      return Response.json(
        {
          error: "Google Places request failed.",
          details: googleData,
        },
        { status: response.status }
      );
    }

    return Response.json({
      directoryBusiness: business,
      googleCandidates: googleData.places || [],
    });
  } catch (error) {
    console.error("Places match test error:", error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
