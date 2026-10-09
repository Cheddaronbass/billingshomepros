import HomeSearch from "./components/HomeSearch";

const services = [
  {
    name: "Plumbing",
    image: "/services/plumbing.png",
    description: "Repairs, water heaters, drains, fixtures & more",
    href: "/plumbing",
    theme: "plumbing",
  },
  {
    name: "Heating & Cooling",
    image: "/services/hvac.png",
    description: "Furnaces, air conditioning, maintenance & repair",
    href: "/hvac",
    theme: "hvac",
  },
  {
    name: "Electrical",
    image: "/services/electrical.png",
    description: "Repairs, panels, lighting, wiring & installation",
    href: "/electrical",
    theme: "electrical",
  },
  {
    name: "Roofing",
    image: "/services/roofing.png",
    description: "Roof repair, replacement, inspections & storm damage",
    href: "/roofing",
    theme: "roofing",
  },
  {
    name: "Contractors & Remodeling",
    image: "/services/remodeling.png",
    description: "Remodeling, additions, repairs & general contracting",
    href: "/contractors-remodeling",
    theme: "remodeling",
  },
];

export default function Home() {
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
          <a href="#services">Find a Pro</a>
          <a href="#why">Why Home Pros?</a>
          <a href="#pros">For Contractors</a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroLogoWrap">
          <img
            className="heroLogo"
         src="/bhp-logo.png"
            alt="Billings Home Pros — local home services in Billings, Montana"
          />
        </div>

        <div className="heroCopy">
          <div className="eyebrow builtForBillings">
  BILLINGS • LAUREL • YELLOWSTONE COUNTY
</div>
          <h1>
          Find the Right
<br />
<span>Home Pro.</span>
          </h1>

          <p className="heroText">
            Find local home-service professionals serving Billings and the
            surrounding Yellowstone County area.
          </p>

          <HomeSearch />
        </div>
      </section>

      <section className="servicesSection" id="services">
        <div className="sectionHeading">
          <div className="eyebrow builtForBillings">START YOUR SEARCH</div>

          <h2>What does your home need?</h2>

          <p>
            Start with one of our main home-service categories and find
            professionals serving the Billings area.
          </p>
        </div>

       <div className="serviceGrid">
  {services.map((service) => (
    <a
      className={`serviceCard ${service.theme}`}
      href={service.href}
      key={service.name}
    >
      <div className="serviceArtwork">
        <img
          src={service.image}
          alt=""
          aria-hidden="true"
        />
      </div>

      <div className="serviceCardContent">
        <h3>{service.name}</h3>
        <p>{service.description}</p>

        <span className="serviceBrowse">
          Browse Pros →
        </span>
      </div>
    </a>
  ))}
</div>
      </section>

      <section className="whySection" id="why">
        <div className="sectionHeading">
          <div className="eyebrow builtForBillings">BUILT FOR BILLINGS</div>

          <h2>Local home services without the runaround.</h2>

          <p>
            Billings Home Pros is being built to make finding local
            home-service professionals simpler, faster and more useful.
          </p>
        </div>

        <div className="featureGrid">
          <div className="feature">
            <strong>Local Focus</strong>
            <p>
              Find professionals serving Billings and nearby Yellowstone
              County communities.
            </p>
          </div>

          <div className="feature">
            <strong>Useful Details</strong>
            <p>
              See services, service areas and contact information in one
              straightforward place.
            </p>
          </div>

          <div className="feature">
            <strong>Easy to Compare</strong>
            <p>
              Browse by the work you actually need instead of sorting through
              unrelated businesses.
            </p>
          </div>
        </div>
      </section>

      <section className="proSection" id="pros">
        <div>
          <div className="eyebrow light">BILLINGS CONTRACTORS</div>

          <h2>Are you a local home-service professional?</h2>

          <p>
            Get your business in front of Billings-area homeowners searching
            for the services you provide.
          </p>
        </div>

        <a className="lightButton" href="/get-listed">
  Get Listed
</a>
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
