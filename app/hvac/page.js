import CategoryPage from "../components/CategoryPage";

export const metadata = {
  title: "HVAC Repair, Heating & AC Companies in Billings, MT",
  description:
  "Find local HVAC repair companies in Billings, MT for AC repair, furnace repair, heating, air conditioning, installation, and maintenance. Compare local pros and request a quote.",
  alternates: {
    canonical: "/hvac",
  },
};

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

export default function HVACPage({ searchParams }) {
  return (
    <CategoryPage
      searchParams={searchParams}
      category="hvac"
      categoryLabel="HVAC"
      filters={filters}
      serviceNames={serviceNames}
      heroTitle="HVAC Companies in Billings, Montana"
      heroDescription="Find local HVAC professionals for heating, air conditioning, furnace repair, maintenance and more."
      eyebrow="FIND A LOCAL HVAC PROFESSIONAL"
      introTitle="HVAC professionals serving the Billings area"
      introDescription="Browse local HVAC companies and find the services you need. Use Billings Home Pros to compare local businesses serving the Billings area."
      emptyTitle="No matching HVAC listings yet."
      emptyDescription="Try another HVAC service or view all HVAC professionals serving the Billings area."
      icon="❄️"
      contractorEyebrow="BILLINGS HVAC COMPANIES"
      contractorTitle="Own an HVAC business?"
      contractorDescription="Billings Home Pros is building a local directory designed to help homeowners find businesses like yours."
    />
  );
}
