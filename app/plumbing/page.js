import { withPageSocial } from "../lib/seoMetadata";
import Link from "next/link";
import CategoryPage from "../components/CategoryPage";

export const metadata = withPageSocial( {
  title: "Plumbers in Billings, MT | Repairs, Drains & Water Heaters",
  description:
    "Find local plumbers in Billings, Montana for plumbing repairs, water heaters, drain and sewer service, and emergency plumbing. Compare local professionals and request a quote.",
  alternates: {
    canonical: "/plumbing",
  },
});

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Plumbing", href: "/plumbing" },
  {
    label: "Emergency Service",
    href: "/plumbing?service=emergency",
    value: "emergency",
  },
  {
    label: "Water Heaters",
    href: "/plumbing?service=water-heaters",
    value: "water-heaters",
  },
  {
    label: "Drain & Sewer",
    href: "/plumbing?service=drain-sewer",
    value: "drain-sewer",
  },
  {
    label: "Repairs",
    href: "/plumbing?service=repairs",
    value: "repairs",
  },
];

const serviceNames = {
  "water-heaters": "Water Heaters",
  "drain-sewer": "Drain & Sewer",
  repairs: "Repairs",
};

export default function PlumbingPage({ searchParams }) {
  return (
    <>
    <CategoryPage
      searchParams={searchParams}
      category="plumbing"
      categoryLabel="Plumbing"
      filters={filters}
      serviceNames={serviceNames}
      supportsEmergency={true}
      heroTitle="Plumbers in Billings, Montana"
      heroDescription="Find local plumbing professionals for repairs, water heaters, clogged drains, fixtures, emergency service and more."
      eyebrow="FIND A LOCAL PLUMBER"
      introTitle="Plumbing professionals serving the Billings area"
      introDescription="Compare Billings-area plumbing companies for leaking pipes, drain and sewer problems, water heater service, fixture repairs, and other home plumbing projects. Check each business’s listed specialties and confirm service availability before requesting an estimate."
      emptyTitle="No matching plumbing listings yet."
      emptyDescription="Try another plumbing service or view all plumbing professionals serving the Billings area."
      guideJump
      localGuide={{
        "title": "Choosing a Plumber in Billings, MT",
        "paragraphs": [
                "For leaks, clogged drains, or water-heater trouble, describe the symptoms and ask whether a plumber offers diagnosis, repair, or replacement. For active leaks, locate your water shutoff and avoid affected electrical areas.",
                "Before hiring, ask for a written estimate, expected timing, and any applicable license or insurance information. Compare the scope of work, parts, and warranty details—not just the price.",
                "For urgent plumbing problems, confirm emergency availability and any after-hours charges before scheduling.",
                "If you have a leaking water heater, describe the tank type, approximate age, and where water is appearing. Ask whether a repair is practical or replacement is recommended, and whether disposal and permit-related work are included in the estimate.",
                "For recurring clogs or slow drains, tell the plumber which fixtures are affected and whether the problem keeps returning. Ask whether drain cleaning, a camera inspection, or further diagnosis makes sense before approving major sewer work."
        ]
}}

      icon="🔧"
      contractorEyebrow="BILLINGS PLUMBERS"
      contractorTitle="Own a plumbing business?"
      contractorDescription="Billings Home Pros is building a local directory designed to help homeowners find businesses like yours."
    />
    <section aria-label="Specialist services" style={{background:"#0b1117",padding:"20px 18px",borderTop:"1px solid #243c50"}}>
      <div style={{maxWidth:1000,margin:"0 auto",display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
        <strong style={{color:"#fff",fontSize:15}}>Looking for a specific service?</strong>
        <Link href="/plumbing/water-heater-repair" style={{color:"#73d4ff",fontWeight:700,textUnderlineOffset:3}}>Water heater repair in Billings →</Link>
      </div>
    </section>
    <section id="homeowner-guide-card" style={{background:"#0b1117",padding:"22px 18px 40px",scrollMarginTop:12}}>
      <div style={{maxWidth:1000,margin:"0 auto",padding:"20px 24px",border:"1px solid #2e5875",borderRadius:14,background:"#102638",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:18}}>
        <div><div style={{color:"#79d6ff",fontSize:12,fontWeight:800,letterSpacing:".1em"}}>FREE BILLINGS HOMEOWNER GUIDE</div><h2 style={{color:"#fff",fontSize:"clamp(20px,3vw,25px)",margin:"8px 0"}}>What does water heater replacement cost in Billings?</h2><p style={{color:"#c9d8e4",margin:0,lineHeight:1.5}}>Explore 2026 budget guidance and questions to ask local pros.</p></div>
        <Link href="/guides/water-heater-replacement-cost-billings-mt" style={{background:"#24baff",color:"#07151f",borderRadius:9,fontWeight:800,textDecoration:"none",padding:"13px 18px"}}>Read the Free Guide →</Link>
      </div>
    </section>
    </>
  );
}
