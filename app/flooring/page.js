import CategoryPage from "../components/CategoryPage";

export const metadata = {
  title: "Flooring Installers in Billings, MT | Carpet, Hardwood, LVP & Tile",
  description: "Find local Billings flooring installers for carpet, hardwood, tile, luxury vinyl plank, refinishing and flooring replacement. Compare installation-capable businesses.",
  alternates: { canonical: "/flooring" },
};

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Flooring", href: "/flooring" },
  { label: "Carpet", href: "/flooring?service=carpet", value: "carpet" },
  { label: "Hardwood", href: "/flooring?service=hardwood", value: "hardwood" },
  { label: "Tile", href: "/flooring?service=tile", value: "tile" },
  { label: "Vinyl / LVP", href: "/flooring?service=vinyl", value: "vinyl" },
  { label: "Refinishing", href: "/flooring?service=refinishing", value: "refinishing" },
];

const serviceNames = {
  carpet: "Carpet Installation",
  hardwood: "Hardwood Installation",
  tile: "Tile Installation",
  vinyl: "Luxury Vinyl Installation",
  refinishing: "Floor Refinishing",
};

export default function FlooringPage({ searchParams }) {
  return (
    <CategoryPage
      searchParams={searchParams}
      category="flooring"
      categoryLabel="Flooring"
      filters={filters}
      serviceNames={serviceNames}
      heroTitle="Flooring Installers in Billings, Montana"
      heroDescription="Compare local teams who install carpet, hardwood, tile, and luxury vinyl floors. Find flooring professionals serving Billings, Laurel and Yellowstone County."
      eyebrow="FIND A LOCAL FLOORING PRO"
      introTitle="Flooring installation professionals serving Billings"
      introDescription="Installation-capable specialists and flooring showrooms that coordinate professional installation—not materials-only suppliers. Confirm the exact flooring service and availability with each business."
      emptyTitle="No flooring installers match that filter yet."
      emptyDescription="Try All Flooring or another material to browse local installation-capable businesses."
      localGuide={{
        title: "Choosing a Flooring Installer in Billings, MT",
        paragraphs: [
          "Ask whether the company installs the specific material you have in mind, such as carpet, hardwood, tile, or luxury vinyl plank. Some showrooms coordinate independent installers rather than using in-house crews.",
          "Get a written estimate that covers removal and disposal of old flooring, subfloor preparation, transitions, trim, moisture testing where needed, and cleanup. Confirm who provides the materials and who handles warranty issues.",
          "In Montana, discuss seasonal humidity changes for wood flooring, moisture conditions in basements, and durability for snow, mud, pets, and high-traffic entries. Compare the full installation scope, not just the price per square foot."
        ],
      }}
      icon="🪵"
      contractorEyebrow="BILLINGS FLOORING INSTALLERS"
      contractorTitle="Install flooring in the Billings area?"
      contractorDescription="Add your installation-capable flooring business to Billings Home Pros to help local homeowners find you."
    />
  );
}
