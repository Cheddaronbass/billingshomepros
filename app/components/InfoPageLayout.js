export default function InfoPageLayout({ title, eyebrow, intro, children }) {
  return (
    <div style={{ background: "#f0f6fa", minHeight: "100vh", color: "#101b27" }}>
      <header className="siteHeader">
        <a className="textBrand" href="/">
          <span className="brandMain">Billings Home Pros</span>
          <span className="brandSub">LOCAL HOME SERVICES • BILLINGS, MT</span>
        </a>
        <nav aria-label="Page navigation">
          <a href="/#services">Find a Pro</a>
          <a href="/get-listed">Get Listed</a>
        </nav>
      </header>
      <section style={{ background: "#101b27", padding: "52px 20px 58px", textAlign: "center" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <p style={{ color: "#25b9ff", fontSize: 14, fontWeight: 800, letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: 12 }}>{eyebrow}</p>
          <h1 style={{ maxWidth: "none", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1.12, letterSpacing: "-0.035em", color: "white", margin: "0 0 16px" }}>{title}</h1>
          {intro && <p style={{ color: "#c4d2df", fontSize: "clamp(17px, 2.5vw, 20px)", lineHeight: 1.6, margin: 0 }}>{intro}</p>}
        </div>
      </section>
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 22px 70px", lineHeight: 1.75, fontSize: 17 }}>
        <a href="/" style={{ color: "#087fbd", fontWeight: 800, textDecoration: "underline" }}>← Back to Home</a>
        <div style={{ marginTop: 28, background: "#fff", padding: "clamp(22px, 4vw, 44px)", borderRadius: 16, border: "1px solid #dce5ec", boxShadow: "0 8px 25px rgba(11,17,23,0.06)" }}>
          {children}
        </div>
      </main>
      <footer>
        <strong>Billings Home Pros</strong>
        <p>Connecting Billings-area homeowners with local home-service professionals.</p>
        <nav aria-label="Legal and support" style={{ justifyContent: "center", flexWrap: "wrap", gap: "12px 22px", marginBottom: 18 }}>
          <a href="/site-map" style={{ color: "#dce2de", textDecoration: "underline" }}>Site Map</a>
          <a href="/privacy" style={{ color: "#dce2de", textDecoration: "underline" }}>Privacy Policy</a>
          <a href="/terms" style={{ color: "#dce2de", textDecoration: "underline" }}>Terms of Service</a>
          <a href="mailto:support@billingshomepros.com" style={{ color: "#dce2de", textDecoration: "underline" }}>Contact Support</a>
        </nav>
        <small>© 2026 BillingsHomePros.com</small>
      </footer>
    </div>
  );
}
