import Link from "next/link";
import Stripe from "stripe";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Welcome to Featured | Billings Home Pros",
  description: "Billings Home Pros Featured subscription confirmation.",
  robots: { index: false, follow: false },
};

export default async function FeaturedWelcome({ searchParams }) {
  const params = await searchParams;
  const sessionId = typeof params?.session_id === "string" ? params.session_id : "";
  let confirmed = false;
  let businessName = "";

  if (sessionId.startsWith("cs_") && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      confirmed = session.mode === "subscription" &&
        session.status === "complete" &&
        session.payment_status === "paid" &&
        session.livemode === true;
      if (confirmed) businessName = session.metadata?.business_name || "";
    } catch (error) {
      console.error("Unable to verify Featured welcome session", error);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0c1720", color: "#f7fbfd", padding: "clamp(24px, 6vw, 70px) 20px", fontFamily: "inherit" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Link href="/" style={{ color: "#6dd8ff", textDecoration: "none", fontWeight: 800, letterSpacing: 1 }}>BILLINGS HOME PROS</Link>
        <section style={{ marginTop: 38, padding: "clamp(26px, 6vw, 60px)", border: "1px solid #40515c", borderRadius: 22, background: "linear-gradient(145deg, #172b39, #10202b)", boxShadow: "0 22px 70px #0005", textAlign: "center" }}>
          <div aria-hidden="true" style={{ fontSize: 46, color: "#c1c8ce" }}>{confirmed ? "✓" : "○"}</div>
          <p style={{ color: "#75d6f8", letterSpacing: 3, fontSize: 13, fontWeight: 800, margin: "12px 0" }}>BILLINGS HOME PROS • FEATURED</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.3rem)", lineHeight: 1.12, margin: "15px 0 20px" }}>
            {confirmed ? "Welcome to Featured." : "Featured Subscription"}
          </h1>
          {confirmed ? (
            <>
              {businessName && <p style={{ color: "#f6d898", fontSize: 22, fontWeight: 700, margin: "0 0 16px" }}>{businessName}</p>}
              <p style={{ fontSize: 18, lineHeight: 1.7, color: "#d7e3eb" }}>Your payment was successful. Thank you for partnering with Billings Home Pros to reach more local homeowners.</p>
              <div style={{ borderTop: "1px solid #43545f", margin: "28px 0", paddingTop: 24, color: "#d7e3eb", lineHeight: 1.7 }}>
                <strong style={{ color: "#fff" }}>What happens next?</strong>
                <p>We’ll review your listing and contact details. Featured placement begins after approval. You don't need to fill out another form.</p>
              </div>
            </>
          ) : (
            <p style={{ color: "#d7e3eb", fontSize: 18, lineHeight: 1.7 }}>We couldn’t confirm a completed payment from this link. If you just paid, check your Stripe receipt or contact us before trying again.</p>
          )}
          <Link href="/" style={{ display: "inline-block", marginTop: 16, padding: "13px 24px", borderRadius: 10, background: "#21b2ee", color: "#071824", textDecoration: "none", fontWeight: 800 }}>Explore Billings Home Pros</Link>
        </section>
        <p style={{ textAlign: "center", fontSize: 13, color: "#a7bac5", marginTop: 25 }}>Local pros. Local homeowners. Stronger Billings connections.</p>
      </div>
    </main>
  );
}
