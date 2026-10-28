import { createClient } from "@supabase/supabase-js";
import { withPageSocial } from "../lib/seoMetadata";
import InfoPageLayout from "../components/InfoPageLayout";

export const metadata = withPageSocial( {
  title: "Site Map | Billings Home Pros",
  description: "Browse home service categories and useful pages on Billings Home Pros.",
  alternates: { canonical: "/site-map" },
});

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
  ["Flooring", "/flooring"],
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


async function getProfileLinks() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);
  const { data, error } = await supabase.from("businesses").select("id,name").not("id", "in", "(117,118)").order("name", { ascending: true });
  if (error) {
    console.error("Unable to load site-map business links:", error);
    return [];
  }
  return data || [];
}

export const dynamic = "force-dynamic";

export default async function SiteMapPage() {
  const profiles = await getProfileLinks();
  return (
    <InfoPageLayout title="Site Map" eyebrow="Explore Billings Home Pros" intro="Find home service professionals in Billings, Laurel, and Yellowstone County.">
      <h2 style={{ color: "#101b27", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 25 }}>Find a Home Service Professional</h2>
      <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "12px 22px", paddingLeft: 22, marginBottom: 36 }}>
        {categories.map(([label, href]) => <li key={href}><a href={href} style={{ color: "#087fbd", fontWeight: 700, textDecoration: "underline" }}>{label}</a></li>)}
      </ul>
      {profiles.length > 0 && (
        <section aria-labelledby="local-business-profiles">
          <h2 id="local-business-profiles" style={{ color: "#101b27", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 25 }}>Local Business Profiles</h2>
          <p>Browse individual home-service business profiles serving the Billings area.</p>
          <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px 22px", paddingLeft: 22, marginBottom: 36 }}>
            {profiles.map((business) => <li key={business.id}><a href={`/pros/${business.id}`} style={{ color: "#087fbd", textDecoration: "underline" }}>{business.name}</a></li>)}
          </ul>
        </section>
      )}
      <h2 style={{ color: "#101b27", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 25 }}>More Information</h2>
      <ul style={{ display: "grid", gap: 12, paddingLeft: 22 }}>
        {otherPages.map(([label, href]) => <li key={href}><a href={href} style={{ color: "#087fbd", fontWeight: 700, textDecoration: "underline" }}>{label}</a></li>)}
      </ul>
    </InfoPageLayout>
  );
}
