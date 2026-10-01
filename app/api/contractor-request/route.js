import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      request_type,
      business_name,
      contact_name,
      contact_email,
      contact_phone,
      website,
      category,
      service_area,
      message,
    } = body;

    if (
      !request_type ||
      !business_name ||
      !contact_name ||
      !contact_email
    ) {
      return Response.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    if (!["claim", "new_listing"].includes(request_type)) {
      return Response.json(
        { error: "Invalid request type." },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_PUBLISHABLE_KEY
    );

    const { error } = await supabase
      .from("contractor_requests")
      .insert({
        request_type,
        business_name,
        contact_name,
        contact_email,
        contact_phone: contact_phone || null,
        website: website || null,
        category: category || null,
        service_area: service_area || null,
        message: message || null,
      });

    if (error) {
      console.error("Contractor request error:", error);

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
    console.error("Contractor request error:", error);

    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
