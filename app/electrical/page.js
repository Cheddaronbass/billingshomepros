import CategoryPage from "../components/CategoryPage";

export const metadata = {
  title: "Electricians in Billings, MT | Billings Home Pros",
  description:
    "Find electricians serving Billings, Laurel and surrounding Yellowstone County communities.",
};

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
      introDescription="Browse local electricians and find the services you need. Use Billings Home Pros to compare local businesses serving the Billings area."
      emptyTitle="No matching electrical listings yet."
      emptyDescription="Try another electrical service or view all electricians serving the Billings area."
      icon="⚡"
      contractorEyebrow="BILLINGS ELECTRICIANS"
      contractorTitle="Own an electrical business?"
      contractorDescription="Billings Home Pros is building a local directory designed to help homeowners find businesses like yours."
    />
  );
}
