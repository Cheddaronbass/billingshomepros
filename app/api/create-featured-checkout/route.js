import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  try {
    // Default closed: do not offer any checkout before LLC and live Stripe are ready.
    if (process.env.NEXT_PUBLIC_FEATURED_CHECKOUT_ENABLED !== "true") {
      return Response.json(
        { error: "Featured upgrades are not available yet." },
        { status: 503 }
      );
    }

    const { businessName } = await request.json();

    if (!businessName?.trim()) {
      return Response.json(
        { error: "Please enter your business name." },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    );

    // Compare normalized names so punctuation, case and spacing do not
    // prevent legitimate contractors from finding an existing listing.
    // Require an unambiguous match; never guess which business to charge.
    const normalizeName = (value) =>
      value.normalize("NFKC").toLowerCase().replace(/[^a-z0-9]/g, "");
    const requestedName = normalizeName(businessName.trim());

    let { data: businesses, error: businessError } = await supabase
      .from("businesses")
      .select("id, name, claimed")
      .ilike("name", businessName.trim())
      .limit(3);

    if (!businessError && (!businesses || businesses.length === 0)) {
      const prefix = requestedName.slice(0, 4);
      if (prefix.length >= 3) {
        const { data: candidates, error: candidateError } = await supabase
          .from("businesses")
          .select("id, name, claimed")
          .ilike("name", `%${prefix}%`)
          .limit(200);
        businessError = candidateError;
        businesses = (candidates || []).filter(
          (candidate) => normalizeName(candidate.name) === requestedName
        );
      }
    }

    if (businessError) {
      console.error("Business lookup error:", businessError);
      return Response.json(
        { error: "Unable to look up the business." },
        { status: 500 }
      );
    }

    if (!businesses || businesses.length === 0) {
      return Response.json(
        {
          error:
            "We couldn't find that business. Please claim or add your listing first.",
        },
        { status: 404 }
      );
    }

    if (businesses.length > 1) {
      return Response.json(
        {
          error:
            "More than one business matched that name. Please contact us before upgrading.",
        },
        { status: 409 }
      );
    }

    const business = businesses[0];

    // Existing contractors with a submitted claim may purchase before
    // manual ownership review; do not activate public promotion until approved.
    const { data: pendingClaims, error: claimError } = await supabase
      .from("contractor_requests")
      .select("id")
      .eq("business_id", business.id)
      .in("status", ["new", "reviewing", "pending"])
      .limit(1);

    if (claimError) {
      console.error("Claim lookup error:", claimError);
      return Response.json({ error: "Unable to check claim status." }, { status: 500 });
    }

    // A freshly submitted claim may not yet be linked to its listing.
    // Match the already-submitted business name instead of asking again.
    let hasSubmittedClaim = Boolean(pendingClaims?.length);
    if (!business.claimed && !hasSubmittedClaim) {
      const { data: namedClaims, error: namedClaimError } = await supabase
        .from("contractor_requests")
        .select("id")
        .ilike("business_name", business.name)
        .eq("request_type", "claim")
        .in("status", ["new", "reviewing", "pending"])
        .limit(1);
      if (namedClaimError) {
        console.error("Unlinked claim lookup error:", namedClaimError);
        return Response.json({ error: "Unable to check claim status." }, { status: 500 });
      }
      hasSubmittedClaim = Boolean(namedClaims?.length);
    }

    if (!business.claimed && !hasSubmittedClaim) {
      return Response.json(
        { error: "Claim your listing using the free form above, then return here to upgrade. No second form is needed." },
        { status: 403 }
      );
    }

    const featuredPriceId = process.env.STRIPE_FEATURED_MONTHLY_PRICE_ID;
    if (!featuredPriceId) {
      console.error("Featured checkout price not configured.");
      return Response.json({ error: "Featured upgrades are not available yet." }, { status: 503 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      line_items: [
        {
          price: featuredPriceId,
          quantity: 1,
        },
      ],

      success_url:
        "https://www.billingshomepros.com/get-listed?featured=success",

      cancel_url:
        "https://www.billingshomepros.com/get-listed?featured=cancelled",

      client_reference_id: String(business.id),

      metadata: {
        business_id: String(business.id),
        business_name: business.name,
        review_pending: business.claimed ? "false" : "true",
      },

      subscription_data: {
        metadata: {
          business_id: String(business.id),
          business_name: business.name,
          review_pending: business.claimed ? "false" : "true",
        },
      },
    });

    return Response.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Featured checkout error:", error);

    return Response.json(
      { error: "Unable to start checkout." },
      { status: 500 }
    );
  }
}
