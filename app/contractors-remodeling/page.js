import CategoryPage from "../components/CategoryPage";

export const metadata = {
  title: "General Contractors & Remodeling in Billings, MT",
  description:
    "Find general contractors and remodeling companies in Billings, Montana for renovations, home additions, repairs, and general contracting. Compare local professionals and request a quote.",
  alternates: {
    canonical: "/contractors-remodeling",
  },
};

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Contractors", href: "/contractors-remodeling" },
  {
    label: "Remodeling",
    href: "/contractors-remodeling?service=remodeling",
    value: "remodeling",
  },
  {
    label: "Home Additions",
    href: "/contractors-remodeling?service=home-additions",
    value: "home-additions",
  },
  {
    label: "Repairs",
    href: "/contractors-remodeling?service=repairs",
    value: "repairs",
  },
  {
    label: "General Contracting",
    href: "/contractors-remodeling?service=general-contracting",
    value: "general-contracting",
  },
];

const serviceNames = {
  remodeling: "Remodeling",
  "home-additions": "Home Additions",
  repairs: "Repairs",
  "general-contracting": "General Contracting",
};

export default function ContractorsRemodelingPage({ searchParams }) {
  return (
    <CategoryPage
      searchParams={searchParams}
      category="contractors-remodeling"
      categoryLabel="Contractors & Remodeling"
      filters={filters}
      serviceNames={serviceNames}
      heroTitle="General Contractors & Remodeling in Billings, Montana"
      heroDescription="Find local professionals for remodeling, home additions, repairs, general contracting and more."
      eyebrow="FIND A LOCAL CONTRACTOR"
      introTitle="Contractors serving the Billings area"
      introDescription="Browse local contractors and remodeling companies and find the services you need. Use Billings Home Pros to compare local businesses serving the Billings area."
      emptyTitle="No matching contractor listings yet."
      emptyDescription="Try another service or view all contractors serving the Billings area."
      localGuide={{
        "title": "Choosing a Remodeling Contractor in Billings, MT",
        "paragraphs": [
                "For kitchen updates, home additions, or major repairs, begin with a clear description of your goals, budget, and desired schedule. Ask contractors about experience with similar projects in the Billings area.",
                "Request detailed written proposals showing the scope, materials, payment schedule, and how changes will be handled. Check references and confirm any necessary permits, insurance, and registrations.",
                "Comparing the same project scope across bids can help you spot missing work and choose a contractor based on fit and communication, not price alone."
        ]
}}

      icon="🛠️"
      contractorEyebrow="BILLINGS CONTRACTORS"
      contractorTitle="Own a contracting or remodeling business?"
      contractorDescription="Billings Home Pros is building a local directory designed to help homeowners find businesses like yours."
    />
  );
}
