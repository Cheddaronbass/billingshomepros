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
  let businessId = null;

  if (sessionId.startsWith("cs_") && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      confirmed = session.mode === "subscription" &&
        session.status === "complete" &&
        session.payment_status === "paid" &&
        session.livemode === true;
      if (confirmed) {
        businessName = session.metadata?.business_name || "";
        const rawId = session.metadata?.business_id;
        if (/^[1-9][0-9]*$/.test(rawId || "")) businessId = rawId;
      }
    } catch (error) {
      console.error("Unable to verify Featured welcome session", error);
    }
  }

  const hasSessionLink = Boolean(sessionId);
  return (
    <main style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 0%, #d7f2ff 0%, #f1faff 35%, #ffffff 78%)", color: "#10283a", padding: "clamp(24px, 5vw, 56px) 18px", fontFamily: "inherit" }}>
      <div style={{ maxWidth: 870, margin: "0 auto" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 14, textDecoration: "none", color: "#102b3d" }}>
          <img src="/icon.svg" alt="Billings Home Pros logo" width="48" height="48" style={{ width: 48, height: 48, borderRadius: 10, objectFit: "contain", flexShrink: 0 }} />
          <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: "clamp(20px, 3vw, 26px)", letterSpacing: "-.035em", fontWeight: 850, lineHeight: 1.08 }}>
              <span>Billings</span><span style={{ color: "#078fc6" }}>HomePros</span>
            </span>
            <span style={{ color: "#527185", fontSize: "clamp(11px, 1.6vw, 13px)", fontWeight: 700, letterSpacing: 1.1, lineHeight: 1.25 }}>LOCAL PROS · BILLINGS, MT</span>
          </span>
        </Link>
        <section style={{ position: "relative", overflow: "hidden", marginTop: 28, borderRadius: 26, background: "#ffffff", border: "1px solid #cbe8f6", boxShadow: "0 24px 65px rgba(21, 97, 139, .14)", textAlign: "center" }}>
          <div style={{ background: "linear-gradient(115deg, #0b3046 0%, #135479 62%, #0988bd 100%)", padding: "27px 20px", color: "#fff" }}>
            <span style={{ color: "#ffe0a0", fontSize: 14, fontWeight: 800, letterSpacing: 2 }}>★  THE FEATURED PROS  ★</span>
          </div>
          <div style={{ padding: "clamp(30px, 6vw, 62px) clamp(22px, 6vw, 70px) 50px", textAlign: "center" }}>
            <div aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 86, height: 86, borderRadius: "50%", border: "3px solid #f4d58d", background: "linear-gradient(145deg, #fff8e7, #f3e0ad)", color: "#123f58", fontWeight: 900, fontSize: 39, boxShadow: "0 6px 22px #bd945329" }}>{confirmed ? "✓" : "★"}</div>
            <p style={{ color: "#078fc6", letterSpacing: 1.8, fontWeight: 850, fontSize: 14, margin: "22px auto 12px", textAlign: "center" }}>BILLINGS HOME PROS · FEATURED MEMBERSHIP</p>
            <h1 style={{ color: "#102b40", fontSize: "clamp(2.5rem, 5.2vw, 3.6rem)", lineHeight: 1.12, fontWeight: 900, letterSpacing: "-.025em", margin: "0 auto 18px", textAlign: "center", width: "100%", maxWidth: 760 }}>Welcome to the<br/><span style={{ color: "#058dc4", display: "inline-block", textAlign: "center" }}>Featured Pros!</span></h1>
            {confirmed && businessName && <p style={{ fontSize: "clamp(20px, 2.8vw, 24px)", fontWeight: 800, color: "#184d6b", margin: "0 0 14px" }}>{businessName}</p>}
            <p style={{ maxWidth: 650, width: "100%", margin: "0 auto", fontSize: "clamp(18px, 2vw, 20px)", lineHeight: 1.65, color: "#435d6d", textAlign: "center" }}>
              {confirmed ? "Your payment is confirmed! Thank you for joining the Billings Home Pros community. We're excited to help your business stand out." : "Where outstanding local businesses get a little more spotlight. We're proud to help Billings-area pros connect with homeowners."}
            </p>
            {confirmed ? (
              <div style={{ maxWidth: 600, margin: "30px auto 0", border: "1px solid #c4e6f4", borderRadius: 17, padding: "22px 26px", background: "#eef9fe", textAlign: "left", fontSize: 18, lineHeight: 1.65, color: "#35566a" }}>
                <strong style={{ color: "#11384c", fontSize: 20 }}>What happens next?</strong>
                <p style={{ margin: "6px 0 0" }}>We’ll review your listing and contact details, then activate Featured placement after approval. No new forms or repeated information needed.</p>
              </div>
            ) : hasSessionLink ? (
              <p style={{ margin: "25px auto 0", maxWidth: 560, fontSize: 14, color: "#6a7780" }}>We can’t confirm payment from this link. If you've just checked out, please check your receipt or contact us before paying again.</p>
            ) : null}
            <Link href={confirmed && businessId ? `/pros/${businessId}` : "/"} style={{ display: "inline-block", marginTop: 32, padding: "16px 28px", background: "#0ea8e3", color: "#082b3c", borderRadius: 12, textDecoration: "none", fontWeight: 850, fontSize: 18, boxShadow: "0 8px 20px rgba(11,150,201,.22)" }}>{confirmed && businessId ? "View Your Business Listing" : "Explore Billings Home Pros"}</Link>
          </div>
          <div style={{ height: 7, background: "linear-gradient(90deg, #e6c881 0%, #22b4ed 55%, #0d496b 100%)" }} />
        </section>
        <div style={{ textAlign: "center", margin: "22px auto 0", padding: "16px 18px 26px", maxWidth: 690, color: "#45677b", background: "transparent", border: "none", boxShadow: "none" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 14 }} aria-hidden="true">
            <span style={{ height: 1, width: 75, background: "linear-gradient(90deg, transparent, #aac9da)" }} />
            <svg width="82" height="29" viewBox="0 0 82 29" fill="none">
              <path d="M2 24 L18 9 L29 20 L43 3 L62 24 L72 14 L80 24" stroke="#2e7397" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M39 10 L43 3 L48 11" stroke="#d6a94e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ height: 1, width: 75, background: "linear-gradient(90deg, #aac9da, transparent)" }} />
          </div>
          <p style={{ fontSize: "clamp(18px, 2.4vw, 20px)", fontWeight: 800, letterSpacing: 0.8, color: "#24516b", margin: "0 0 5px" }}>PROUDLY LOCAL · BILLINGS, MONTANA</p>
          <p style={{ fontSize: "clamp(17px, 2vw, 18px)", lineHeight: 1.5, color: "#506f82", margin: 0 }}>Built for the businesses and homeowners who make our community strong.</p>
        </div>
      </div>
    </main>
  );
}
