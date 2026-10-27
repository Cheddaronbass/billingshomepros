import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  );

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error(
      "Stripe webhook verification failed:",
      error.message
    );

    return new Response("Invalid webhook signature", {
      status: 400,
    });
  }

  console.log("Stripe webhook received:", event.type);

  try {
    /*
     * SUCCESSFUL SUBSCRIPTION PAYMENT
     *
     * We retrieve the Stripe subscription because the exact
     * Supabase business ID was attached to its metadata when
     * checkout was created.
     */
    if (event.type === "invoice.paid") {
      const invoice = event.data.object;

      const subscriptionId =
        invoice.parent?.subscription_details?.subscription ||
        invoice.subscription;

      if (!subscriptionId) {
        console.log(
          "No subscription found on paid invoice:",
          invoice.id
        );

        return Response.json({ received: true });
      }

      const subscription =
        await stripe.subscriptions.retrieve(subscriptionId);

      const businessId = subscription.metadata?.business_id;

      if (!businessId) {
        console.log(
          "No business_id metadata found on subscription:",
          subscriptionId
        );

        return Response.json({ received: true });
      }

      // Keep paid entitlement separate from public Featured placement.
      // A late invoice event must never revive a canceled subscription.
      if (subscription.status !== "active") {
        console.log("Skipping invoice for inactive subscription:", subscriptionId);
        return Response.json({ received: true });
      }

      const { data: listing, error: lookupError } = await supabase
        .from("businesses")
        .select("claimed")
        .eq("id", businessId)
        .single();

      if (lookupError || !listing) {
        console.error("Unable to find Featured business:", lookupError);
        return Response.json({ error: "Business lookup failed." }, { status: 500 });
      }

      const { error } = await supabase
        .from("businesses")
        .update({
          featured_payment_active: true,
          featured: listing.claimed === true,
        })
        .eq("id", businessId);

      if (error) {
        console.error(
          "Unable to activate Featured listing:",
          error
        );

        return Response.json(
          { error: "Unable to activate Featured listing." },
          { status: 500 }
        );
      }

      console.log(
        "Featured listing activated for business:",
        businessId
      );
    }

    /*
     * SUBSCRIPTION CANCELLED
     *
     * Stripe sends the subscription object directly, so the
     * business ID is available in its metadata.
     */
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      const businessId = subscription.metadata?.business_id;

      if (!businessId) {
        console.log(
          "No business_id metadata found on cancelled subscription:",
          subscription.id
        );

        return Response.json({ received: true });
      }

      const { error } = await supabase
        .from("businesses")
        .update({
          featured: false,
          featured_payment_active: false,
        })
        .eq("id", businessId);

      if (error) {
        console.error(
          "Unable to remove Featured listing:",
          error
        );

        return Response.json(
          { error: "Unable to remove Featured listing." },
          { status: 500 }
        );
      }

      console.log(
        "Featured listing removed for business:",
        businessId
      );
    }

    /*
     * PAYMENT FAILED
     *
     * Do not immediately remove Featured status.
     * Stripe may retry the payment.
     */
    if (event.type === "invoice.payment_failed") {
      console.log(
        "Subscription payment failed:",
        event.data.object.id
      );
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);

    return Response.json(
      { error: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
