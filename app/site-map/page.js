import InfoPageLayout from "../components/InfoPageLayout";

export const metadata = {
  title: "Site Map | Billings Home Pros",
  description: "Browse home service categories and useful pages on Billings Home Pros.",
  alternates: { canonical: "/site-map" },
};

const categories = [
  ["Plumbing", "/plumbing"],
  ["Heating & Cooling", "/hvac"],
  ["AC Repair", "/hvac/ac-repair"],
  ["Electrical", "/electrical"],
  ["Roofing", "/roofing"],
  ["Windows & Doors", "/windows-doors"],
  ["Contractors & Remodeling", "/contractors-remodeling"],
  ["Landscaping", "/landscaping"],
  ["Painting", "/painting"],
  ["Concrete", "/concrete"],
  ["Fencing", "/fencing"],
  ["Handyman", "/handyman"],
];

const otherPages = [
  ["Home", "/"],
  ["Get Listed", "/get-listed"],
  ["Our Partnership Promise", "/our-progress"],
  ["Privacy Policy", "/privacy"],
  ["Terms of Service", "/terms"],
];


export default function SiteMapPage() {
  return (
    <InfoPageLayout title="Site Map" eyebrow="Explore Billings Home Pros" intro="Find home service professionals in Billings, Laurel, and Yellowstone County.">
      <h2 style={{ color: "#101b27", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 25 }}>Find a Home Service Professional</h2>
      <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "12px 22px", paddingLeft: 22, marginBottom: 36 }}>
        {categories.map(([label, href]) => <li key={href}><a href={href} style={{ color: "#087fbd", fontWeight: 700, textDecoration: "underline" }}>{label}</a></li>)}
      </ul>
      <h2 style={{ color: "#101b27", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 25 }}>More Information</h2>
      <ul style={{ display: "grid", gap: 12, paddingLeft: 22 }}>
        {otherPages.map(([label, href]) => <li key={href}><a href={href} style={{ color: "#087fbd", fontWeight: 700, textDecoration: "underline" }}>{label}</a></li>)}
      </ul>
    </InfoPageLayout>
  );
}
