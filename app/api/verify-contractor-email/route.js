import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";

export async function GET(request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token || !/^[a-f0-9]{64}$/.test(token)) {
    return new Response("Invalid verification link.", { status: 400 });
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return new Response("Verification is not yet available.", { status: 503 });
  }
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const hash = createHash("sha256").update(token).digest("hex");
  const { data: claim } = await db.from("contractor_requests")
    .select("id,business_id,request_type,contact_email,ownership_approved_at,verification_expires_at,contact_email_verified_at")
    .eq("verification_token_hash", hash).maybeSingle();
  if (!claim || claim.request_type !== "claim" || !claim.ownership_approved_at ||
      claim.contact_email_verified_at || !claim.verification_expires_at ||
      Date.parse(claim.verification_expires_at) <= Date.now()) {
    return new Response("This link is invalid or expired.", { status: 400 });
  }
  const now = new Date().toISOString();
  const { data: verified, error } = await db.from("contractor_requests")
    .update({ contact_email_verified_at: now, verification_token_hash: null, verification_expires_at: null })
    .eq("id", claim.id).eq("verification_token_hash", hash)
    .select("id").maybeSingle();
  if (error || !verified) return new Response("Verification could not be completed.", { status: 500 });
  // Activate delivery only when a specific business ID has been approved.
  if (claim.business_id) {
    const { error: routingError } = await db.from("businesses")
      .update({ lead_email: claim.contact_email, lead_email_verified: true })
      .eq("id", claim.business_id);
    if (routingError) return new Response("Email verified. Lead routing requires administrator review.", { status: 202 });
  }
  return new Response("Email verified. Thank you! Your Billings Home Pros email verification is complete.", {
    status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
