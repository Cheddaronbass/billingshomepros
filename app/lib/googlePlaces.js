// Live Google Places ratings are paused to avoid API costs.
// Keep this server-only interface so directory pages render normally without ratings.
import "server-only";

export async function getGooglePlaceRating() {
  return null;
}
