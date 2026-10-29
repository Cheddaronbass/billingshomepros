import { createClient } from "@supabase/supabase-js";
import { notFound, permanentRedirect } from "next/navigation";
import TrackedLink from "../../components/TrackedLink";
import ContractorLogo from "../../components/ContractorLogo";
import ContactStatus from "../../components/ContactStatus";

export const dynamic = "force-dynamic";

function db() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);
}

async function getBusiness(id) {
  if (!/^[0-9]+$/.test(String(id))) return null;
  const { data, error } = await db().from("businesses").select("*").eq("id", Number(id)).maybeSingle();
  return error ? null : data;
}

// Existing cross-category duplicates (kept in the database for audit history).
// Redirect only while the two records demonstrably remain the same business,
// and do not redirect claimed or featured profiles.
const canonicalAliases = { 117: 55, 118: 63 };
const digits = (s) => String(s || "").replace(/\D/g, "").slice(-10);
const domain = (s) => { try { return new URL(s).hostname.toLowerCase().replace(/^www\./, ""); } catch { return ""; } };
async function confirmedCanonicalId(business) {
  const canonicalId = canonicalAliases[business?.id];
  if (!canonicalId || business.claimed || business.featured) return null;
  const canonical = await getBusiness(canonicalId);
  if (!canonical || canonical.claimed || canonical.featured) return null;
  if (!digits(business.phone) || digits(business.phone) !== digits(canonical.phone)) return null;
  if (!domain(business.website) || domain(business.website) !== domain(canonical.website)) return null;
  return canonicalId;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const business = await getBusiness(id);
  if (!business) return { title: "Listing not found", robots: { index: false } };
  const aliasId = await confirmedCanonicalId(business);
  if (aliasId) return {
    title: business.name + " | Billings Home Pros",
    robots: { index: false, follow: true },
    alternates: { canonical: `/pros/${aliasId}` },
  };
  const title = `${business.name} | ${business.category.replaceAll("-", " ")} in Billings, MT`;
  const description = business.description || `Learn about ${business.name}, a home-service business serving the Billings area.`;
  return {
    title,
    description,
    alternates: { canonical: `/pros/${business.id}` },
    openGraph: { title, description, url: `https://billingshomepros.com/pros/${business.id}` },
    twitter: { card: "summary", title, description },
  };
}

export default async function BusinessProfile({ params }) {
  const { id } = await params;
  const business = await getBusiness(id);
  if (!business) notFound();
  const aliasId = await confirmedCanonicalId(business);
  if (aliasId) permanentRedirect(`/pros/${aliasId}`);

  const categoryLabel = business.category.replaceAll("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const profileUrl = `https://billingshomepros.com/pros/${business.id}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${profileUrl}#business`,
    name: business.name,
    description: business.description || undefined,
    telephone: business.phone || undefined,
    url: business.website?.startsWith("https://") || business.website?.startsWith("http://") ? business.website : undefined,
    areaServed: business.service_area || "Billings, Montana",
    knowsAbout: Array.isArray(business.services) ? business.services : undefined,
    mainEntityOfPage: profileUrl,
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className="siteHeader">
        <a className="textBrand" href="/"><span className="brandMain">Billings Home Pros</span><span className="brandSub">LOCAL HOME SERVICES • BILLINGS, MT</span></a>
        <nav><a href="/">Home</a><a href="/#services">Services</a><a href="/#pros">For Contractors</a><a href="/get-listed" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "11px 17px", borderRadius: 10, background: "#24baff", color: "#071521", fontWeight: 800, textDecoration: "none" }}>List Your Business</a></nav>
      </header>
      <section className="categoryHero">
        <div className="categoryHeroInner">
          <div className="eyebrow">LOCAL CONTRACTOR PROFILE</div>
          <h1>{business.name}</h1>
          <p>{categoryLabel} • {business.service_area || "Billings, Montana"}</p>
        </div>
      </section>
      <section className="categoryContent" style={{ minHeight: "45vh" }}>
        <p><a href={`/${business.category}`} style={{ color: "#25b9ff" }}>← Browse {categoryLabel} businesses</a></p>
        <aside style={{ maxWidth: 920, marginTop: 22, padding: "22px 24px", borderRadius: 16, border: "1px solid rgba(37,185,255,.45)", background: "linear-gradient(110deg, #102638, #0b1722)", color: "#fff", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
          <div><strong style={{ display: "block", fontSize: "1.16rem" }}>Own a home-service business in Billings?</strong><span style={{ display: "block", marginTop: 5, color: "#d3e5ee" }}>Add your business to Billings Home Pros. Basic listings are free.</span></div>
          <a href="/get-listed" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "13px 20px", borderRadius: 10, background: "#25b9ff", color: "#06131d", fontWeight: 800, textDecoration: "none", minHeight: 46 }}>List Your Business →</a>
        </aside>
        <article className="contractorCard" style={{ maxWidth: 920, marginTop: 24 }}>
          <div className="contractorMain">
            <div className="contractorIdentity">
              <ContractorLogo name={business.name} logoUrl={business.logo_url} logoVerified={business.logo_verified} website={business.website} />
              <div className="contractorIdentityText">
                <div className="businessNameRow">
                  <h2>{business.name}</h2>
                  {business.featured && <span className="featuredBadge">Featured</span>}
                  {business.claimed && <span className="claimedBadge">✓ Claimed</span>}
                  <ContactStatus business={business} />
                </div>
                <p className="contractorLocation">{business.service_area || "Billings, Montana"}</p>
              </div>
            </div>
            {business.description && <p className="contractorDescription" style={{ marginTop: 24 }}>{business.description}</p>}
            <div className="serviceTags" style={{ marginTop: 20 }}>
              <span>{categoryLabel}</span>
              {business.services?.map((service) => <span key={service}>{service}</span>)}
              {business.emergency_service && <span>Emergency Service</span>}
            </div>
            <div className="contractorActions" style={{ marginTop: 24 }}>
              {business.phone && <TrackedLink className="actionButton callButton" href={`tel:${business.phone}`} eventName="contractor_call_click" businessId={business.id} businessName={business.name} category={business.category}>Call {business.phone}</TrackedLink>}
              {business.website && <TrackedLink className="actionButton websiteButton" href={business.website} eventName="contractor_website_click" businessId={business.id} businessName={business.name} category={business.category} target="_blank" rel="noopener noreferrer">Visit Website</TrackedLink>}
              <TrackedLink className="actionButton quoteButton" href={`/quote?businessId=${business.id}&businessName=${encodeURIComponent(business.name)}`} eventName="contractor_quote_click" businessId={business.id} businessName={business.name} category={business.category}>Request a Quote</TrackedLink>
            </div>
          </div>
        </article>
        <p style={{ marginTop: 24, maxWidth: 800 }}>Business information is provided for directory reference. Confirm services, availability, and qualifications directly with the contractor.</p>
      </section>
      <footer><strong>Billings Home Pros</strong><p>Connecting Billings-area homeowners with local home-service professionals.</p><small>© 2026 BillingsHomePros.com</small></footer>
    </main>
  );
}
