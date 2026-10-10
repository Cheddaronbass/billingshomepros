// Server-only Google Places (New) rating lookup.
// Do not import this module from a client component.
import "server-only";

const GOOGLE_PLACES_ENDPOINT = "https://places.googleapis.com/v1/places/";

export async function getGooglePlaceRating(placeId) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey || !placeId || !/^[-\w]+$/.test(placeId)) return null;

  try {
    const response = await fetch(
      GOOGLE_PLACES_ENDPOINT + encodeURIComponent(placeId),
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "id,displayName,rating,userRatingCount,googleMapsUri",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(4500),
      }
    );
    if (!response.ok) {
      console.error("Google Places lookup failed:", response.status);
      return null;
    }
    const place = await response.json();
    if (typeof place.rating !== "number" || typeof place.userRatingCount !== "number") {
      return null;
    }
    return {
      rating: place.rating,
      count: place.userRatingCount,
      mapsUrl: place.googleMapsUri || null,
    };
  } catch (error) {
    console.error("Google Places lookup error:", error?.message || error);
    return null;
  }
}
