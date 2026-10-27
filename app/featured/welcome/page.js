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

  const hasSessionLink = Boolean(sessionId);
  return (
    <main style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 0%, #d7f2ff 0%, #f1faff 35%, #ffffff 78%)", color: "#10283a", padding: "clamp(24px, 5vw, 56px) 18px", fontFamily: "inherit" }}>
      <div style={{ maxWidth: 870, margin: "0 auto" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#102b3d", fontWeight: 850, letterSpacing: 1.2, fontSize: "clamp(15px, 2vw, 19px)" }}>
          <span style={{ width: 44, height: 44, background: "#112b3d", color: "#57cbfa", borderRadius: 12, display: "inline-flex", justifyContent: "center", alignItems: "center", fontSize: 27 }} aria-hidden="true">⌂</span>
          BILLINGS HOME PROS
        </Link>
        <section style={{ position: "relative", overflow: "hidden", marginTop: 28, borderRadius: 26, background: "#ffffff", border: "1px solid #cbe8f6", boxShadow: "0 24px 65px rgba(21, 97, 139, .14)", textAlign: "center" }}>
          <div style={{ background: "linear-gradient(115deg, #0b3046 0%, #135479 62%, #0988bd 100%)", padding: "27px 20px", color: "#fff" }}>
            <span style={{ color: "#ffe0a0", fontSize: 13, fontWeight: 800, letterSpacing: 3 }}>★  THE FEATURED PROS  ★</span>
          </div>
          <div style={{ padding: "clamp(30px, 6vw, 62px) clamp(22px, 6vw, 70px) 50px" }}>
            <div aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 86, height: 86, borderRadius: "50%", border: "3px solid #f4d58d", background: "linear-gradient(145deg, #fff8e7, #f3e0ad)", color: "#123f58", fontWeight: 900, fontSize: 39, boxShadow: "0 6px 22px #bd945329" }}>{confirmed ? "✓" : "★"}</div>
            <p style={{ color: "#078fc6", letterSpacing: 2.2, fontWeight: 850, fontSize: 13, margin: "22px 0 12px" }}>BILLINGS HOME PROS · FEATURED MEMBERSHIP</p>
            <h1 style={{ color: "#102b40", fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", lineHeight: 1.08, fontWeight: 900, letterSpacing: "-.035em", margin: "0 0 18px" }}>Welcome to the<br/><span style={{ color: "#058dc4" }}>Featured Pros!</span></h1>
            {confirmed && businessName && <p style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, color: "#184d6b", margin: "0 0 14px" }}>{businessName}</p>}
            <p style={{ maxWidth: 590, margin: "0 auto", fontSize: "clamp(17px, 2vw, 20px)", lineHeight: 1.65, color: "#435d6d" }}>
              {confirmed ? "Your payment is confirmed! Thank you for joining the Billings Home Pros community. We're excited to help your business stand out." : "Where outstanding local businesses get a little more spotlight. We're proud to help Billings-area pros connect with homeowners."}
            </p>
            {confirmed ? (
              <div style={{ maxWidth: 600, margin: "30px auto 0", border: "1px solid #c4e6f4", borderRadius: 17, padding: "22px 26px", background: "#eef9fe", textAlign: "left", lineHeight: 1.65, color: "#35566a" }}>
                <strong style={{ color: "#11384c", fontSize: 18 }}>What happens next?</strong>
                <p style={{ margin: "6px 0 0" }}>We’ll review your listing and contact details, then activate Featured placement after approval. No new forms or repeated information needed.</p>
              </div>
            ) : hasSessionLink ? (
              <p style={{ margin: "25px auto 0", maxWidth: 560, fontSize: 14, color: "#6a7780" }}>We can’t confirm payment from this link. If you've just checked out, please check your receipt or contact us before paying again.</p>
            ) : null}
            <Link href="/" style={{ display: "inline-block", marginTop: 32, padding: "16px 28px", background: "#0ea8e3", color: "#082b3c", borderRadius: 12, textDecoration: "none", fontWeight: 850, boxShadow: "0 8px 20px rgba(11,150,201,.22)" }}>Explore Billings Home Pros</Link>
          </div>
          <div style={{ height: 7, background: "linear-gradient(90deg, #e6c881 0%, #22b4ed 55%, #0d496b 100%)" }} />
        </section>
        <p style={{ textAlign: "center", margin: "23px 0 0", color: "#607c8c", fontSize: 14 }}>Proudly local · Billings, Montana</p>
      </div>
    </main>
  );
}
