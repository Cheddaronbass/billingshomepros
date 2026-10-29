import { withPageSocial } from "../lib/seoMetadata";
import Link from "next/link";
import CategoryPage from "../components/CategoryPage";

export const metadata = withPageSocial( {
  title: "Electricians in Billings, MT",
  description:
    "Find local electricians in Billings, Montana for electrical repairs, panels and breakers, lighting, wiring, and installations. Compare local professionals and request a quote.",
  alternates: {
    canonical: "/electrical",
  },
});

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Electrical", href: "/electrical" },
  {
    label: "Electrical Repairs",
    href: "/electrical?service=repairs",
    value: "repairs",
  },
  {
    label: "Panels & Breakers",
    href: "/electrical?service=panels-breakers",
    value: "panels-breakers",
  },
  {
    label: "Lighting",
    href: "/electrical?service=lighting",
    value: "lighting",
  },
  {
    label: "Wiring",
    href: "/electrical?service=wiring",
    value: "wiring",
  },
  {
    label: "Installation",
    href: "/electrical?service=installation",
    value: "installation",
  },
];

const serviceNames = {
  repairs: "Electrical Repairs",
  "panels-breakers": "Panels & Breakers",
  lighting: "Lighting",
  wiring: "Wiring",
  installation: "Installation",
};

export default function ElectricalPage({ searchParams }) {
  return (
    <>
    <CategoryPage
      searchParams={searchParams}
      category="electrical"
      categoryLabel="Electrical"
      filters={filters}
      serviceNames={serviceNames}
      heroTitle="Electricians in Billings, Montana"
      heroDescription="Find local electrical professionals for repairs, panels, lighting, wiring, installations and more."
      eyebrow="FIND A LOCAL ELECTRICIAN"
      introTitle="Electrical professionals serving the Billings area"
      introDescription="Compare Billings-area electricians for panel upgrades, breaker problems, lighting installations, wiring, and electrical repairs. Review each contractor’s listed services, confirm licensing for the work, and request a written estimate."
      emptyTitle="No matching electrical listings yet."
      emptyDescription="Try another electrical service or view all electricians serving the Billings area."
      guideJump
      localGuide={{
        "title": "Choosing an Electrician in Billings, MT",
        "paragraphs": [
                "Whether you need lighting, wiring, a panel upgrade, or an electrical repair, describe the project and ask an electrician to assess the work before beginning.",
                "Compare written estimates that describe materials, permits when applicable, timing, and cleanup. Verify licensing and insurance requirements for the specific job.",
                "Flickering lights, warm outlets, or repeatedly tripping breakers can signal a problem worth professional inspection. Avoid opening panels or attempting unsafe electrical repairs yourself.",
                "For panel and breaker work, describe whether you need a repair, added circuits, or a larger service upgrade. Ask the electrician to explain whether permits, inspections, or utility coordination may be needed.",
                "For lighting or wiring work in Billings and Yellowstone County, share fixture locations, relevant photos, and your schedule. Confirm the company handles residential projects of your size before requesting an estimate."
        ]
}}

      icon="⚡"
      contractorEyebrow="BILLINGS ELECTRICIANS"
      contractorTitle="Own an electrical business?"
      contractorDescription="Billings Home Pros is building a local directory designed to help homeowners find businesses like yours."
    />
    <section id="homeowner-guide-card" style={{background:"#0b1117",padding:"22px 18px 40px",scrollMarginTop:12}}>
      <div style={{maxWidth:1000,margin:"0 auto",padding:"20px 24px",border:"1px solid #2e5875",borderRadius:14,background:"#102638",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:18}}>
        <div><div style={{color:"#79d6ff",fontSize:12,fontWeight:800,letterSpacing:".1em"}}>FREE BILLINGS HOMEOWNER GUIDE</div><h2 style={{color:"#fff",fontSize:"clamp(20px,3vw,25px)",margin:"8px 0"}}>What does an electrical panel upgrade cost in Billings?</h2><p style={{color:"#c9d8e4",margin:0,lineHeight:1.5}}>Explore 2026 budget guidance and questions to ask local pros.</p></div>
        <Link href="/guides/electrical-panel-upgrade-cost-billings-mt" style={{background:"#24baff",color:"#07151f",borderRadius:9,fontWeight:800,textDecoration:"none",padding:"13px 18px"}}>Read the Free Guide →</Link>
      </div>
    </section>
    </>
  );
}
