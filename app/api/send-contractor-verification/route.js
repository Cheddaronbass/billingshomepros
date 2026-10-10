import { createClient } from "@supabase/supabase-js";
import { randomBytes, createHash, timingSafeEqual } from "node:crypto";
import { Resend } from "resend";

export async function POST(request) {
  const adminKey = process.env.BHP_VERIFICATION_ADMIN_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!adminKey || !serviceKey || !process.env.RESEND_API_KEY) {
    return Response.json({ error: "Verification service not configured" }, { status: 503 });
  }
  const supplied = request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  const a = Buffer.from(supplied);
  const b = Buffer.from(adminKey);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { claim_id } = await request.json();
  if (!Number.isSafeInteger(claim_id) || claim_id < 1) {
    return Response.json({ error: "Invalid claim" }, { status: 400 });
  }
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, serviceKey);
  const { data: claim, error } = await db.from("contractor_requests")
    .select("id,request_type,contact_email,business_name,ownership_approved_at,contact_email_verified_at")
    .eq("id", claim_id).maybeSingle();
  if (error || !claim || claim.request_type !== "claim" || !claim.ownership_approved_at) {
    return Response.json({ error: "Claim is not approved" }, { status: 403 });
  }
  if (claim.contact_email_verified_at) {
    return Response.json({ error: "Already verified" }, { status: 409 });
  }
  const token = randomBytes(32).toString("hex");
  const hash = createHash("sha256").update(token).digest("hex");
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const { error: updateError } = await db.from("contractor_requests")
    .update({ verification_token_hash: hash, verification_expires_at: expires, verification_sent_at: new Date().toISOString() })
    .eq("id", claim.id);
  if (updateError) return Response.json({ error: "Could not prepare verification" }, { status: 500 });
  const url = `https://www.billingshomepros.com/api/verify-contractor-email?token=${token}`;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error: emailError } = await resend.emails.send({
    from: "Billings Home Pros <notifications@billingshomepros.com>",
    to: [claim.contact_email],
    subject: "Verify your Billings Home Pros lead email",
    text: `Your business claim for ${claim.business_name} has been approved. To verify this email address for quote notifications, visit the following link within 24 hours:\n\n${url}\n\nIf you did not request this, ignore this message.`,
  });
  if (emailError) return Response.json({ error: "Verification email failed" }, { status: 502 });
  return Response.json({ success: true });
}
