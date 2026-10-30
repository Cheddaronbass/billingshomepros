// Google Places imports and refreshes are paused by the owner to avoid API costs.
export async function POST() {
  return Response.json({ paused: true, businessesProcessed: 0, results: [] });
}

export async function GET() {
  return POST();
}
