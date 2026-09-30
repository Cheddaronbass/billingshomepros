import { createClient } from "@supabase/supabase-js";

export const metadata = {
  title: "Plumbers in Billings, MT | Billings Home Pros",
  description:
    "Find plumbers serving Billings, Laurel and surrounding Yellowstone County communities.",
};

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Plumbing", href: "/plumbing" },
  {
    label: "Emergency Service",
    href: "/plumbing?service=emergency",
    value: "emergency",
  },
  {
    label: "Water Heaters",
    href: "/plumbing?service=water-heaters",
    value: "water-heaters",
  },
  {
    label: "Drain & Sewer",
    href: "/plumbing?service=drain-sewer",
    value: "drain-sewer",
  },
  {
    label: "Repairs",
    href: "/plumbing?service=repairs",
    value: "repairs",
  },
];

const serviceNames = {
  "water-heaters": "Water Heaters",
  "drain-sewer": "Drain & Sewer",
  repairs: "Repairs",
};

async function getPlumbers(selectedService) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY
  );

  let query = supabase
    .from("businesses")
    .select("*")
    .eq("category", "plumbing");

  if (selectedService === "emergency") {
    query = query.eq("emergency_service", true);
  }

  if (serviceNames[selectedService]) {
    query = query.contains("services", [serviceNames[selectedService]]);
  }

  const { data, error } = await query.order("name");

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  return data || [];
}

export default async function PlumbingPage({ searchParams }) {
  const params = await searchParams;
  const selectedService = params?.service || "";
  console.log("SELECTED SERVICE:", selectedService);
  const plumbers = await getPlumbers(selectedService);

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

          <h1>Plumbers in Billings, Montana</h1>

          <p>
            Find local plumbing professionals for repairs, water heaters,
            clogged drains, fixtures, emergency service and more.
          </p>
        </div>
      </section>

      <section className="categoryContent">
        <div className="categoryIntro">
          <div>
            <div className="eyebrow">FIND A LOCAL PLUMBER</div>
            <h2>Plumbing professionals serving the Billings area</h2>
          </div>

          <p>
            Browse local plumbing companies and find the services you need.
            Use Billings Home Pros to compare local businesses serving the
            Billings area.
          </p>
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
          {plumbers.length === 0 ? (
            <div className="comingSoon">
              <div className="comingSoonIcon">🔧</div>

              <div>
                <h2>No matching plumbing listings yet.</h2>
                <p>
                  Try another plumbing service or view all plumbing
                  professionals serving the Billings area.
                </p>
              </div>
            </div>
          ) : (
            plumbers.map((business) => (
              <article className="contractorCard" key={business.id}>
                <div className="contractorMain">
                  <div className="contractorTop">
                    <div>
                      <h2>{business.name}</h2>

                      <p className="contractorLocation">
                        {business.service_area || "Billings, Montana"}
                      </p>
                    </div>

                    {business.google_rating && (
                      <div className="ratingBox">
                        <strong>★ {business.google_rating}</strong>
                        <span>
                          {business.google_review_count || 0} Google reviews
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="serviceTags">
                    <span>Plumbing</span>

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
                      <a href={`tel:${business.phone}`}>
                        <button>Call</button>
                      </a>
                    )}

                    {business.website && (
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button>Visit Website</button>
                      </a>
                    )}

                    <button className="quoteButton">
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
          <div className="eyebrow light">BILLINGS PLUMBERS</div>
          <h2>Own a plumbing business?</h2>
          <p>
            Billings Home Pros is building a local directory designed to help
            homeowners find businesses like yours.
          </p>
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
