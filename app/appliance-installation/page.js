import { withPageSocial } from "../lib/seoMetadata";
import CategoryPage from "../components/CategoryPage";

export const metadata = withPageSocial({
  title: "Appliance Installation in Billings, MT | Local Installers",
  description: "Looking for appliance installation in Billings, Montana? Find local installers for dishwashers, washers, dryers, refrigerators, ranges, and built-in appliances.",
  alternates: { canonical: "/appliance-installation" },
});

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Appliance Installation", href: "/appliance-installation" },
  { label: "Dishwashers", href: "/appliance-installation?service=dishwashers", value: "dishwashers" },
  { label: "Washers & Dryers", href: "/appliance-installation?service=washers-dryers", value: "washers-dryers" },
  { label: "Refrigerators", href: "/appliance-installation?service=refrigerators", value: "refrigerators" },
  { label: "Ranges & Ovens", href: "/appliance-installation?service=ranges-ovens", value: "ranges-ovens" },
  { label: "Built-in Appliances", href: "/appliance-installation?service=built-in-appliances", value: "built-in-appliances" },
];

const serviceNames = {
  dishwashers: "Dishwashers",
  "washers-dryers": "Washers & Dryers",
  refrigerators: "Refrigerators",
  "ranges-ovens": "Ranges & Ovens",
  "built-in-appliances": "Built-in Appliances",
};

export default function ApplianceInstallationPage({ searchParams }) {
  return <CategoryPage
    searchParams={searchParams}
    category="appliance-installation"
    categoryLabel="Appliance Installation"
    filters={filters}
    serviceNames={serviceNames}
    supportsEmergency={false}
    heroTitle="Appliance Installation in Billings, Montana"
    heroDescription="Find local professionals for installing dishwashers, laundry appliances, refrigerators, ranges, and built-in appliances."
    eyebrow="FIND A LOCAL APPLIANCE INSTALLER"
    introTitle="Appliance installers serving Billings and Yellowstone County"
    introDescription="Looking to install a new appliance? Compare local installation specialists as listings become available. Confirm that your installer handles the specific appliance, connections, removal, and any required electrical, plumbing, or gas work before booking."
    emptyTitle="No confirmed appliance installation listings yet."
    emptyDescription="We're building this category. Local appliance installers can request a free listing; homeowners can also browse our plumbing, electrical, and handyman categories for related services."
    localGuide={{
      title: "Before hiring an appliance installer in Billings",
      paragraphs: [
        "Share the appliance make and model, installation location, and photos of existing connections when requesting a quote. Ask whether delivery, removal, disposal, and any required installation kit are included.",
        "Dishwashers and refrigerators may need plumbing connections; ranges, dryers, and built-in appliances may need dedicated electrical circuits, venting, or gas connections. Confirm the provider is qualified for the specific work.",
        "Ask about fit and clearance, permit requirements where applicable, installation warranty, and who is responsible if additional work is discovered."
      ],
      faqs: [
        ["Can someone install a dishwasher I already purchased?", "Some installers work with customer-supplied appliances. Ask whether they accept your model and whether plumbing, electrical connections, and removal are included."],
        ["Do I need a specialist for a gas range?", "Gas connections require appropriately qualified professionals. Confirm the installer's qualifications and any applicable permit requirements before scheduling."],
        ["Is appliance repair included?", "No. This category focuses on installing or replacing appliances, not diagnosing or repairing broken appliances."]
      ]
    }}
    icon="🔌"
    contractorEyebrow="BILLINGS APPLIANCE INSTALLERS"
    contractorTitle="Install appliances in the Billings area?"
    contractorDescription="List your appliance installation business on Billings Home Pros and help local homeowners find your services."
  />;
}
