import { withPageSocial } from "../lib/seoMetadata";
import Link from "next/link";
import CategoryPage from "../components/CategoryPage";

export const metadata = withPageSocial( {
  title: "Concrete Contractors in Billings, MT",
  description:
    "Find concrete contractors in Billings, Montana for driveways, patios, foundations, sidewalks, and decorative concrete.",
  alternates: {
    canonical: "/concrete",
  },
});

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Concrete", href: "/concrete" },
  {
    label: "Driveways",
    href: "/concrete?service=driveways",
    value: "driveways",
  },
  {
    label: "Patios & Walkways",
    href: "/concrete?service=patios-walkways",
    value: "patios-walkways",
  },
  {
    label: "Foundations",
    href: "/concrete?service=foundations",
    value: "foundations",
  },
  {
    label: "Decorative Concrete",
    href: "/concrete?service=decorative-concrete",
    value: "decorative-concrete",
  },
];

const serviceNames = {
  driveways: "Driveways",
  "patios-walkways": "Patios & Walkways",
  foundations: "Foundations",
  "decorative-concrete": "Decorative Concrete",
};

export default function ConcretePage({ searchParams }) {
  return (
    <>
    <CategoryPage
      searchParams={searchParams}
      category="concrete"
      categoryLabel="Concrete"
      filters={filters}
      serviceNames={serviceNames}
      supportsEmergency={false}
      heroTitle="Concrete Contractors in Billings, Montana"
      heroDescription="Find local concrete professionals for driveways, patios, sidewalks, foundations, and decorative concrete projects."
      eyebrow="FIND A LOCAL CONCRETE CONTRACTOR"
      introTitle="Concrete professionals serving the Billings area"
      introDescription="Compare concrete contractors serving Billings and Laurel for driveway replacements, patio pours, sidewalks, foundations, and decorative concrete. Review listed services and request a written estimate for your project."
      emptyTitle="No matching concrete listings yet."
      emptyDescription="Try another concrete service or view all concrete contractors serving the Billings area."
      localGuide={{
        "title": "Choosing a Concrete Contractor in Billings, MT",
        "paragraphs": [
                "Driveways, patios, sidewalks, and foundations need planning for drainage, site conditions, and seasonal temperature changes. Describe how the finished surface will be used and ask the contractor about the proposed approach.",
                "Compare estimates for preparation, base materials, reinforcement where appropriate, concrete finish, curing, and cleanup. Ask about scheduling and any permits that may apply.",
                "A detailed scope helps homeowners compare concrete bids and understand how the contractor plans to address cracking, drainage, and long-term maintenance."
        ]
}}

      icon="🧱"
      contractorEyebrow="BILLINGS CONCRETE CONTRACTORS"
      contractorTitle="Own a concrete business?"
      contractorDescription="Billings Home Pros helps homeowners discover local concrete contractors."
    />
    <section aria-label="Related concrete project resources" style={{background:"#0b1117",padding:"20px 18px",borderTop:"1px solid #243c50"}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <h2 style={{color:"#fff",fontSize:"clamp(19px,3vw,24px)",margin:"0 0 10px"}}>Planning concrete work around your home?</h2>
        <p style={{color:"#c9d8e4",fontSize:16,lineHeight:1.65,margin:0}}>Before comparing driveway bids, read our <Link href="/guides/concrete-driveway-cost-billings-mt" style={{color:"#73d4ff",textUnderlineOffset:3}}>Billings concrete driveway cost guide</Link>. For projects that also involve grading, yard layout, or outdoor improvements, browse <Link href="/landscaping" style={{color:"#73d4ff",textUnderlineOffset:3}}>local landscaping companies</Link>.</p>
      </div>
    </section>
    <section style={{background:"#0b1117",padding:"22px 18px 40px"}}>
      <div style={{maxWidth:1000,margin:"0 auto",padding:"20px 24px",border:"1px solid #2e5875",borderRadius:14,background:"#102638",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:18}}>
        <div><div style={{color:"#79d6ff",fontSize:12,fontWeight:800,letterSpacing:".1em"}}>FREE BILLINGS HOMEOWNER GUIDE</div><h2 style={{color:"#fff",fontSize:"clamp(20px,3vw,25px)",margin:"8px 0"}}>What does a concrete driveway cost in Billings?</h2><p style={{color:"#c9d8e4",margin:0,lineHeight:1.5}}>Explore 2026 budget guidance and questions to ask local pros.</p></div>
        <Link href="/guides/concrete-driveway-cost-billings-mt" style={{background:"#24baff",color:"#07151f",borderRadius:9,fontWeight:800,textDecoration:"none",padding:"13px 18px"}}>Read the Free Guide →</Link>
      </div>
    </section>
    </>
  );
}
