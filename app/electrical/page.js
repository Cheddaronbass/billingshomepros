import { createClient } from "@supabase/supabase-js";

export const metadata = {
  title: "Electricians in Billings, MT | Billings Home Pros",
  description:
    "Find electricians serving Billings, Laurel and surrounding Yellowstone County communities.",
};

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Electrical", href: "/electrical" },
  {
    label: "Electrical Repairs",
    href: "/electrical?service=repairs",
    value: "repairs",
  },
  {
    label: "Panels & Breakers",
    href: "/electrical?service=panels-breakers",
    value: "panels-breakers",
  },
  {
    label: "Lighting",
    href: "/electrical?service=lighting",
    value: "lighting",
  },
  {
    label: "Wiring",
    href: "/electrical?service=wiring",
    value: "wiring",
  },
  {
    label: "Installation",
    href: "/electrical?service=installation",
    value: "installation",
  },
];

const serviceNames = {
  repairs: "Electrical Repairs",
  "panels-breakers": "Panels & Breakers",
  lighting: "Lighting",
  wiring: "Wiring",
  installation: "Installation",
};

async function getElectricians(selectedService) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY
  );

  let query = supabase
    .from("businesses")
    .select("*")
    .eq("category", "electrical");

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

export default async function ElectricalPage({ searchParams }) {
  const params = await searchParams;
  const selectedService = params?.service || "";
  const businesses = await getElectricians(selectedService);

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

          <h1>Electricians in Billings, Montana</h1>

          <p>
            Find local electrical professionals for repairs, panels,
            lighting, wiring, installations and more.
          </p>
        </div>
      </section>

      <section className="categoryContent">
        <div className="categoryIntro">
          <div>
            <div className="eyebrow">FIND A LOCAL ELECTRICIAN</div>
            <h2>Electrical professionals serving the Billings area</h2>
          </div>

          <p>
            Browse local electricians and find the services you need.
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
          {businesses.length === 0 ? (
            <div className="comingSoon">
              <div className="comingSoonIcon">⚡</div>

              <div>
                <h2>No matching electrical listings yet.</h2>
                <p>
                  Try another electrical service or view all electricians
                  serving the Billings area.
                </p>
              </div>
            </div>
          ) : (
            businesses.map((business) => (
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
                    <span>Electrical</span>

                    {business.services?.map((service) => (
                      <span key={service}>{service}</span>
                    ))}
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
          <div className="eyebrow light">BILLINGS ELECTRICIANS</div>
          <h2>Own an electrical business?</h2>
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
