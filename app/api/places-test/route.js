export async function GET() {
  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount",
        },
        body: JSON.stringify({
          textQuery: "Houser Plumbing LLC Billings Montana",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Google Places error:", data);

      return Response.json(
        { error: "Google Places request failed.", details: data },
        { status: response.status }
      );
    }

    return Response.json(data);
  } catch (error) {
    console.error("Places test error:", error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
