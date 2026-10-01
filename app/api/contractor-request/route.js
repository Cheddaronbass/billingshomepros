import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

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

    // Save the contractor request first.
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
      console.error("Contractor request database error:", error);

      return Response.json(
        { error: "Unable to submit your request." },
        { status: 500 }
      );
    }

    // Send notification after the request has safely been saved.
    // If email fails, the contractor request remains in Supabase.
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const requestLabel =
        request_type === "claim"
          ? "CLAIM MY BUSINESS"
          : "ADD MY BUSINESS";

      const emailText = `
NEW BILLINGS HOME PROS CONTRACTOR REQUEST

Request Type:
${requestLabel}

Business:
${business_name}

Contact:
${contact_name}

Email:
${contact_email}

Phone:
${contact_phone || "Not provided"}

Website:
${website || "Not provided"}

Category:
${category || "Not specified"}

Service Area:
${service_area || "Not specified"}

Message:
${message || "No message provided"}

--------------------------------
Submitted through BillingsHomePros.com
      `.trim();

      const { error: emailError } = await resend.emails.send({
        from: "Billings Home Pros <notifications@billingshomepros.com>",
        to: [process.env.NOTIFICATION_EMAIL],
        subject:
          request_type === "claim"
            ? `Business Claim Request - ${business_name}`
            : `New Listing Request - ${business_name}`,
        text: emailText,
        replyTo: contact_email,
      });

      if (emailError) {
        console.error(
          "Contractor notification email error:",
          emailError
        );
      }
    } catch (emailError) {
      console.error(
        "Contractor notification email error:",
        emailError
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
