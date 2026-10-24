import { withPageSocial } from "../lib/seoMetadata";
import CategoryPage from "../components/CategoryPage";

export const metadata = withPageSocial( {
  title: "Windows & Doors in Billings, MT | Installation & Replacement",
  description: "Find Billings-area window replacement, window repair, and exterior door installation services. Explore local listings and helpful questions to ask.",
  alternates: { canonical: "/windows-doors" },
});
export const dynamic = "force-dynamic";

const filters = [
  { label: "All Windows & Doors", href: "/windows-doors" },
  { label: "Window Replacement", href: "/windows-doors?service=window-replacement", value: "window-replacement" },
  { label: "Window Repair", href: "/windows-doors?service=window-repair", value: "window-repair" },
  { label: "Window Installation", href: "/windows-doors?service=window-installation", value: "window-installation" },
  { label: "Exterior Doors", href: "/windows-doors?service=exterior-doors", value: "exterior-doors" },
];
const serviceNames = {
  "window-replacement": "Window Replacement",
  "window-repair": "Window Repair",
  "window-installation": "Window Installation",
  "exterior-doors": "Exterior Doors",
};

export default function WindowsDoorsPage({ searchParams }) {
  return (
    <CategoryPage
      searchParams={searchParams}
      category="windows-doors"
      categoryLabel="Windows & Doors"
      filters={filters}
      serviceNames={serviceNames}
      heroTitle="Windows & Doors in Billings, Montana"
      heroDescription="Looking for replacement windows, window repairs, new installation, patio doors or entry doors? Browse local services for Billings, Laurel and Yellowstone County."
      eyebrow="FIND LOCAL WINDOW & DOOR PROS"
      introTitle="Window and door professionals serving Billings"
      introDescription="Compare local providers for replacement windows, window installation and exterior doors. Look for experience with Montana weather, insulation and proper sealing."
      emptyTitle="We're building our Windows & Doors listings."
      emptyDescription="There are no matching window and door businesses in this category yet. Check back or explore general remodeling companies, and confirm directly which services they offer."
      seoLink={{ href: "/contractors-remodeling", label: "Browse remodeling contractors (confirm window and door services directly)" }}
      localGuide={{
        title: "Choosing Window and Door Installers in Billings",
        paragraphs: [
          "In Montana, air sealing and installation quality matter as much as the window or door itself. Ask about insulation, weatherstripping, glazing, U-factor ratings, and how the installer handles flashing around openings.",
          "For replacements, request written estimates listing product specifications, measurements, labor, trim work, disposal, warranties and a projected timeline. Ask whether the proposal includes repairing hidden water damage.",
          "Confirm that a company performs the exact work you need, request references for comparable local jobs, and check applicable registration, insurance and permit requirements before signing."
        ]
      }}
      icon="🪟"
      contractorEyebrow="BILLINGS WINDOW & DOOR SPECIALISTS"
      contractorTitle="Install or repair windows and doors?"
      contractorDescription="Request a listing on Billings Home Pros so local homeowners can discover your window and door services."
    />
  );
}
