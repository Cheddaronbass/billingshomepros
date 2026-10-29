import { withPageSocial } from "../../lib/seoMetadata";
import CategoryPage from "../../components/CategoryPage";
import Link from "next/link";

export const metadata = withPageSocial( {
  title: "AC Repair in Billings, MT | Local HVAC Companies",
  description:
    "Find local AC repair companies in Billings, MT for air conditioning repair, service, maintenance, and installation. Compare local HVAC professionals and request a quote.",
  alternates: {
    canonical: "/hvac/ac-repair",
  },
});

export const dynamic = "force-dynamic";

const filters = [
  { label: "All HVAC", href: "/hvac" },
  {
    label: "Heating",
    href: "/hvac?service=heating",
    value: "heating",
  },
  {
    label: "Air Conditioning",
    href: "/hvac?service=air-conditioning",
    value: "air-conditioning",
  },
  {
    label: "Furnace Repair",
    href: "/hvac?service=furnace-repair",
    value: "furnace-repair",
  },
  {
    label: "Maintenance",
    href: "/hvac?service=maintenance",
    value: "maintenance",
  },
];

const serviceNames = {
  heating: "Heating",
  "air-conditioning": "Air Conditioning",
  "furnace-repair": "Furnace Repair",
  maintenance: "Maintenance",
};

export default function ACRepairPage() {
  return (
    <>
    <CategoryPage
      fixedService="air-conditioning"
      category="hvac"
      categoryLabel="HVAC"
      filters={filters}
      serviceNames={serviceNames}
      heroTitle="AC Repair in Billings, Montana"
      heroDescription="Find local Billings HVAC professionals for air conditioning repair, service, maintenance, and installation."
      eyebrow="AIR CONDITIONING REPAIR IN BILLINGS"
      introTitle="Find AC repair professionals serving Billings"
      introDescription="Compare Billings-area HVAC companies listing air conditioner repairs, cooling diagnostics, and maintenance. Contact each business to confirm the equipment they service, availability, and written estimates before scheduling."
      localGuide={{
        title: "Before Hiring an AC Repair Company in Billings",
        paragraphs: [
          "If your air conditioner is running but not cooling, note whether the indoor unit and outdoor unit start, whether airflow is weak, and whether the issue happens continuously or only during hot afternoons. Share those symptoms with the HVAC company when requesting service.",
          "Ask whether the technician diagnoses refrigerant leaks, electrical faults, airflow problems, and thermostat issues. Confirm that the company services your system type and your Billings-area address before scheduling.",
          "Request an explanation of the diagnosis and a written repair estimate before approving work. Compare repair cost, equipment condition, warranty coverage, and replacement options if major repairs are proposed.",
          "If the system is leaking near electrical components or a breaker repeatedly trips, stop operating it and ask a qualified professional to assess the problem. Avoid opening electrical panels or handling refrigerant yourself."
        ]
      }}
      guideJump
      guideJumpTarget="homeowner-guide"
      emptyTitle="No matching AC repair listings yet."
      emptyDescription="Browse all HVAC professionals serving the Billings area."
      icon="❄️"
      contractorEyebrow="BILLINGS HVAC COMPANIES"
      contractorTitle="Own an HVAC business?"
      contractorDescription="Billings Home Pros helps local homeowners find HVAC professionals for AC repair, heating, maintenance, and other home comfort services."
    />
    <section aria-label="Related heating and cooling services" style={{background:"#0b1117",padding:"24px 18px",borderTop:"1px solid #243c50"}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <h2 style={{color:"#fff",fontSize:"clamp(20px,3vw,24px)",margin:"0 0 10px"}}>Need help with another heating or cooling issue?</h2>
        <p style={{color:"#c9d8e4",fontSize:16,lineHeight:1.65,margin:0}}>Compare <Link href="/hvac" style={{color:"#73d4ff"}}>Billings HVAC companies</Link> for heating, cooling, and maintenance, or browse <Link href="/hvac/furnace-repair" style={{color:"#73d4ff"}}>furnace repair professionals</Link> if your heating system needs attention.</p>
      </div>
    </section>
    </>
  );
}
