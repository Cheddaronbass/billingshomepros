import { withPageSocial } from "../lib/seoMetadata";
import Link from "next/link";
import CategoryPage from "../components/CategoryPage";

export const metadata = withPageSocial( {
  title: "Landscaping Companies in Billings, MT",
  description:
    "Find landscaping professionals in Billings, Montana for lawn care, irrigation, landscape design, tree services, and outdoor projects.",
  alternates: {
    canonical: "/landscaping",
  },
});

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Landscaping", href: "/landscaping" },
  {
    label: "Lawn Care",
    href: "/landscaping?service=lawn-care",
    value: "lawn-care",
  },
  {
    label: "Irrigation",
    href: "/landscaping?service=irrigation",
    value: "irrigation",
  },
  {
    label: "Landscape Design",
    href: "/landscaping?service=landscape-design",
    value: "landscape-design",
  },
  {
    label: "Tree Services",
    href: "/landscaping?service=tree-services",
    value: "tree-services",
  },
];

const serviceNames = {
  "lawn-care": "Lawn Care",
  irrigation: "Irrigation",
  "landscape-design": "Landscape Design",
  "tree-services": "Tree Services",
};

export default function LandscapingPage({ searchParams }) {
  return (
    <>
    <CategoryPage
      searchParams={searchParams}
      category="landscaping"
      categoryLabel="Landscaping"
      filters={filters}
      serviceNames={serviceNames}
      supportsEmergency={false}
      heroTitle="Landscaping Companies in Billings, Montana"
      heroDescription="Find local landscaping professionals for lawn care, irrigation, landscape design, tree services, and outdoor projects."
      eyebrow="FIND A LOCAL LANDSCAPER"
      introTitle="Landscaping professionals serving the Billings area"
      introDescription="Browse landscaping companies serving Billings, Laurel, and surrounding communities."
      emptyTitle="No matching landscaping listings yet."
      emptyDescription="Try another landscaping service or view all landscaping professionals serving the Billings area."
      guideJump
      localGuide={{
        "title": "Choosing a Landscaping Company in Billings, MT",
        "paragraphs": [
                "Billings yards face dry periods, seasonal temperature swings, and changing irrigation needs. Discuss your property's sun exposure, watering requirements, and maintenance goals with a landscaping professional.",
                "For lawn care, irrigation, tree work, or landscape design, ask for a clear proposal covering plants or materials, installation, cleanup, and ongoing care.",
                "Compare local providers by the services they actually offer, their project experience, and whether their plan fits your budget and maintenance preferences."
        ]
}}

      icon="🌿"
      contractorEyebrow="BILLINGS LANDSCAPERS"
      contractorTitle="Own a landscaping business?"
      contractorDescription="Billings Home Pros helps homeowners discover local landscaping businesses."
    />
    <section id="homeowner-guide-card" style={{background:"#0b1117",padding:"22px 18px 40px",scrollMarginTop:12}}>
      <div style={{maxWidth:1000,margin:"0 auto",padding:"20px 24px",border:"1px solid #2e5875",borderRadius:14,background:"#102638",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:18}}>
        <div><div style={{color:"#79d6ff",fontSize:12,fontWeight:800,letterSpacing:".1em"}}>FREE BILLINGS HOMEOWNER GUIDE</div><h2 style={{color:"#fff",fontSize:"clamp(20px,3vw,25px)",margin:"8px 0"}}>What does landscaping projects cost in Billings?</h2><p style={{color:"#c9d8e4",margin:0,lineHeight:1.5}}>Explore 2026 budget guidance and questions to ask local pros.</p></div>
        <Link href="/guides/landscaping-cost-billings-mt" style={{background:"#24baff",color:"#07151f",borderRadius:9,fontWeight:800,textDecoration:"none",padding:"13px 18px"}}>Read the Free Guide →</Link>
      </div>
    </section>
    </>
  );
}
