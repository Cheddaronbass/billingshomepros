import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

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

    // Save the lead first. Supabase is our source of truth.
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
      console.error("Quote request database error:", error);

      return Response.json(
        { error: "Unable to submit your request." },
        { status: 500 }
      );
    }

    // Send the notification after the lead has been safely saved.
    // If email fails, we still keep the lead in Supabase.
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const emailText = `
NEW BILLINGS HOME PROS QUOTE REQUEST

Business:
${business_name}

Customer:
${customer_name}

Email:
${customer_email || "Not provided"}

Phone:
${customer_phone || "Not provided"}

Project Type:
${project_type || "Not specified"}

Project Details:
${project_details}

--------------------------------
Submitted through BillingsHomePros.com
      `.trim();

      const { error: emailError } = await resend.emails.send({
        from: "Billings Home Pros <notifications@billingshomepros.com>",
        to: [process.env.NOTIFICATION_EMAIL],
        subject: `New Quote Request - ${business_name}`,
        text: emailText,
        ...(customer_email
          ? { replyTo: customer_email }
          : {}),
      });

      if (emailError) {
        console.error("Quote notification email error:", emailError);
      }
    } catch (emailError) {
      console.error("Quote notification email error:", emailError);
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
