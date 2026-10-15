export const metadata = {
  title: "Our Progress & Partnership Promise | Billings Home Pros",
  description: "See the improvements we're making to help homeowners discover local Billings service professionals.",
  alternates: { canonical: "/our-progress" },
};

const groups = [
  {
    title: "What we've improved",
    items: [
      "October 13, 2026 — Added a public site map to make our service categories easier to discover.",
      "October 13, 2026 — Improved canonical URL settings to help search engines identify the right pages.",
      "October 13, 2026 — Expanded the XML sitemap to include more useful site pages.",
    ],
  },
  {
    title: "What we're reviewing",
    items: [
      "Google Search Console visibility, search queries, and indexing every week.",
      "Ways to make contractor listings more useful and easier to find.",
    ],
  },
  {
    title: "Our next priority",
    items: [
      "Audit individual listing titles and descriptions, then evaluate appropriate structured data.",
      "If no improvement is ready to implement, research and select the next measurable opportunity.",
    ],
  },
];

export default function OurProgressPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f7f9fb", color: "#203247", padding: "28px 18px 44px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <a href="/" style={{ color: "#245b72", fontSize: 16 }}>← Billings Home Pros</a>
        <header style={{ margin: "24px 0 20px" }}>
          <p style={{ color: "#527080", fontWeight: 700, fontSize: 15, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Weekly Progress &amp; Transparency Report</p>
          <h1 style={{ fontSize: "clamp(30px, 6vw, 44px)", lineHeight: 1.12, margin: "0 0 12px" }}>Our Progress &amp; Partnership Promise</h1>
          <p style={{ fontSize: "clamp(18px, 3vw, 21px)", lineHeight: 1.45, margin: 0 }}>Our promise is to report what we actually improve, distinguish completed work from plans, and never guarantee rankings or leads. We review search performance weekly and keep looking for practical ways to help more homeowners discover local professionals.</p>
          <p style={{ fontSize: 15, color: "#526575", margin: "12px 0 0" }}>Last published: October 13, 2026 at 8:18 AM MDT · Reviewed weekly</p>
        </header>
        <div style={{ display: "grid", gap: 14 }}>
          {groups.map((group) => (
            <section key={group.title} style={{ background: "#fff", border: "1px solid #e0e7eb", borderRadius: 14, padding: "18px 22px" }}>
              <h2 style={{ fontSize: "clamp(21px, 4vw, 25px)", margin: "0 0 8px" }}>{group.title}</h2>
              <ul style={{ fontSize: "clamp(17px, 2.6vw, 19px)", lineHeight: 1.45, paddingLeft: 24, margin: 0 }}>
                {group.items.map((item) => <li key={item} style={{ marginBottom: 8 }}>{item}</li>)}
              </ul>
            </section>
          ))}
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.5, color: "#526575", marginTop: 18 }}>We report work completed and planned separately. Search rankings, traffic, and customer inquiries are not guaranteed.</p>
        <footer style={{ borderTop: "1px solid #d7e0e5", marginTop: 24, paddingTop: 22, textAlign: "center" }}>
          <p style={{ fontSize: "clamp(19px, 3vw, 24px)", fontWeight: 750, lineHeight: 1.3, margin: "0 0 8px" }}>Committed to growing together, right here in Billings.</p>
          <p style={{ fontSize: 16, lineHeight: 1.5, color: "#526575", margin: 0 }}>Supporting local contractors. Connecting homeowners. Building a stronger community.</p>
        </footer>
      </div>
    </main>
  );
}
