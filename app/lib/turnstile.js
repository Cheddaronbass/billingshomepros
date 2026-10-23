// Cloudflare Turnstile server verification for public form submissions.
// Uses the Siteverify endpoint; token success alone is not sufficient.
const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const ALLOWED_HOSTNAMES = new Set([
  "billingshomepros.com",
  "www.billingshomepros.com",
]);

export async function verifyTurnstileToken(token, expectedAction) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Configuration is staged: no existing BHP submissions are interrupted
  // before a real Cloudflare widget is configured. This is not protection.
  if (!siteKey && !secret) return { ok: true, configured: false };

  if (!siteKey || !secret) {
    console.error("Turnstile configuration incomplete");
    return {
      ok: false,
      status: 503,
      error: "Security verification is temporarily unavailable. Please try again shortly.",
    };
  }
  if (typeof token !== "string" || !token || token.length > 2048) {
    return {
      ok: false,
      status: 400,
      error: "Complete the security verification before submitting.",
    };
  }

  try {
    const response = await fetch(SITEVERIFY, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(9000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Siteverify HTTP status " + response.status);

    const verification = await response.json();
    if (
      verification.success !== true ||
      verification.action !== expectedAction ||
      !ALLOWED_HOSTNAMES.has(verification.hostname)
    ) {
      return {
        ok: false,
        status: 400,
        error: "Security verification failed or expired. Please try again.",
      };
    }

    return { ok: true, configured: true };
  } catch (error) {
    console.error("Turnstile validation unavailable", error?.message || "unknown");
    return {
      ok: false,
      status: 503,
      error: "Unable to verify this request right now. Please try again.",
    };
  }
}
