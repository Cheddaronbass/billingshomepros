
import { createClient } from "@supabase/supabase-js";
import TrackedLink from "./TrackedLink";
import { getGooglePlaceRating } from "../lib/googlePlaces";

function getBusinessInitials(name = "") {
  const ignored = new Set(["and", "&", "the", "of", "llc", "inc", "co", "company", "ltd"]);
  const words = name.trim().split(/\\s+/).filter((word) => {
    const clean = word.replace(/[^a-zA-Z0-9]/g, "");
    return clean && !ignored.has(clean.toLowerCase()) && /[a-zA-Z]/.test(clean);
  });
  if (!words.length) return name.trim().slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

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
  supportsEmergency = false,
}) {
  const params = await searchParams;
  const selectedService = params?.service || "";

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY
  );

  let query = supabase
    .from("businesses")
    .select("*")
    .eq("category", category);

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

  const businesses = error ? [] : data || [];

  const googleRatings = await Promise.all(
    businesses.map((business) =>
      business.google_match_status === "matched" && business.google_place_id
        ? getGooglePlaceRating(business.google_place_id)
        : Promise.resolve(null)
    )
  );

  return (
    <main>
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

        {seoLink && (
          <div className="categorySeoLink">
            <a href={seoLink.href}>
              {seoLink.label} →
            </a>
          </div>
        )}

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
                      <div className="businessLogo" aria-label={business.logo_url ? `${business.name} logo` : `${categoryLabel} category icon`}>
                        {business.logo_url ? (
                          <img
                            src={business.logo_url}
                            alt={`${business.name} logo`}
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                              event.currentTarget.nextElementSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <span
                          className="businessLogoFallback"
                          style={{ display: business.logo_url ? "none" : "flex" }}
                          aria-hidden="true"
                        >
                          {getBusinessInitials(business.name)}
                        </span>
                      </div>
                      <div className="contractorIdentityText">
                      <div className="businessNameRow">
                        <h2>{business.name}</h2>

                        {business.featured && (
                          <span className="featuredBadge">
                            Featured
                          </span>
                        )}

                        {business.claimed && (
                          <span className="claimedBadge">
                            ✓ Claimed
                          </span>
                        )}
                      </div>

                      <p className="contractorLocation">
                        {business.service_area ||
                          "Billings, Montana"}
                      </p>
                      </div>
                    </div>
                  </div>

                  <div className="serviceTags">
                    <span>{categoryLabel}</span>

                    {business.services?.map(
                      (service) => (
                        <span key={service}>
                          {service}
                        </span>
                      )
                    )}

                    {business.emergency_service && (
                      <span>Emergency Service</span>
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
                  <div className="homeProsRating">
                    <strong>Billings Home Pros Reviews</strong>
                    <span>No reviews yet</span>
                  </div>

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

                    <a
                      className="actionButton quoteButton"
                      href={`/quote?businessId=${business.id}&businessName=${encodeURIComponent(
                        business.name
                      )}`}
                    >
                      Request a Quote
                    </a>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
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
