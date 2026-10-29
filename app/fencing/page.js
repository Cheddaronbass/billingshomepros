import { withPageSocial } from "../lib/seoMetadata";
import Link from "next/link";
import CategoryPage from "../components/CategoryPage";

export const metadata = withPageSocial( {
  title: "Fence Contractors in Billings, MT",
  description:
    "Find fencing contractors in Billings, Montana for wood fences, vinyl fences, chain-link fences, and fence repairs.",
  alternates: {
    canonical: "/fencing",
  },
});

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Fencing", href: "/fencing" },
  {
    label: "Wood Fencing",
    href: "/fencing?service=wood-fencing",
    value: "wood-fencing",
  },
  {
    label: "Vinyl Fencing",
    href: "/fencing?service=vinyl-fencing",
    value: "vinyl-fencing",
  },
  {
    label: "Chain-Link Fencing",
    href: "/fencing?service=chain-link-fencing",
    value: "chain-link-fencing",
  },
  {
    label: "Fence Repair",
    href: "/fencing?service=fence-repair",
    value: "fence-repair",
  },
];

const serviceNames = {
  "wood-fencing": "Wood Fencing",
  "vinyl-fencing": "Vinyl Fencing",
  "chain-link-fencing": "Chain-Link Fencing",
  "fence-repair": "Fence Repair",
};

export default function FencingPage({ searchParams }) {
  return (
    <>
    <CategoryPage
      searchParams={searchParams}
      category="fencing"
      categoryLabel="Fencing"
      filters={filters}
      serviceNames={serviceNames}
      supportsEmergency={false}
      heroTitle="Fence Contractors in Billings, Montana"
      heroDescription="Find local fencing professionals for wood fences, vinyl fences, chain-link fences, installation, and repairs."
      eyebrow="FIND A LOCAL FENCE CONTRACTOR"
      introTitle="Fencing professionals serving the Billings area"
      introDescription="Browse fencing contractors serving Billings, Laurel, and surrounding communities."
      emptyTitle="No matching fencing listings yet."
      emptyDescription="Try another fencing service or view all fencing contractors serving the Billings area."
      guideJump
      localGuide={{
        "title": "Choosing a Fence Contractor in Billings, MT",
        "paragraphs": [
                "Before installing a wood, vinyl, or chain-link fence, identify your goals for privacy, pets, security, and maintenance. Discuss wind exposure, gate placement, and the layout of your property.",
                "Ask contractors to explain materials, post installation, removal of old fencing, cleanup, and expected timelines in a written estimate. Check property boundaries and local rules before work begins.",
                "Compare fencing bids based on the full installation scope and long-term upkeep, not just the price per foot."
        ]
}}

      icon="🏡"
      contractorEyebrow="BILLINGS FENCE CONTRACTORS"
      contractorTitle="Own a fencing business?"
      contractorDescription="Billings Home Pros helps homeowners discover local fencing contractors."
    />
    <section id="homeowner-guide-card" style={{background:"#0b1117",padding:"22px 18px 40px",scrollMarginTop:12}}>
      <div style={{maxWidth:1000,margin:"0 auto",padding:"20px 24px",border:"1px solid #2e5875",borderRadius:14,background:"#102638",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:18}}>
        <div><div style={{color:"#79d6ff",fontSize:12,fontWeight:800,letterSpacing:".1em"}}>FREE BILLINGS HOMEOWNER GUIDE</div><h2 style={{color:"#fff",fontSize:"clamp(20px,3vw,25px)",margin:"8px 0"}}>What does fence installation cost in Billings?</h2><p style={{color:"#c9d8e4",margin:0,lineHeight:1.5}}>Explore 2026 budget guidance and questions to ask local pros.</p></div>
        <Link href="/guides/fence-installation-cost-billings-mt" style={{background:"#24baff",color:"#07151f",borderRadius:9,fontWeight:800,textDecoration:"none",padding:"13px 18px"}}>Read the Free Guide →</Link>
      </div>
    </section>
    </>
  );
}
