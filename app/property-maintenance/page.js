import CategoryPage from "../components/CategoryPage";
import { withPageSocial } from "../lib/seoMetadata";

const path = "/property-maintenance";
const serviceNames = {
  "junk-removal": "Junk Removal & Hauling",
  "window-cleaning": "Window Cleaning",
  "gutter-cleaning": "Gutter Cleaning",
  "pressure-washing": "Pressure Washing",
};
const filters = [
  { label: "All Property Maintenance", href: path },
  ...Object.entries(serviceNames).map(([value, label]) => ({
    value, label, href: path + "?service=" + value,
  })),
];

export const metadata = withPageSocial({
  title: "Property Maintenance in Billings, MT",
  description: "Browse Billings property maintenance services including junk removal, window cleaning, gutter cleaning, and pressure washing.",
  alternates: { canonical: path },
});
export const dynamic = "force-dynamic";

export default function PropertyMaintenancePage({ searchParams }) {
  return (
    <CategoryPage
      searchParams={searchParams}
      category="property-maintenance"
      categoryLabel="Property Maintenance"
      filters={filters}
      serviceNames={serviceNames}
      heroTitle="Property Maintenance in Billings, Montana"
      heroDescription="Find help hauling away unwanted items and keeping your property clean."
      eyebrow="BILLINGS HOME SERVICES"
      introTitle="Find a property maintenance pro"
      introDescription="Choose the service you need to see matching local businesses."
      emptyTitle="No listings for this service yet."
      emptyDescription="Choose All Property Maintenance to browse other local services."
      icon="🏠"
      contractorEyebrow="BILLINGS PROPERTY MAINTENANCE"
      contractorTitle="Offer property maintenance in Billings?"
      contractorDescription="Add your services so homeowners can find your business."
    />
  );
}
