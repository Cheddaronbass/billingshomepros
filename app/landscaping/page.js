import CategoryPage from "../components/CategoryPage";

export const metadata = {
  title: "Landscaping Companies in Billings, MT",
  description:
    "Find landscaping professionals in Billings, Montana for lawn care, irrigation, landscape design, tree services, and outdoor projects.",
  alternates: {
    canonical: "/landscaping",
  },
};

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
      icon="🌿"
      contractorEyebrow="BILLINGS LANDSCAPERS"
      contractorTitle="Own a landscaping business?"
      contractorDescription="Billings Home Pros helps homeowners discover local landscaping businesses."
    />
  );
}
