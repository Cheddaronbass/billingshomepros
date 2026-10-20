import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import TrackedLink from "../../components/TrackedLink";
import ContractorLogo from "../../components/ContractorLogo";

export const dynamic = "force-dynamic";

function db() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);
}

async function getBusiness(id) {
  if (!/^[0-9]+$/.test(String(id))) return null;
  const { data, error } = await db().from("businesses").select("*").eq("id", Number(id)).maybeSingle();
  return error ? null : data;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const business = await getBusiness(id);
  if (!business) return { title: "Listing not found", robots: { index: false } };
  const title = `${business.name} | ${business.category.replaceAll("-", " ")} in Billings, MT`;
  const description = business.description || `Learn about ${business.name}, a home-service business serving the Billings area.`;
  return {
    title,
    description,
    alternates: { canonical: `/pros/${business.id}` },
    openGraph: { title, description, url: `https://www.billingshomepros.com/pros/${business.id}` },
  };
}

export default async function BusinessProfile({ params }) {
  const { id } = await params;
  const business = await getBusiness(id);
  if (!business) notFound();

  const categoryLabel = business.category.replaceAll("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const profileUrl = `https://www.billingshomepros.com/pros/${business.id}`;
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
        <nav><a href="/">Home</a><a href="/#services">Services</a><a href="/#pros">For Contractors</a></nav>
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
        <article className="contractorCard" style={{ maxWidth: 920, marginTop: 24 }}>
          <div className="contractorMain">
            <div className="contractorIdentity">
              <ContractorLogo name={business.name} logoUrl={business.logo_url} logoVerified={business.logo_verified} />
              <div className="contractorIdentityText">
                <div className="businessNameRow">
                  <h2>{business.name}</h2>
                  {business.featured && <span className="featuredBadge">Featured</span>}
                  {business.claimed && <span className="claimedBadge">✓ Claimed</span>}
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
