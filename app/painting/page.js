import { withPageSocial } from "../lib/seoMetadata";
import Link from "next/link";
import CategoryPage from "../components/CategoryPage";

export const metadata = withPageSocial( {
  title: "Painting Contractors in Billings, MT",
  description:
    "Find professional painters in Billings, Montana for interior painting, exterior painting, cabinet painting, and commercial painting.",
  alternates: {
    canonical: "/painting",
  },
});

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Painting", href: "/painting" },
  {
    label: "Interior Painting",
    href: "/painting?service=interior-painting",
    value: "interior-painting",
  },
  {
    label: "Exterior Painting",
    href: "/painting?service=exterior-painting",
    value: "exterior-painting",
  },
  {
    label: "Cabinet Painting",
    href: "/painting?service=cabinet-painting",
    value: "cabinet-painting",
  },
  {
    label: "Commercial Painting",
    href: "/painting?service=commercial-painting",
    value: "commercial-painting",
  },
];

const serviceNames = {
  "interior-painting": "Interior Painting",
  "exterior-painting": "Exterior Painting",
  "cabinet-painting": "Cabinet Painting",
  "commercial-painting": "Commercial Painting",
};

export default function PaintingPage({ searchParams }) {
  return (
    <>
    <CategoryPage
      searchParams={searchParams}
      category="painting"
      categoryLabel="Painting"
      filters={filters}
      serviceNames={serviceNames}
      supportsEmergency={false}
      heroTitle="Painting Contractors in Billings, Montana"
      heroDescription="Find local painting professionals for interior painting, exterior painting, cabinet refinishing, and commercial projects."
      eyebrow="FIND A LOCAL PAINTER"
      introTitle="Painting professionals serving the Billings area"
      introDescription="Browse painting contractors serving Billings, Laurel, and surrounding communities."
      emptyTitle="No matching painting listings yet."
      emptyDescription="Try another painting service or view all painting contractors serving the Billings area."
      localGuide={{
        "title": "Choosing a Painting Contractor in Billings, MT",
        "paragraphs": [
                "A lasting paint job starts with proper preparation. Ask painters how they will handle cleaning, scraping, repairs, priming, and protection of nearby surfaces.",
                "For exterior projects in Billings, discuss weather conditions, scheduling, and the products recommended for your siding or trim. Interior and cabinet painting may require different preparation methods.",
                "Request written estimates that identify surfaces, coats, materials, cleanup, and warranty terms so you can compare bids fairly."
        ]
}}

      icon="🎨"
      contractorEyebrow="BILLINGS PAINTERS"
      contractorTitle="Own a painting business?"
      contractorDescription="Billings Home Pros helps homeowners discover local painting contractors."
    />
    <section style={{background:"#0b1117",padding:"22px 18px 40px"}}>
      <div style={{maxWidth:1000,margin:"0 auto",padding:"20px 24px",border:"1px solid #2e5875",borderRadius:14,background:"#102638",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:18}}>
        <div><div style={{color:"#79d6ff",fontSize:12,fontWeight:800,letterSpacing:".1em"}}>FREE BILLINGS HOMEOWNER GUIDE</div><h2 style={{color:"#fff",fontSize:"clamp(20px,3vw,25px)",margin:"8px 0"}}>What does exterior painting cost in Billings?</h2><p style={{color:"#c9d8e4",margin:0,lineHeight:1.5}}>Explore 2026 budget guidance and questions to ask local pros.</p></div>
        <Link href="/guides/exterior-house-painting-cost-billings-mt" style={{background:"#24baff",color:"#07151f",borderRadius:9,fontWeight:800,textDecoration:"none",padding:"13px 18px"}}>Read the Free Guide →</Link>
      </div>
    </section>
    </>
  );
}
