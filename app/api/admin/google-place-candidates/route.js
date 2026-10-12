import { NextResponse } from "next/server";
import { findGooglePlaceCandidate } from "../../lib/findGooglePlaceCandidate";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const expected = process.env.BHP_VERIFICATION_ADMIN_KEY;
  const provided = request.headers.get("authorization");
  if (!expected || provided !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body.name !== "string" || typeof body.phone !== "string" ||
      body.name.length > 150 || body.phone.length > 40) {
    return NextResponse.json({ error: "Valid name and phone required" }, { status: 400 });
  }

  try {
    const result = await findGooglePlaceCandidate({ name: body.name, phone: body.phone });
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Google Places candidate search failed:", error.message);
    return NextResponse.json({ error: "Google Places lookup unavailable" }, { status: 502 });
  }
}
