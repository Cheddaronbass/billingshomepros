import CategoryPage from "../components/CategoryPage";

export const metadata = {
  title: "Concrete Contractors in Billings, MT",
  description:
    "Find concrete contractors in Billings, Montana for driveways, patios, foundations, sidewalks, and decorative concrete.",
  alternates: {
    canonical: "/concrete",
  },
};

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Concrete", href: "/concrete" },
  {
    label: "Driveways",
    href: "/concrete?service=driveways",
    value: "driveways",
  },
  {
    label: "Patios & Walkways",
    href: "/concrete?service=patios-walkways",
    value: "patios-walkways",
  },
  {
    label: "Foundations",
    href: "/concrete?service=foundations",
    value: "foundations",
  },
  {
    label: "Decorative Concrete",
    href: "/concrete?service=decorative-concrete",
    value: "decorative-concrete",
  },
];

const serviceNames = {
  driveways: "Driveways",
  "patios-walkways": "Patios & Walkways",
  foundations: "Foundations",
  "decorative-concrete": "Decorative Concrete",
};

export default function ConcretePage({ searchParams }) {
  return (
    <CategoryPage
      searchParams={searchParams}
      category="concrete"
      categoryLabel="Concrete"
      filters={filters}
      serviceNames={serviceNames}
      supportsEmergency={false}
      heroTitle="Concrete Contractors in Billings, Montana"
      heroDescription="Find local concrete professionals for driveways, patios, sidewalks, foundations, and decorative concrete projects."
      eyebrow="FIND A LOCAL CONCRETE CONTRACTOR"
      introTitle="Concrete professionals serving the Billings area"
      introDescription="Browse concrete contractors serving Billings, Laurel, and surrounding communities."
      emptyTitle="No matching concrete listings yet."
      emptyDescription="Try another concrete service or view all concrete contractors serving the Billings area."
      icon="🧱"
      contractorEyebrow="BILLINGS CONCRETE CONTRACTORS"
      contractorTitle="Own a concrete business?"
      contractorDescription="Billings Home Pros helps homeowners discover local concrete contractors."
    />
  );
}
