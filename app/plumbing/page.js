import CategoryPage from "../components/CategoryPage";

export const metadata = {
  title: "Plumbers in Billings, MT | Repairs, Drains & Water Heaters",
  description:
    "Find local plumbers in Billings, Montana for plumbing repairs, water heaters, drain and sewer service, and emergency plumbing. Compare local professionals and request a quote.",
  alternates: {
    canonical: "/plumbing",
  },
};

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Plumbing", href: "/plumbing" },
  {
    label: "Emergency Service",
    href: "/plumbing?service=emergency",
    value: "emergency",
  },
  {
    label: "Water Heaters",
    href: "/plumbing?service=water-heaters",
    value: "water-heaters",
  },
  {
    label: "Drain & Sewer",
    href: "/plumbing?service=drain-sewer",
    value: "drain-sewer",
  },
  {
    label: "Repairs",
    href: "/plumbing?service=repairs",
    value: "repairs",
  },
];

const serviceNames = {
  "water-heaters": "Water Heaters",
  "drain-sewer": "Drain & Sewer",
  repairs: "Repairs",
};

export default function PlumbingPage({ searchParams }) {
  return (
    <CategoryPage
      searchParams={searchParams}
      category="plumbing"
      categoryLabel="Plumbing"
      filters={filters}
      serviceNames={serviceNames}
      supportsEmergency={true}
      heroTitle="Plumbers in Billings, Montana"
      heroDescription="Find local plumbing professionals for repairs, water heaters, clogged drains, fixtures, emergency service and more."
      eyebrow="FIND A LOCAL PLUMBER"
      introTitle="Plumbing professionals serving the Billings area"
      introDescription="Browse local plumbing companies and find the services you need. Use Billings Home Pros to compare local businesses serving the Billings area."
      emptyTitle="No matching plumbing listings yet."
      emptyDescription="Try another plumbing service or view all plumbing professionals serving the Billings area."
      localGuide={{
        "title": "Choosing a Plumber in Billings, MT",
        "paragraphs": [
                "For leaks, clogged drains, or water-heater trouble, describe the symptoms and ask whether a plumber offers diagnosis, repair, or replacement. For active leaks, locate your water shutoff and avoid affected electrical areas.",
                "Before hiring, ask for a written estimate, expected timing, and any applicable license or insurance information. Compare the scope of work, parts, and warranty details—not just the price.",
                "For urgent plumbing problems, confirm emergency availability and any after-hours charges before scheduling."
        ]
}}

      icon="🔧"
      contractorEyebrow="BILLINGS PLUMBERS"
      contractorTitle="Own a plumbing business?"
      contractorDescription="Billings Home Pros is building a local directory designed to help homeowners find businesses like yours."
    />
  );
}
