# Repository Agent Instructions

This file defines project-specific guardrails for coding assistants operating in this repository.

## Shared operating references
- Working Truths: https://docs.google.com/document/d/1Z_6qngff9ditXCLCZFfdX3zaFgKpfIl_UJa6xAmQTgs/edit
- Project Memory: https://docs.google.com/document/d/1MrScjgzJoGHYmJURPKwdL6pK9jQaInlCv6mVU3aOX84/edit
- These Google Docs are references, not guaranteed to be accessible to every coding assistant. If unavailable, say so; do not pretend to have read them. Use repository code and confirmed user instructions to proceed safely.
- Read only this project's relevant Project Memory section. Never copy data, branding, service locations, listings, credentials, Stripe settings, or outstanding tasks from sibling projects.
- Distinguish historical plans from recently verified statuses. Do not reopen completed work without a concrete reason.
- Inspect existing code before changing it. Make small scoped edits, commit changes, check builds/deployment and functionality where tools allow. READY build alone is not full end-to-end verification.
- Never fabricate business listings, metrics, reviews, ratings, approvals, or customer communications. Never expose API keys or server-side secrets in client components.
- Do not make payments, send outreach, or perform destructive production operations without authorization. Avoid unnecessary back-and-forth for already authorized safe changes.

## This project: Billings Home Pros (BHP)
- Public domain: https://billingshomepros.com. Market: Billings/Yellowstone County, Montana.
- Directory of local home-service contractors; free base listings and $29.99/month Featured subscription.
- Tech: Next.js App Router, Vercel, Supabase, Stripe, Cloudflare Turnstile.
- Preserve approved modern charcoal/white/electric-cyan-blue branding, metallic service badges, Montana/Billings positioning and existing responsive designs.
- Contractor listings must be authentic, categories/services accurately mapped. Windows & Doors is for installers (suppliers only if they install).
- Preserve the confirmed live Stripe webhook, entitlement activation/deactivation and paid-before-approval logic. Real payment, cancellation/refund and approval-trigger tests were previously completed. The isolated sandbox renewal/failed-payment lifecycle test was deliberately deferred; do not treat it as launch-blocking or charge another card.
- Keep production Supabase data intact; never run sandbox test events against real listings without proving isolation.
- SEO: use canonical apex domain, accurate sitemap timestamps (omit them if authoritative dates absent), page-specific metadata, structured data and honest claims.
- Current business focus: real contractor acquisition, homeowner traffic, search visibility, accurate profiles and converting actual Featured subscribers. Check current outreach notes before sending or marking contacts.
