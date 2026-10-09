import CategoryPage from "../components/CategoryPage";

export const metadata = {
  title: "Painting Contractors in Billings, MT",
  description:
    "Find professional painters in Billings, Montana for interior painting, exterior painting, cabinet painting, and commercial painting.",
  alternates: {
    canonical: "/painting",
  },
};

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Painting", href: "/painting" },
  {
    label: "Interior Painting",
    href: "/painting?service=interior-painting",
    value: "interior-painting",
  },
  {
    label: "Exterior Painting",
    href: "/painting?service=exterior-painting",
    value: "exterior-painting",
  },
  {
    label: "Cabinet Painting",
    href: "/painting?service=cabinet-painting",
    value: "cabinet-painting",
  },
  {
    label: "Commercial Painting",
    href: "/painting?service=commercial-painting",
    value: "commercial-painting",
  },
];

const serviceNames = {
  "interior-painting": "Interior Painting",
  "exterior-painting": "Exterior Painting",
  "cabinet-painting": "Cabinet Painting",
  "commercial-painting": "Commercial Painting",
};

export default function PaintingPage({ searchParams }) {
  return (
    <CategoryPage
      searchParams={searchParams}
      category="painting"
      categoryLabel="Painting"
      filters={filters}
      serviceNames={serviceNames}
      supportsEmergency={false}
      heroTitle="Painting Contractors in Billings, Montana"
      heroDescription="Find local painting professionals for interior painting, exterior painting, cabinet refinishing, and commercial projects."
      eyebrow="FIND A LOCAL PAINTER"
      introTitle="Painting professionals serving the Billings area"
      introDescription="Browse painting contractors serving Billings, Laurel, and surrounding communities."
      emptyTitle="No matching painting listings yet."
      emptyDescription="Try another painting service or view all painting contractors serving the Billings area."
      icon="🎨"
      contractorEyebrow="BILLINGS PAINTERS"
      contractorTitle="Own a painting business?"
      contractorDescription="Billings Home Pros helps homeowners discover local painting contractors."
    />
  );
}
