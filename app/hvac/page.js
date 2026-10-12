import CategoryPage from "../components/CategoryPage";

export const metadata = {
  title: "HVAC Repair, Heating & AC Companies in Billings, MT",
  description:
  "Find local HVAC repair companies in Billings, MT for AC repair, furnace repair, heating, air conditioning, installation, and maintenance. Compare local pros and request a quote.",
  alternates: {
    canonical: "/hvac",
  },
};

export const dynamic = "force-dynamic";

const filters = [
  { label: "All HVAC", href: "/hvac" },
  {
    label: "Heating",
    href: "/hvac?service=heating",
    value: "heating",
  },
  {
    label: "Air Conditioning",
    href: "/hvac?service=air-conditioning",
    value: "air-conditioning",
  },
  {
    label: "Furnace Repair",
    href: "/hvac?service=furnace-repair",
    value: "furnace-repair",
  },
  {
    label: "Maintenance",
    href: "/hvac?service=maintenance",
    value: "maintenance",
  },
];

const serviceNames = {
  heating: "Heating",
  "air-conditioning": "Air Conditioning",
  "furnace-repair": "Furnace Repair",
  maintenance: "Maintenance",
};

export default function HVACPage({ searchParams }) {
  return (
    <CategoryPage
      searchParams={searchParams}
      category="hvac"
      categoryLabel="HVAC"
      filters={filters}
      serviceNames={serviceNames}
      heroTitle="HVAC Companies in Billings, Montana"
      heroDescription="Find local HVAC professionals for heating, air conditioning, furnace repair, maintenance and more."
      eyebrow="FIND A LOCAL HVAC PROFESSIONAL"
      introTitle="HVAC professionals serving the Billings area"
introDescription="Compare local HVAC companies serving Billings for AC repair, furnace repair, heating and cooling, installation, and routine maintenance. Find the right local professional for your home and request a quote."
seoLink={{
  href: "/hvac/ac-repair",
  label: "Looking for AC repair in Billings? View local AC repair professionals",
}}
emptyTitle="No matching HVAC listings yet."
      emptyDescription="Try another HVAC service or view all HVAC professionals serving the Billings area."
      localGuide={{
        "title": "Choosing an HVAC Company in Billings, MT",
        "paragraphs": [
                "Billings homeowners depend on heating through cold winters and cooling during hot summer weather. If your furnace or air conditioner struggles, ask an HVAC professional whether maintenance or a repair is appropriate before considering replacement.",
                "When comparing heating and cooling companies, request a written estimate, ask about equipment sizing and efficiency, and confirm applicable credentials and warranty terms.",
                "For a furnace that stops heating, describe the symptoms and ask about service availability. If you suspect a gas leak or carbon monoxide, leave the area and contact emergency services or your gas utility rather than troubleshooting it yourself."
        ]
}}

      icon="❄️"
      contractorEyebrow="BILLINGS HVAC COMPANIES"
      contractorTitle="Own an HVAC business?"
      contractorDescription="Billings Home Pros is building a local directory designed to help homeowners find businesses like yours."
    />
  );
}
