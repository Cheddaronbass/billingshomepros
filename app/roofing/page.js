import { withPageSocial } from "../lib/seoMetadata";
import Link from "next/link";
import CategoryPage from "../components/CategoryPage";

export const metadata = withPageSocial( {
  title: "Roofing Companies in Billings, MT | Roof Repair & Replacement",
  description:
    "Find local roofing companies in Billings, Montana for roof repair, roof replacement, inspections, and storm damage. Compare local roofers and request a quote.",
  alternates: {
    canonical: "/roofing",
  },
});

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Roofing", href: "/roofing" },
  {
    label: "Roof Repair",
    href: "/roofing?service=roof-repair",
    value: "roof-repair",
  },
  {
    label: "Roof Replacement",
    href: "/roofing?service=roof-replacement",
    value: "roof-replacement",
  },
  {
    label: "Inspections",
    href: "/roofing?service=inspections",
    value: "inspections",
  },
  {
    label: "Storm Damage",
    href: "/roofing?service=storm-damage",
    value: "storm-damage",
  },
];

const serviceNames = {
  "roof-repair": "Roof Repair",
  "roof-replacement": "Roof Replacement",
  inspections: "Inspections",
  "storm-damage": "Storm Damage",
};

export default function RoofingPage({ searchParams }) {
  return (
    <>
    <CategoryPage
      searchParams={searchParams}
      category="roofing"
      categoryLabel="Roofing"
      filters={filters}
      serviceNames={serviceNames}
      heroTitle="Roofing Companies in Billings, Montana"
      heroDescription="Compare Billings-area roofers for leak repairs, roof replacement, inspections, and storm-damage work. Explore local business profiles and contact contractors directly."
      eyebrow="FIND A LOCAL ROOFER"
      introTitle="Find local roofers in Billings and Yellowstone County"
      introDescription="Compare Billings-area roofing companies for leak repairs, storm-damage inspections, shingle replacement, and full roof replacements. Review each business’s listed services and contact the contractor directly to confirm availability and request an estimate."
      emptyTitle="No matching roofing listings yet."
      emptyDescription="Try another roofing service or view all roofing professionals serving the Billings area."
      localGuide={{
        title: "Choosing a Roofing Contractor in Billings, MT",
        paragraphs: [
          "Billings-area roofs face changing seasons, wind, hail, and winter weather. If you notice missing shingles, leaks, or possible storm damage, ask a local roofing contractor to inspect the roof and explain the condition before deciding on repairs or replacement.",
          "When comparing roofing companies, ask for a written estimate that explains materials, labor, cleanup, and timing. Confirm insurance, applicable licensing or registration, and warranty terms, and compare more than one estimate when possible.",
          "For storm damage, document visible issues safely from the ground and ask how the contractor handles inspections and repair timelines. Browse the Billings-area roofers listed above to find companies offering roof repair, replacement, inspections, or storm-damage services.",
          "Roof repair or replacement? If damage is confined to a small area, ask whether a targeted repair is practical. For recurring leaks, widespread shingle wear, or storm damage, request an inspection and compare repair costs with replacement estimates. The right choice depends on roof condition, not just age.",
          "Before calling a roofer, have your address, approximate roof age, and a description of leaks or storm damage ready. Ask which roofing materials the company works with, whether it serves your neighborhood in Billings, Laurel, or the surrounding Yellowstone County area, and when an inspection could be scheduled."
        ]
      }}
      icon="🏠"
      contractorEyebrow="BILLINGS ROOFERS"
      contractorTitle="Own a roofing business?"
      contractorDescription="Billings Home Pros is building a local directory designed to help homeowners find businesses like yours."
    />
    <section aria-label="Related homeowner resources" style={{background:"#0b1117",padding:"22px 18px",borderTop:"1px solid #243c50"}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <h2 style={{color:"#fff",fontSize:"clamp(19px,3vw,24px)",margin:"0 0 10px"}}>Planning a roofing project in Billings?</h2>
        <p style={{color:"#c9d8e4",fontSize:16,lineHeight:1.65,margin:"0 0 12px"}}>If you're comparing bids for a new roof, review the <Link href="/guides/roof-replacement-cost-billings-mt" style={{color:"#73d4ff",textUnderlineOffset:3}}>Billings roof replacement cost guide</Link> and check the <Link href="/roofing/roof-replacement" style={{color:"#73d4ff",textUnderlineOffset:3}}>roof replacement service page</Link>. For projects that also involve structural repairs or renovations, browse <Link href="/contractors-remodeling" style={{color:"#73d4ff",textUnderlineOffset:3}}>Billings general contractors and remodelers</Link>.</p>
      </div>
    </section>
    <section aria-label="Specialist services" style={{background:"#0b1117",padding:"20px 18px",borderTop:"1px solid #243c50"}}>
      <div style={{maxWidth:1000,margin:"0 auto",display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
        <strong style={{color:"#fff",fontSize:15}}>Looking for a specific service?</strong>
        <Link href="/roofing/roof-replacement" style={{color:"#73d4ff",fontWeight:700,textUnderlineOffset:3}}>Roof replacement in Billings →</Link>
      </div>
    </section>
    <section style={{ background: "#0b1117", padding: "24px 18px 42px", borderTop: "1px solid #254059" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", border: "1px solid #2e5875", background: "#102638", borderRadius: 14, padding: "22px 26px", display: "flex", gap: 20, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <div style={{ color: "#79d6ff", fontSize: 12, fontWeight: 800, letterSpacing: ".1em" }}>FREE BILLINGS HOMEOWNER GUIDE</div>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", color: "#fff", margin: "9px 0 7px" }}>How much does a new roof cost in Billings?</h2>
          <p style={{ color: "#c9d8e4", margin: 0, lineHeight: 1.5 }}>See estimated 2026 costs and what to ask before hiring a roofer.</p>
        </div>
        <Link href="/guides/roof-replacement-cost-billings-mt" style={{ color: "#07151f", background: "#24baff", borderRadius: 9, fontWeight: 800, textDecoration: "none", padding: "13px 18px", whiteSpace: "nowrap" }}>Read the Free Guide →</Link>
      </div>
    </section>
    </>
  );
}
