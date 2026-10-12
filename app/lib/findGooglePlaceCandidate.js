import "server-only";

const ENDPOINT = "https://places.googleapis.com/v1/places:searchText";

function normalizedPhone(value) {
  return String(value || "").replace(/\D/g, "").slice(-10);
}

export async function findGooglePlaceCandidate({ name, phone, city = "Billings", state = "MT" }) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) throw new Error("Google Places API key is not configured");
  if (!name || !phone) throw new Error("Business name and phone are required");

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.businessStatus",
    },
    body: JSON.stringify({
      textQuery: `${name} ${city} ${state}`,
      maxResultCount: 5,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Google Places search returned HTTP ${response.status}`);
  }

  const payload = await response.json();
  const expectedPhone = normalizedPhone(phone);
  const candidates = (payload.places || []).map((place) => {
    const placePhone = normalizedPhone(place.nationalPhoneNumber);
    const phoneMatches = expectedPhone.length === 10 && placePhone === expectedPhone;
    const nameMatches = String(place.displayName?.text || "").toLowerCase().trim() === name.toLowerCase().trim();
    return {
      placeId: place.id,
      name: place.displayName?.text || "",
      address: place.formattedAddress || "",
      phone: place.nationalPhoneNumber || "",
      website: place.websiteUri || "",
      businessStatus: place.businessStatus || "",
      phoneMatches,
      nameMatches,
    };
  });

  return { candidates, exactPhoneMatches: candidates.filter((candidate) => candidate.phoneMatches) };
}
