import { createClient } from "@supabase/supabase-js";

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

    // Refresh the 10 businesses that have gone the longest
    // without a Google update.
    const { data: businesses, error } = await supabase
      .from("businesses")
      .select(
        "id,name,google_place_id,google_rating,google_review_count,google_last_updated"
      )
      .eq("google_match_status", "matched")
      .not("google_place_id", "is", null)
      .order("google_last_updated", {
        ascending: true,
        nullsFirst: true,
      })
      .limit(10);

    if (error) {
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
      try {
        const response = await fetch(
          `https://places.googleapis.com/v1/places/${business.google_place_id}`,
          {
            headers: {
              "X-Goog-Api-Key":
                process.env.GOOGLE_PLACES_API_KEY,
              "X-Goog-FieldMask":
                "id,displayName,rating,userRatingCount",
            },
          }
        );

        const googleData = await response.json();

        if (!response.ok) {
          results.push({
            id: business.id,
            name: business.name,
            status: "google_error",
          });

          continue;
        }

        const newRating =
          googleData.rating ?? null;

        const newReviewCount =
          googleData.userRatingCount ?? null;

        const ratingChanged =
          business.google_rating !== newRating;

        const reviewCountChanged =
          business.google_review_count !== newReviewCount;

        const { error: updateError } = await supabase
          .from("businesses")
          .update({
            google_rating: newRating,
            google_review_count: newReviewCount,
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
          status: "refreshed",
          rating: newRating,
          reviews: newReviewCount,
          ratingChanged,
          reviewCountChanged,
        });
      } catch (businessError) {
        console.error(
          `Refresh error for business ${business.id}:`,
          businessError
        );

        results.push({
          id: business.id,
          name: business.name,
          status: "error",
        });
      }
    }

    return Response.json({
      businessesProcessed: results.length,
      results,
    });
  } catch (error) {
    console.error("Places refresh error:", error);

    return Response.json(
      {
        error: "Something went wrong.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
