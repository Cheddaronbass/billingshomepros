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
    <main style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f3faff 0%, #ffffff 53%, #e9f6fc 100%)", color: "#142536", padding: "clamp(28px, 6vw, 76px) 20px", fontFamily: "inherit" }}>
      <div style={{ maxWidth: 790, margin: "0 auto" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 9, color: "#116b92", textDecoration: "none", fontWeight: 850, fontSize: 17, letterSpacing: 0.8 }}>
          <span style={{ color: "#13a9e3", fontSize: 23 }} aria-hidden="true">⌂</span> BILLINGS HOME PROS
        </Link>
        <section style={{ marginTop: 28, padding: "clamp(30px, 6vw, 64px)", border: "1px solid #d5e9f3", borderRadius: 24, background: "#ffffff", boxShadow: "0 16px 55px rgba(23, 99, 135, .10)", textAlign: "center" }}>
          <div aria-hidden="true" style={{ width: 72, height: 72, margin: "0 auto 18px", borderRadius: "50%", background: confirmed ? "#d8f8e8" : "#e8f5fc", color: confirmed ? "#15815c" : "#248db9", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 38, fontWeight: 700 }}>
            {confirmed ? "✓" : "i"}
          </div>
          <p style={{ color: "#087eae", letterSpacing: 2.3, fontSize: 13, fontWeight: 800, margin: "10px 0 14px" }}>BILLINGS HOME PROS · FEATURED</p>
          <h1 style={{ color: "#112c42", fontSize: "clamp(2rem, 5vw, 3.4rem)", lineHeight: 1.1, margin: "0 0 22px", fontWeight: 850 }}>
            {confirmed ? "Welcome to Featured!" : "Your Featured Membership"}
          </h1>
          {confirmed ? (
            <>
              {businessName && <p style={{ color: "#136d94", fontSize: 24, fontWeight: 800, margin: "0 0 18px" }}>{businessName}</p>}
              <p style={{ fontSize: 19, lineHeight: 1.65, color: "#455c6b", margin: "0 auto", maxWidth: 550 }}>
                You're officially on your way to standing out to Billings-area homeowners. Thank you for choosing to grow with us!
              </p>
              <div style={{ margin: "32px auto 0", padding: "22px 26px", background: "#edf8fd", borderRadius: 16, maxWidth: 560, textAlign: "left", color: "#29465a", lineHeight: 1.7 }}>
                <strong style={{ color: "#12344a", fontSize: 18 }}>What happens next?</strong>
                <p style={{ margin: "7px 0 0" }}>We'll review your listing and contact information. Your Featured placement begins after approval, and there's nothing else you need to submit.</p>
              </div>
            </>
          ) : (
            <>
              <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 575, margin: "0 auto", color: "#455c6b" }}>This is the welcome page our Featured members see after checkout.</p>
              <div style={{ margin: "28px auto 0", padding: "18px 24px", background: "#f1f7fb", borderRadius: 13, maxWidth: 555, textAlign: "left", color: "#4a6374", lineHeight: 1.65 }}>
                <strong style={{ color: "#193a50" }}>Already completed a payment?</strong>
                <p style={{ margin: "5px 0 0" }}>We couldn't confirm a payment from this particular link. If you just subscribed, check your Stripe receipt or contact us before trying again.</p>
              </div>
            </>
          )}
          <Link href="/" style={{ display: "inline-block", marginTop: 32, padding: "15px 26px", borderRadius: 11, background: "#16a8e3", color: "#052d40", textDecoration: "none", fontWeight: 800, boxShadow: "0 6px 17px rgba(17, 153, 207, .18)" }}>Explore Billings Home Pros</Link>
        </section>
        <p style={{ textAlign: "center", fontSize: 14, color: "#647b89", marginTop: 25 }}>Proudly connecting local businesses and local homeowners in Billings, Montana.</p>
      </div>
    </main>
  );
}
