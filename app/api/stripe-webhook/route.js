import Stripe from "stripe";

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

  return Response.json({ received: true });
}
