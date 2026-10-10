function verificationPage(title, message, success = false, status = 200) {
  const icon = success ? "✓" : "!";
  const accent = success ? "#16845b" : "#bd6533";
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | Billings Home Pros</title>
<style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(155deg,#f2f7fc,#e9f1f7);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#20354b}
.card{width:min(100%,500px);padding:46px 36px;text-align:center;background:#fff;border:1px solid #dbe6ee;border-radius:22px;box-shadow:0 16px 50px rgba(23,55,83,.09)}
.brand{font-size:15px;font-weight:800;letter-spacing:.06em;color:#174a78;text-transform:uppercase;margin-bottom:35px}
.icon{display:grid;place-items:center;width:76px;height:76px;border-radius:50%;margin:0 auto 25px;background:${success ? "#e3f5ec" : "#fff1e8"};color:${accent};font-size:42px;font-weight:700}
h1{font-size:clamp(25px,5vw,32px);line-height:1.2;margin:0 0 15px}p{font-size:16px;line-height:1.65;color:#526477;margin:0 0 30px}
.button{display:inline-block;background:#17639a;color:#fff;text-decoration:none;font-weight:700;padding:14px 24px;border-radius:10px}.button:hover{background:#104d7b}
.footer{font-size:13px;color:#7c8e9d;margin-top:32px}
</style></head><body><main class="card"><div class="brand">Billings Home Pros</div>
<div class="icon" aria-hidden="true">${icon}</div><h1>${title}</h1><p>${message}</p>
<a class="button" href="https://www.billingshomepros.com/">Return to Billings Home Pros</a>
<div class="footer">Connecting Billings homeowners with local professionals</div></main></body></html>`;
  return new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}

import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";

export async function GET(request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token || !/^[a-f0-9]{64}$/.test(token)) {
    return verificationPage("Invalid verification link", "This verification link is not valid. Please request a new email.", false, 400);
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return verificationPage("Verification unavailable", "Please try again later.", false, 503);
  }
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const hash = createHash("sha256").update(token).digest("hex");
  const { data: claim } = await db.from("contractor_requests")
    .select("id,business_id,request_type,contact_email,ownership_approved_at,verification_expires_at,contact_email_verified_at")
    .eq("verification_token_hash", hash).maybeSingle();
  if (!claim || claim.request_type !== "claim" || !claim.ownership_approved_at ||
      claim.contact_email_verified_at || !claim.verification_expires_at ||
      Date.parse(claim.verification_expires_at) <= Date.now()) {
    return verificationPage("Link expired or already used", "This verification link is no longer valid. Please request a new verification email.", false, 400);
  }
  const now = new Date().toISOString();
  const { data: verified, error } = await db.from("contractor_requests")
    .update({ contact_email_verified_at: now, verification_token_hash: null, verification_expires_at: null })
    .eq("id", claim.id).eq("verification_token_hash", hash)
    .select("id").maybeSingle();
  if (error || !verified) return verificationPage("Verification unsuccessful", "We couldn’t complete verification right now. Please contact Billings Home Pros for help.", false, 500);
  // Activate delivery only when a specific business ID has been approved.
  if (claim.business_id) {
    const { error: routingError } = await db.from("businesses")
      .update({ lead_email: claim.contact_email, lead_email_verified: true })
      .eq("id", claim.business_id);
    if (routingError) return verificationPage("Email verified", "Your email is confirmed. Quote notifications will be enabled after administrator review.", true, 202);
  }
  return verificationPage("Email verified!", "Your email address has been confirmed successfully. You’re all set — thank you for verifying with Billings Home Pros.", true);
}
