
import { createClient } from "@supabase/supabase-js";
import TrackedLink from "./TrackedLink";
import ContractorLogo from "./ContractorLogo";
import { getGooglePlaceRating } from "../lib/googlePlaces";


export default async function CategoryPage({
  searchParams,
  category,
  categoryLabel,
  filters,
  serviceNames,
  heroTitle,
  heroDescription,
  eyebrow,
  introTitle,
  introDescription,
  emptyTitle,
  emptyDescription,
  icon,
  contractorEyebrow,
  contractorTitle,
  contractorDescription,
  seoLink,
  localGuide,
  supportsEmergency = false,
  fixedService = "",
}) {
  const params = await searchParams;
  const selectedService = fixedService || params?.service || "";

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY
  );

  let query = supabase
    .from("businesses")
    .select("*");

  // A contractor can offer windows and doors without losing its primary
  // trade category or being duplicated as a second business profile.
  if (category === "windows-doors") {
    query = query.or('category.eq.windows-doors,services.cs.{"Windows & Doors"}');
  } else if (category === "flooring") {
    // Cross-list existing installation-capable firms without duplicate profiles.
    query = query.or('category.eq.flooring,services.cs.{"Flooring Installation"}');
  } else if (category === "handyman") {
    // Show the canonical remodeling profile for two confirmed cross-category
    // duplicates. Retain the original public URLs as redirects.
    query = query.or('category.eq.handyman,services.cs.{"Handyman"}');
  } else {
    query = query.eq("category", category);
  }

  if (supportsEmergency && selectedService === "emergency") {
    query = query.eq("emergency_service", true);
  }

  if (serviceNames[selectedService]) {
    query = query.contains("services", [
      serviceNames[selectedService],
    ]);
  }

  const { data, error } = await query
    .order("featured", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);
  }

  // The Windows & Doors directory should lead with dedicated installers, not
  // roofers or general trades that merely offer window work. Featured listings
  // still retain their promised top placement within the category.
  const businesses = (error ? [] : data || []).filter((business) =>
    // Two confirmed unclaimed/unfeatured duplicate profiles have canonical
    // counterparts; they stay in the DB but are omitted from category cards.
    category !== "handyman" || ![117, 118].includes(business.id)
  ).slice();
  if (category === "windows-doors") {
    // Some installer records use this category even when their main business
    // is general contracting. Prioritize clearly named window/door specialists,
    // then glass firms, then other installers, then cross-listed trades.
    const windowFocus = (business) => {
      if (business.category !== "windows-doors") return 3;
      if (/\b(window|windows|door|doors|pella|andersen)\b|win-dor/i.test(business.name)) return 0;
      if (/\bglass\b/i.test(business.name)) return 1;
      return 2;
    };
    businesses.sort((a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      windowFocus(a) - windowFocus(b) ||
      a.name.localeCompare(b.name)
    );
  }

  // The card is a preview. Show unique, relevant services and link to the
  // complete profile instead of repeating the category or filling two rows.
  const cardServices = businesses.map((business) => {
    const seen = new Set([categoryLabel.toLowerCase().trim()]);
    const services = (Array.isArray(business.services) ? business.services : [])
      .filter((service) => {
        if (typeof service !== "string" || !service.trim()) return false;
        const normalized = service.toLowerCase().trim();
        if (seen.has(normalized)) return false;
        seen.add(normalized);
        return true;
      });
    if (category === "windows-doors") {
      const isRelevant = (service) => /window|door|glass/i.test(service);
      services.sort((a, b) => Number(isRelevant(b)) - Number(isRelevant(a)));
    }
    return { shown: services.slice(0, 4), extra: Math.max(0, services.length - 4) };
  });

  const googleRatings = await Promise.all(
    businesses.map((business) =>
      business.google_match_status === "matched" && business.google_place_id
        ? getGooglePlaceRating(business.google_place_id)
        : Promise.resolve(null)
    )
  );

  // Describe this category and its visible listings without claiming that
  // Billings Home Pros owns, endorses, or verifies the listed businesses.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: heroTitle,
    description: heroDescription,
    about: { "@type": "Service", name: categoryLabel, areaServed: { "@type": "Place", name: "Billings, Montana" } },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: businesses.length,
      itemListElement: businesses.map((business, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "LocalBusiness",
          name: business.name,
          ...(business.description ? { description: business.description } : {}),
          ...(business.phone ? { telephone: business.phone } : {}),
          ...(business.website && business.website.startsWith("https://") || business.website && business.website.startsWith("http://")
            ? { url: business.website }
            : {}),
          areaServed: business.service_area || "Billings, Montana",
          ...(Array.isArray(business.services) && business.services.length
            ? { knowsAbout: business.services }
            : {}),
        },
      })),
    },
  };

  return (
    <main className={category === "windows-doors" ? "categoryDirectoryPage windowsDoorsPage" : "categoryDirectoryPage"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className="siteHeader">
        <a className="textBrand" href="/">
          <span className="brandMain">
            Billings Home Pros
          </span>
          <span className="brandSub">
            LOCAL HOME SERVICES • BILLINGS, MT
          </span>
        </a>

        <nav>
          <a href="/">Home</a>
          <a href="/#services">Services</a>
          <a href="/#pros">For Contractors</a>
        </nav>
      </header>

      <section className="categoryHero">
        <div className="categoryHeroInner">
          <div className="eyebrow">
            BILLINGS • LAUREL • YELLOWSTONE COUNTY
          </div>

          <h1>{heroTitle}</h1>
          <p>{heroDescription}</p>
        </div>
      </section>

      <section className="categoryContent">
        <div className="categoryIntro">
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h2>{introTitle}</h2>
          </div>

          <p>{introDescription}</p>
        </div>

        <div className="filterBar">
          {filters.map((filter) => {
            const isActive =
              (!selectedService && !filter.value) ||
              selectedService === filter.value;

            return (
              <a
                href={filter.href}
                className={
                  isActive ? "activeFilter" : ""
                }
                key={filter.label}
              >
                {filter.label}
              </a>
            );
          })}
        </div>

        <div className="contractorList">
          {businesses.length === 0 ? (
            <div className="comingSoon">
              <div className="comingSoonIcon">
                {icon}
              </div>

              <div>
                <h2>{emptyTitle}</h2>
                <p>{emptyDescription}</p>
              </div>
            </div>
          ) : (
            businesses.map((business, index) => (
              <article
                className="contractorCard"
                key={business.id}
              >
                <div className="contractorMain">
                  <div className="contractorTop">
                    <div className="contractorIdentity">
                      <a href={`/pros/${business.id}`} aria-label={`View ${business.name} contractor profile`} style={{ display: "flex", alignItems: "center", gap: 14, color: "inherit", textDecoration: "none" }}>
                        <ContractorLogo name={business.name} logoUrl={business.logo_url} logoVerified={business.logo_verified} website={business.website} />
                        <div className="contractorIdentityText">
                          <div className="businessNameRow"><h2>{business.name}</h2></div>
                          <p className="contractorLocation">{business.service_area || "Billings, Montana"}</p>
                        </div>
                      </a>
                      {business.featured && <span className="featuredBadge">Featured</span>}
                      {business.claimed && <span className="claimedBadge">✓ Claimed</span>}
                    </div>
                  </div>

                  <div className="serviceTags">
                    <span>{categoryLabel}</span>

                    {cardServices[index].shown.map((service) => (
                      <span key={service}>{service}</span>
                    ))}
                    {business.emergency_service && (
                      <span>Emergency Service</span>
                    )}
                    {cardServices[index].extra > 0 && (
                      <a
                        className="serviceMoreLink"
                        href={`/pros/${business.id}`}
                        aria-label={`View ${cardServices[index].extra} more services for ${business.name}`}
                      >
                        +{cardServices[index].extra} more
                      </a>
                    )}
                  </div>

                  {business.description && (
                    <p className="contractorDescription">
                      {business.description}
                    </p>
                  )}

                  {googleRatings[index] && (
                    <div className="homeProsRating">
                      <strong>Google Reviews</strong>
                      <span>★ {googleRatings[index].rating.toFixed(1)} ({googleRatings[index].count} reviews)</span>
                      {googleRatings[index].mapsUrl && (
                        <a href={googleRatings[index].mapsUrl} target="_blank" rel="noopener noreferrer">
                          View on Google Maps
                        </a>
                      )}
                    </div>
                  )}
                  <div className="contractorActions">
                    {business.phone && (
                      <TrackedLink
                        className="actionButton callButton"
                        href={`tel:${business.phone}`}
                        eventName="contractor_call_click"
                        businessId={business.id}
                        businessName={business.name}
                        category={category}
                      >
                        Call {business.phone}
                      </TrackedLink>
                    )}

                    {business.website && (
  <TrackedLink
    className="actionButton websiteButton"
    href={business.website}
    eventName="contractor_website_click"
    businessId={business.id}
    businessName={business.name}
    category={category}
    target="_blank"
    rel="noopener noreferrer"
  >
    Visit Website
  </TrackedLink>
)}

                    <TrackedLink
                      className="actionButton quoteButton"
                      href={`/quote?businessId=${business.id}&businessName=${encodeURIComponent(
                        business.name
                      )}`}
                      eventName="contractor_quote_click"
                      businessId={business.id}
                      businessName={business.name}
                      category={category}
                    >
                      Request a Quote
                    </TrackedLink>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
        {seoLink && (
          <div className="categorySeoLink">
            <a href={seoLink.href}>
              {seoLink.label} →
            </a>
          </div>
        )}

        {localGuide && (
          <section aria-labelledby="local-roofing-guide" style={{ marginTop: "3rem", maxWidth: "850px", lineHeight: 1.7 }}>
            <h2 id="local-roofing-guide">{localGuide.title}</h2>
            {localGuide.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        )}
      </section>

      <section className="proSection">
        <div>
          <div className="eyebrow light">
            {contractorEyebrow}
          </div>

          <h2>{contractorTitle}</h2>
          <p>{contractorDescription}</p>
        </div>

        <a className="lightButton" href="/get-listed">
          Get Listed
        </a>
      </section>

      <footer>
        <strong>Billings Home Pros</strong>
        <p>
          Connecting Billings-area homeowners with
          local home-service professionals.
        </p>
        <small>© 2026 BillingsHomePros.com</small>
      </footer>
    </main>
  );
}
