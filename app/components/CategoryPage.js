import { createClient } from "@supabase/supabase-js";

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
    query = query.contains("services", [serviceNames[selectedService]]);
  }

  const { data, error } = await query.order("name");

  if (error) {
    console.error("Supabase error:", error);
  }

  const businesses = error ? [] : data || [];

  return (
    <main>
      <header className="siteHeader">
        <a className="textBrand" href="/">
          <span className="brandMain">Billings Home Pros</span>
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
                className={isActive ? "activeFilter" : ""}
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
              <div className="comingSoonIcon">{icon}</div>

              <div>
                <h2>{emptyTitle}</h2>
                <p>{emptyDescription}</p>
              </div>
            </div>
          ) : (
            businesses.map((business) => (
              <article className="contractorCard" key={business.id}>
                <div className="contractorMain">
                  <div className="contractorTop">
                 <div>
  <div className="businessNameRow">
    <h2>{business.name}</h2>

    {business.featured && (
      <span className="featuredBadge">Featured</span>
    )}

    {business.claimed && (
      <span className="claimedBadge">✓ Claimed</span>
    )}
  </div>

  <p className="contractorLocation">
    {business.service_area || "Billings, Montana"}
  </p>
</div>

                    {business.google_rating && (
  <div className="ratingBox">
    <div className="ratingScore">
      <span className="ratingStar">★</span>
      <strong>{business.google_rating}</strong>
    </div>

    <span className="ratingSource">
      Google rating
    </span>

    <span className="ratingCount">
      {business.google_review_count || 0} reviews
    </span>
  </div>
)}
                  </div>

                  <div className="serviceTags">
                    <span>{categoryLabel}</span>

                    {business.services?.map((service) => (
                      <span key={service}>{service}</span>
                    ))}

                    {business.emergency_service && (
                      <span>Emergency Service</span>
                    )}
                  </div>

                  {business.description && (
                    <p className="contractorDescription">
                      {business.description}
                    </p>
                  )}

                  <div className="homeProsRating">
                    <strong>Billings Home Pros Reviews</strong>
                    <span>No reviews yet</span>
                  </div>

                <div className="contractorActions">
  {business.phone && (
    <a
      className="actionButton callButton"
      href={`tel:${business.phone}`}
    >
      Call {business.phone}
    </a>
  )}

  {business.website && (
    <a
      className="actionButton websiteButton"
      href={business.website}
      target="_blank"
      rel="noopener noreferrer"
    >
      Visit Website
    </a>
  )}

  <button className="actionButton quoteButton">
    Request a Quote
  </button>
</div>

          
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="proSection">
        <div>
          <div className="eyebrow light">{contractorEyebrow}</div>
          <h2>{contractorTitle}</h2>
          <p>{contractorDescription}</p>
        </div>

        <button className="lightButton">Get Listed</button>
      </section>

      <footer>
        <strong>Billings Home Pros</strong>
        <p>
          Connecting Billings-area homeowners with local home-service
          professionals.
        </p>
        <small>© 2026 BillingsHomePros.com</small>
      </footer>
    </main>
  );
}
