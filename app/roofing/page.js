import CategoryPage from "../components/CategoryPage";

export const metadata = {
  title: "Roofers in Billings, MT | Billings Home Pros",
  description:
    "Find roofing companies serving Billings, Laurel and surrounding Yellowstone County communities.",
};

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Roofing", href: "/roofing" },
  {
    label: "Roof Repair",
    href: "/roofing?service=roof-repair",
    value: "roof-repair",
  },
  {
    label: "Roof Replacement",
    href: "/roofing?service=roof-replacement",
    value: "roof-replacement",
  },
  {
    label: "Inspections",
    href: "/roofing?service=inspections",
    value: "inspections",
  },
  {
    label: "Storm Damage",
    href: "/roofing?service=storm-damage",
    value: "storm-damage",
  },
];

const serviceNames = {
  "roof-repair": "Roof Repair",
  "roof-replacement": "Roof Replacement",
  inspections: "Inspections",
  "storm-damage": "Storm Damage",
};

export default function RoofingPage({ searchParams }) {
  return (
    <CategoryPage
      searchParams={searchParams}
      category="roofing"
      categoryLabel="Roofing"
      filters={filters}
      serviceNames={serviceNames}
      heroTitle="Roofers in Billings, Montana"
      heroDescription="Find local roofing professionals for roof repairs, replacements, inspections, storm damage and more."
      eyebrow="FIND A LOCAL ROOFER"
      introTitle="Roofing professionals serving the Billings area"
      introDescription="Browse local roofing companies and find the services you need. Use Billings Home Pros to compare local businesses serving the Billings area."
      emptyTitle="No matching roofing listings yet."
      emptyDescription="Try another roofing service or view all roofing professionals serving the Billings area."
      icon="🏠"
      contractorEyebrow="BILLINGS ROOFERS"
      contractorTitle="Own a roofing business?"
      contractorDescription="Billings Home Pros is building a local directory designed to help homeowners find businesses like yours."
    />
  );
}
