import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { findGooglePlaceCandidate } from "../../../lib/findGooglePlaceCandidate";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const secret = process.env.BHP_VERIFICATION_ADMIN_KEY;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { businessId, placeId } = body || {};
  if (!Number.isSafeInteger(businessId) || businessId < 1 || typeof placeId !== "string" || !/^[-\w]+$/.test(placeId)) {
    return NextResponse.json({ error: "Invalid business or place ID" }, { status: 400 });
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: business, error: readError } = await db.from("businesses")
    .select("id,name,phone,google_place_id,google_match_status")
    .eq("id", businessId).single();
  if (readError || !business) return NextResponse.json({ error: "Business not found" }, { status: 404 });
  if (business.google_place_id || business.google_match_status === "matched") {
    return NextResponse.json({ error: "Business already matched" }, { status: 409 });
  }

  let match;
  try {
    const found = await findGooglePlaceCandidate({ name: business.name, phone: business.phone });
    match = found.candidates.find((p) => p.placeId === placeId && p.phoneMatches && p.nameMatches &&
      p.businessStatus === "OPERATIONAL" && /\b(MT|Montana)\b/i.test(p.address) &&
      /\b(Billings|Laurel)\b/i.test(p.address));
  } catch (error) {
    console.error("Approval verification failed", error.message);
    return NextResponse.json({ error: "Google verification unavailable" }, { status: 502 });
  }
  if (!match) return NextResponse.json({ error: "No current exact name, phone and local operational match. Not saved." }, { status: 422 });

  const { data: updated, error: updateError } = await db.from("businesses")
    .update({ google_place_id: placeId, google_match_status: "matched", google_last_updated: new Date().toISOString() })
    .eq("id", businessId).is("google_place_id", null).neq("google_match_status", "matched")
    .select("id,name,google_place_id,google_match_status").maybeSingle();
  if (updateError) return NextResponse.json({ error: "Could not save match" }, { status: 502 });
  if (!updated) return NextResponse.json({ error: "Listing changed before approval. Refresh and retry." }, { status: 409 });
  return NextResponse.json({ saved: true, business: updated }, { headers: { "Cache-Control": "no-store" } });
}
