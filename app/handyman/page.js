import CategoryPage from "../components/CategoryPage";

export const metadata = {
  title: "Handyman Services in Billings, MT",
  description:
    "Find handyman services in Billings, Montana for home repairs, installations, drywall repairs, and general home maintenance.",
  alternates: {
    canonical: "/handyman",
  },
};

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
      introDescription="Browse handyman services serving Billings, Laurel, and surrounding communities."
      emptyTitle="No matching handyman listings yet."
      emptyDescription="Try another service or view all handyman professionals serving the Billings area."
      icon="🔧"
      contractorEyebrow="BILLINGS HANDYMAN SERVICES"
      contractorTitle="Own a handyman business?"
      contractorDescription="Billings Home Pros helps homeowners discover local handyman services."
    />
  );
}
