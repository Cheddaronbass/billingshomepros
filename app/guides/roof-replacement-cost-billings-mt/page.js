import Link from "next/link";

export const metadata = {
  title: "How Much Does a New Roof Cost in Billings, MT? (2026 Guide)",
  description: "Research-based 2026 roof replacement cost estimates for Billings, Montana, plus the factors that affect a quote and questions to ask local roofers.",
  alternates: { canonical: "/guides/roof-replacement-cost-billings-mt" },
};

const page = { background: "#0b1117", color: "#e8f1f8", minHeight: "100vh", fontFamily: "Arial, Helvetica, sans-serif" };
const container = { width: "min(100% - 36px, 850px)", margin: "0 auto" };
const card = { background: "#121e2a", border: "1px solid #2b4559", borderRadius: 16, padding: "24px", margin: "24px 0" };
const heading = { color: "#fff", fontSize: "clamp(23px, 4vw, 30px)", lineHeight: 1.2, margin: "36px 0 12px" };
const p = { color: "#c9d8e4", fontSize: 16, lineHeight: 1.75, margin: "12px 0" };
const link = { color: "#48c5ff", textDecoration: "underline", textUnderlineOffset: 3 };

export default function BillingsRoofCostGuide() {
  return (
    <main style={page}>
      <header style={{ borderBottom: "1px solid #263d50", padding: "20px 0" }}>
        <div style={{ ...container, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <Link href="/" style={{ color: "white", fontSize: 20, fontWeight: 800, textDecoration: "none" }}>Billings Home Pros</Link>
          <Link href="/roofing" style={{ ...link, fontWeight: 700 }}>Browse Billings Roofers →</Link>
        </div>
      </header>
      <article style={{ ...container, padding: "45px 0 70px" }}>
        <nav aria-label="Breadcrumb" style={{ color: "#9fb7ca", fontSize: 14, marginBottom: 22 }}>
          <Link href="/" style={link}>Home</Link> / <Link href="/roofing" style={link}>Roofing</Link> / Roof Replacement Cost
        </nav>
        <div style={{ color: "#4bc1ff", fontSize: 13, letterSpacing: "0.12em", fontWeight: 800 }}>BILLINGS HOMEOWNER GUIDE · UPDATED OCTOBER 2026</div>
        <h1 style={{ color: "#fff", fontSize: "clamp(32px, 6vw, 49px)", lineHeight: 1.12, letterSpacing: "-0.035em", margin: "14px 0 18px" }}>How Much Does a New Roof Cost in Billings, MT?</h1>
        <p style={{ ...p, fontSize: 19 }}>Planning a roof replacement in Billings, Laurel, or Yellowstone County? Here's a practical starting point for budgeting and comparing roofing estimates.</p>

        <div style={{ ...card, borderColor: "#277ab0", background: "#102638" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#8cdaff", letterSpacing: ".09em" }}>2026 RESEARCH-BASED PLANNING RANGE</div>
          <div style={{ color: "white", fontSize: "clamp(30px, 6vw, 46px)", fontWeight: 800, margin: "8px 0" }}>$12,000–$23,000</div>
          <p style={{ ...p, margin: 0 }}>A broad estimate for an asphalt-shingle replacement on a typical single-family home around 2,000 square feet of living area. This is <strong>not a contractor quote or a verified Billings transaction average</strong>. Smaller, simpler roofs may cost less; steep, large, damaged, or premium-material roofs may cost more.</p>
        </div>

        <h2 style={heading}>What does that estimate include?</h2>
        <p style={p}>Published Billings-area estimating guides vary. A 2026 market model from Roof Cost Index estimates about $12,500–$23,100 for a reference 2,000-square-foot home using architectural shingles. Another 2026 estimator, 3D Roofs, puts a mid-sized Billings architectural-asphalt replacement around $12,326–$19,838. These are modeled ranges, not bids we collected from local contractors.</p>
        <p style={p}>A complete quote may cover removing old shingles, disposal, underlayment, new roofing, flashing, ventilation details, and cleanup. Ask which items are included and which could be additional.</p>

        <h2 style={heading}>What changes the price of a roof in Billings?</h2>
        <div style={card}>
          <ul style={{ ...p, paddingLeft: 23, margin: 0 }}>
            <li><strong>Actual roof area:</strong> Contractors measure roof surface—not just the square footage of rooms inside your home.</li>
            <li><strong>Pitch and layout:</strong> Steep roofs, valleys, dormers, chimneys, and multiple levels add labor and material waste.</li>
            <li><strong>Materials:</strong> Asphalt shingles generally have a lower upfront cost than many metal and specialty roof systems.</li>
            <li><strong>Tear-off and decking:</strong> Multiple existing layers or damaged sheathing can increase the final price.</li>
            <li><strong>Billings weather:</strong> Hail, high winds, freezing conditions, and ice-dam protection can influence material and installation choices.</li>
            <li><strong>Project scope:</strong> Flashing, gutters, ventilation improvements, permits, and unforeseen repairs may or may not appear in a basic estimate.</li>
          </ul>
        </div>

        <h2 style={heading}>Repair or replace?</h2>
        <p style={p}>A leak or a few missing shingles does not automatically mean you need a complete new roof. Localized issues may be repairable. Widespread damage, recurring leaks, brittle shingles, or failing roof decking may make replacement a better long-term option. A roofer should inspect the roof before making that recommendation.</p>

        <h2 style={heading}>What about hail damage and insurance?</h2>
        <p style={p}>After a storm, photograph visible damage from a safe location and review your insurance policy's deductible and coverage terms. A roofing contractor can document roof conditions, but your insurer decides covered losses under your policy. Avoid assuming a replacement will be fully covered.</p>

        <h2 style={heading}>Questions to ask before signing</h2>
        <ol style={{ ...p, paddingLeft: 23 }}>
          <li>Is your estimate itemized for materials, labor, tear-off, disposal, and cleanup?</li>
          <li>What happens if damaged decking is discovered?</li>
          <li>What shingles, underlayment, flashing, and ventilation are included?</li>
          <li>Who handles any required permits and inspections?</li>
          <li>Can you provide proof of current insurance, applicable registration, and written warranty terms?</li>
          <li>What is the payment schedule, projected start date, and estimated completion window?</li>
        </ol>
        <p style={p}>Get more than one written estimate if you can, and compare the scope—not just the bottom-line price.</p>

        <section style={{ ...card, background: "#102638", borderColor: "#277ab0", marginTop: 38 }}>
          <h2 style={{ color: "white", fontSize: 25, margin: "0 0 12px" }}>Ready to compare local roofers?</h2>
          <p style={p}>Explore roofing businesses serving Billings, Laurel, and the surrounding Yellowstone County area. Ask contractors for a project-specific written estimate.</p>
          <Link href="/roofing" style={{ display: "inline-block", background: "#20b8fc", color: "#07151f", fontWeight: 800, padding: "14px 21px", borderRadius: 9, textDecoration: "none", marginTop: 10 }}>Find Billings Roofing Companies →</Link>
        </section>

        <h2 style={{ ...heading, fontSize: 22 }}>Sources & estimate methodology</h2>
        <p style={{ ...p, fontSize: 14 }}>The planning range is rounded from independently published 2026 estimating models. We have not independently audited their pricing data or verified it with individual local roofing bids. Prices change, and your home requires an on-site assessment.</p>
        <ul style={{ ...p, fontSize: 14, paddingLeft: 23 }}>
          <li><a style={link} href="https://roofcostindex.com/cost/montana/billings/" target="_blank" rel="noopener noreferrer">Roof Cost Index — Billings, Q3 2026</a></li>
          <li><a style={link} href="https://www.3droofs.com/roof-replacement-cost/billings-mt" target="_blank" rel="noopener noreferrer">3D Roofs — Billings replacement cost, July 2026</a></li>
          <li><a style={link} href="https://www.thisoldhouse.com/roofing/roof-replacement-cost-montana" target="_blank" rel="noopener noreferrer">This Old House — Montana roof replacement cost factors</a></li>
        </ul>
        <p style={{ ...p, fontSize: 13, borderTop: "1px solid #263d50", paddingTop: 24 }}>Billings Home Pros is a local home-services directory, not a roofing contractor. We do not guarantee pricing, availability, work quality, or insurance outcomes.</p>
      </article>
    </main>
  );
}
