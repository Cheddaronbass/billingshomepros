import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  try {
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

    const { data: businesses, error: businessError } = await supabase
      .from("businesses")
      .select("id, name")
      .ilike("name", businessName.trim())
      .limit(2);

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

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      line_items: [
        {
          price: "price_1UNF6V7SJw9ulIVuhBBv1Xf3",
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
      },

      subscription_data: {
        metadata: {
          business_id: String(business.id),
          business_name: business.name,
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
