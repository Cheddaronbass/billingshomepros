import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { findGooglePlaceCandidate } from "../../../lib/findGooglePlaceCandidate";

export const dynamic = "force-dynamic";

const categories = new Set(["landscaping","painting","fencing","handyman","concrete","electrical","plumbing","hvac","roofing","contractors-remodeling"]);

export async function POST(request) {
  const secret = process.env.BHP_VERIFICATION_ADMIN_KEY;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const category = body?.category;
  const offset = body?.offset;
  if (!categories.has(category) || !Number.isInteger(offset) || offset < 0 || offset > 1000) {
    return NextResponse.json({ error: "Invalid category or offset" }, { status: 400 });
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  const db = createClient(url, key);
  const { data, error } = await db.from("businesses")
    .select("id,name,phone,category,google_match_status,google_place_id")
    .eq("category", category).is("google_place_id", null)
    .order("id", { ascending: true }).range(offset, offset + 4);
  if (error) return NextResponse.json({ error: "Database lookup failed" }, { status: 502 });
  const results = [];
  for (const business of data || []) {
    try {
      const found = await findGooglePlaceCandidate({ name: business.name, phone: business.phone });
      results.push({ id: business.id, name: business.name, phone: business.phone, candidates: found.candidates, exactPhoneMatches: found.exactPhoneMatches });
    } catch (err) {
      console.error("Places batch search failed for listing", business.id, err.message);
      results.push({ id: business.id, name: business.name, phone: business.phone, error: "Lookup failed" });
    }
  }
  return NextResponse.json({ category, offset, results, nextOffset: offset + results.length, hasMore: results.length === 5 }, { headers: { "Cache-Control": "no-store" } });
}
