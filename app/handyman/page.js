import { withPageSocial } from "../lib/seoMetadata";
import Link from "next/link";
import CategoryPage from "../components/CategoryPage";

export const metadata = withPageSocial( {
  title: "Handyman Services in Billings, MT",
  description:
    "Find handyman services in Billings, Montana for home repairs, installations, drywall repairs, and general home maintenance.",
  alternates: {
    canonical: "/handyman",
  },
});

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Handyman Services", href: "/handyman" },
  {
    label: "General Repairs",
    href: "/handyman?service=general-repairs",
    value: "general-repairs",
  },
  {
    label: "Drywall Repair",
    href: "/handyman?service=drywall-repair",
    value: "drywall-repair",
  },
  {
    label: "Home Maintenance",
    href: "/handyman?service=home-maintenance",
    value: "home-maintenance",
  },
  {
    label: "Installation Services",
    href: "/handyman?service=installation-services",
    value: "installation-services",
  },
];

const serviceNames = {
  "general-repairs": "General Repairs",
  "drywall-repair": "Drywall Repair",
  "home-maintenance": "Home Maintenance",
  "installation-services": "Installation Services",
};

export default function HandymanPage({ searchParams }) {
  return (
    <>
    <CategoryPage
      searchParams={searchParams}
      category="handyman"
      categoryLabel="Handyman"
      filters={filters}
      serviceNames={serviceNames}
      supportsEmergency={false}
      heroTitle="Handyman Services in Billings, Montana"
      heroDescription="Find local handyman professionals for home repairs, drywall repairs, installations, and general home maintenance."
      eyebrow="FIND A LOCAL HANDYMAN"
      introTitle="Handyman professionals serving the Billings area"
      introDescription="Compare handyman services in Billings and Laurel for drywall patches, door repairs, fixture installations, small home repairs, and routine maintenance. Confirm each provider’s specialties and ask about the scope and price before booking."
      emptyTitle="No matching handyman listings yet."
      emptyDescription="Try another service or view all handyman professionals serving the Billings area."
      localGuide={{
        "title": "Choosing a Handyman in Billings, MT",
        "paragraphs": [
                "For drywall patches, fixture installation, minor repairs, and home maintenance, make a list of tasks and share photos or measurements when requesting an estimate.",
                "Ask whether the provider handles each type of work, what materials are included, and how labor and travel charges are calculated. Confirm insurance and any applicable registration requirements.",
                "Some plumbing, electrical, and structural projects require specialized licensed professionals or permits. Ask before booking if your project may fall into one of those categories."
        ]
}}

      icon="🔧"
      contractorEyebrow="BILLINGS HANDYMAN SERVICES"
      contractorTitle="Own a handyman business?"
      contractorDescription="Billings Home Pros helps homeowners discover local handyman services."
    />
    <section style={{background:"#0b1117",padding:"22px 18px 40px"}}>
      <div style={{maxWidth:1000,margin:"0 auto",padding:"20px 24px",border:"1px solid #2e5875",borderRadius:14,background:"#102638",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:18}}>
        <div><div style={{color:"#79d6ff",fontSize:12,fontWeight:800,letterSpacing:".1em"}}>FREE BILLINGS HOMEOWNER GUIDE</div><h2 style={{color:"#fff",fontSize:"clamp(20px,3vw,25px)",margin:"8px 0"}}>How much do handyman services cost in Billings?</h2><p style={{color:"#c9d8e4",margin:0,lineHeight:1.5}}>Explore 2026 budget guidance and questions to ask local pros.</p></div>
        <Link href="/guides/handyman-rates-billings-mt" style={{background:"#24baff",color:"#07151f",borderRadius:9,fontWeight:800,textDecoration:"none",padding:"13px 18px"}}>Read the Free Guide →</Link>
      </div>
    </section>
    </>
  );
}
