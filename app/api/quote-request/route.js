import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      business_id,
      business_name,
      customer_name,
      customer_email,
      customer_phone,
      project_type,
      project_details,
    } = body;

    if (!business_name || !customer_name || !project_details) {
      return Response.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    if (!customer_email && !customer_phone) {
      return Response.json(
        { error: "Please provide an email address or phone number." },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_PUBLISHABLE_KEY
    );

    const { error } = await supabase.from("quote_requests").insert({
      business_id,
      business_name,
      customer_name,
      customer_email: customer_email || null,
      customer_phone: customer_phone || null,
      project_type: project_type || null,
      project_details,
    });

    if (error) {
      console.error("Quote request error:", error);

      return Response.json(
        { error: "Unable to submit your request." },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Quote request error:", error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
