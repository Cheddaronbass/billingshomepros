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
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px", color: "#243247", lineHeight: 1.7 }}>
      <a href="/">← Billings Home Pros</a>
      <h1>Site Map</h1>
      <p>Explore local home services in Billings, Laurel, and Yellowstone County.</p>
      <h2>Find a Home Service Professional</h2>
      <ul>{categories.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
      <h2>More Information</h2>
      <ul>{otherPages.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
    </main>
  );
}
