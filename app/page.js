const services = [
  {
    name: "Plumbing",
    icon: "🔧",
    description: "Repairs, water heaters, drains, fixtures & more",
  },
  {
    name: "Heating & Cooling",
    icon: "🔥",
    description: "Furnaces, air conditioning, maintenance & repair",
  },
  {
    name: "Electrical",
    icon: "⚡",
    description: "Repairs, panels, lighting, wiring & installation",
  },
  {
    name: "Roofing",
    icon: "🏠",
    description: "Roof repair, replacement, inspections & storm damage",
  },
  {
    name: "Contractors & Remodeling",
    icon: "🛠️",
    description: "Remodeling, additions, repairs & general contracting",
  },
];

export default function Home() {
  return (
    <main>
      <header>
        <div className="brand">
  <img
    className="headerLogo"
    src="/billings-home-pros-logo.png"
    alt="Billings Home Pros"
  />
</div>
        <nav>
          <a href="#services">Find a Pro</a>
          <a href="#why">Why Home Pros?</a>
          <a href="#pros">For Contractors</a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroContent">
          <div className="eyebrow">BILLINGS • LAUREL • YELLOWSTONE COUNTY</div>

          <h1>
            Find the Right
            <span> Home Pro.</span>
          </h1>

          <p className="heroText">
            Find local home-service professionals serving Billings and
            surrounding communities.
          </p>

          <div className="searchBox">
            <input
              type="text"
              placeholder="What do you need help with?"
              aria-label="Search home services"
            />
            <button>Find a Pro</button>
          </div>

          <p className="searchHint">
            Try plumbing, furnace repair, roofing, electrical or remodeling
          </p>
        </div>

        <div className="mountainArt" aria-hidden="true">
          <div className="sun"></div>
          <div className="mountain mountainBack"></div>
          <div className="mountain mountainFront"></div>
        </div>
      </section>

      <section className="servicesSection" id="services">
        <div className="sectionHeading">
          <div className="eyebrow">START YOUR SEARCH</div>
          <h2>What does your home need?</h2>
          <p>
            Browse local professionals by service. We&apos;re starting with
            five of the most important home-service categories in the Billings
            area.
          </p>
        </div>

        <div className="serviceGrid">
          {services.map((service) => (
            <a className="serviceCard" href="#" key={service.name}>
              <div className="serviceIcon">{service.icon}</div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <span>Browse Pros →</span>
            </a>
          ))}
        </div>
      </section>

      <section className="whySection" id="why">
        <div className="sectionHeading">
          <div className="eyebrow">BUILT FOR BILLINGS</div>
          <h2>Local home services without the runaround.</h2>
          <p>
            Billings Home Pros is being built to make finding the right local
            contractor simpler, faster and more useful.
          </p>
        </div>

        <div className="featureGrid">
          <div className="feature">
            <strong>Local Focus</strong>
            <p>
              Search professionals serving Billings and nearby Yellowstone
              County communities.
            </p>
          </div>

          <div className="feature">
            <strong>Useful Details</strong>
            <p>
              Find services, service areas and contact information in one
              straightforward place.
            </p>
          </div>

          <div className="feature">
            <strong>Easy to Compare</strong>
            <p>
              Browse by the type of work you need instead of digging through
              unrelated listings.
            </p>
          </div>
        </div>
      </section>

      <section className="proSection" id="pros">
        <div>
          <div className="eyebrow light">BILLINGS CONTRACTORS</div>
          <h2>Are you a local home-service professional?</h2>
          <p>
            Billings Home Pros is building a better way for local homeowners
            to discover businesses like yours.
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
