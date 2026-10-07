import CategoryPage from "../../components/CategoryPage";

export const metadata = {
  title: "AC Repair in Billings, MT | Local HVAC Companies",
  description:
    "Find local AC repair companies in Billings, MT for air conditioning repair, service, maintenance, and installation. Compare local HVAC professionals and request a quote.",
  alternates: {
    canonical: "/hvac/ac-repair",
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

export default function ACRepairPage() {
  return (
    <CategoryPage
      category="hvac"
      categoryLabel="HVAC"
      filters={filters}
      serviceNames={serviceNames}
      heroTitle="AC Repair in Billings, Montana"
      heroDescription="Find local Billings HVAC professionals for air conditioning repair, service, maintenance, and installation."
      eyebrow="AIR CONDITIONING REPAIR IN BILLINGS"
      introTitle="Find AC repair professionals serving Billings"
      introDescription="Compare local HVAC companies that provide air conditioning repair and cooling services in the Billings area. Browse local professionals, learn about their services, and request a quote for your home."
      emptyTitle="No matching AC repair listings yet."
      emptyDescription="Browse all HVAC professionals serving the Billings area."
      icon="❄️"
      contractorEyebrow="BILLINGS HVAC COMPANIES"
      contractorTitle="Own an HVAC business?"
      contractorDescription="Billings Home Pros helps local homeowners find HVAC professionals for AC repair, heating, maintenance, and other home comfort services."
    />
  );
}
