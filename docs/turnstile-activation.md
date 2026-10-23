# Billings Home Pros — Turnstile activation

Current status: **code staged; protection NOT active**. The deployed Vercel environment is missing both Cloudflare Turnstile keys. The code intentionally preserves the existing live submission paths until real keys are configured.

## Configure Cloudflare (production)

1. In the Cloudflare dashboard go to **Turnstile**, create a widget for `billingshomepros.com` and `www.billingshomepros.com`. Use managed challenge.
2. Copy the real **site key** and **secret key** from this widget.
3. In the **Billings Home Pros Vercel project** add these **Production** environment variables:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: public site key (built into client-side JavaScript)
   - `TURNSTILE_SECRET_KEY`: private server-only secret key (never use `NEXT_PUBLIC_` for the secret).
4. Redeploy Production **once both keys are saved**. Do not enable only one key; partial configuration intentionally makes both POST routes return 503.
5. Open `https://billingshomepros.com/quote?businessId=141&businessName=Pierce%20Flooring` and `https://billingshomepros.com/get-listed`: a Turnstile challenge should appear before the submit button.
6. Check the valid form flow with authorized test submissions only, and confirm the records are saved and notifications delivered. Then check one missing/invalid/reused token is rejected without saving anything. Remove any test records afterward.

## Implementation

- `app/components/TurnstileField.js`: explicit client render; token callback and reset.
- `app/lib/turnstile.js`: server-side Cloudflare Siteverify, action and hostname validation.
- `/api/quote-request`: action `quote_request`.
- `/api/contractor-request`: action `contractor_request`.
- Never use Cloudflare public test keys in real production.

Turnstile tokens expire after five minutes and are single-use. Client code resets them after each POST. The helper requires a matching action and one of the two Billings production hostnames. Do not claim anti-bot protection is active unless the widget has real keys, a valid token is accepted by Siteverify, and an invalid token is rejected by the server.

## Rollback

Remove both environment variables and redeploy to return to the legacy flow; note this **disables bot protection**. Never change one key without the other.
