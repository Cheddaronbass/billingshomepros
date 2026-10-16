export const metadata = { alternates: { canonical: "/" } };

import HomeSearch from "./components/HomeSearch";

const services = [
  {
    name: "Plumbing",
    image: "/plumbing.png",
    description: "Repairs, water heaters, drains, fixtures & more",
    href: "/plumbing",
    theme: "plumbing",
  },
  {
    name: "Heating & Cooling",
    image: "/hvac.png",
    description: "Furnaces, air conditioning, maintenance & repair",
    href: "/hvac",
    theme: "hvac",
  },
  {
    name: "Electrical",
    image: "/electrical.png",
    description: "Repairs, panels, lighting, wiring & installation",
    href: "/electrical",
    theme: "electrical",
  },
  {
    name: "Roofing",
    image: "/roofing.png",
    description: "Roof repair, replacement, inspections & storm damage",
    href: "/roofing",
    theme: "roofing",
  },
  {
    name: "Contractors & Remodeling",
    image: "/remodeling.png",
    description: "Remodeling, additions, repairs & general contracting",
    href: "/contractors-remodeling",
    theme: "remodeling",
  },
  {
    name: "Landscaping",
    image: "/landscaping.png",
    description: "Lawn care, irrigation, landscape design & tree services",
    href: "/landscaping",
    theme: "landscaping",
  },
  {
    name: "Painting",
    image: "/painting.png",
    description: "Interior, exterior, cabinet & commercial painting",
    href: "/painting",
    theme: "painting",
  },
  {
    name: "Concrete",
    image: "/concrete.png",
    description: "Driveways, patios, foundations & decorative concrete",
    href: "/concrete",
    theme: "concrete",
  },
  {
    name: "Fencing",
    image: "/fencing.png",
    description: "Wood, vinyl, chain-link fencing & fence repairs",
    href: "/fencing",
    theme: "fencing",
  },
  {
    name: "Handyman",
    image: "/handyman.png",
    description: "Home repairs, drywall, maintenance & installations",
    href: "/handyman",
    theme: "handyman",
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

      {/* Seasonal homepage link: update the label and href each season. */}
      <a
        href="/guides/winter-home-checklist"
        aria-label="Read the Montana winter home preparation checklist"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          flexWrap: "wrap", gap: "5px 9px", padding: "11px 18px",
          background: "#142536", color: "#e6f2fa", textAlign: "center",
          borderBottom: "1px solid #2b4b63", fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: "clamp(0.78rem, 2.5vw, 0.9rem)", lineHeight: 1.45,
          textDecoration: "none"
        }}
      >
        <span aria-hidden="true">❄</span>
        <span>Winter is coming. Is your home ready?</span>
        <span style={{ color: "#58caff", fontWeight: 800 }}>View the checklist →</span>
      </a>

      <section className="hero">
        <div className="heroLogoWrap">
  <img
    className="heroLogo"
    src="/bhp-logo-clean.png"
    alt="Billings Home Pros — local home services in Billings, Montana"
    style={{
      width: "100%",
      maxWidth: "500px",
      height: "auto",
      display: "block",
      margin: "0 auto"
    }}
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

      <section aria-labelledby="related-services-title" style={{ background: "#0b1117", borderTop: "1px solid #273d50", padding: "30px 7% 38px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h2 id="related-services-title" style={{ fontFamily: "Arial, Helvetica, sans-serif", color: "#fff", fontSize: "clamp(19px, 2.5vw, 25px)", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 10px", lineHeight: 1.3 }}>Need more than one type of pro?</h2>
          <p style={{ color: "#c4d2df", fontSize: 15, lineHeight: 1.5, margin: "0 0 16px" }}>Explore services that often go together:</p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "10px 24px", fontSize: 15, lineHeight: 1.5 }}>
            {[
              ["Plumbing", "/plumbing", "Remodeling", "/contractors-remodeling"],
              ["Electrical", "/electrical", "HVAC", "/hvac"],
              ["Roofing", "/roofing", "Painting", "/painting"],
              ["Landscaping", "/landscaping", "Concrete", "/concrete"],
              ["Fencing", "/fencing", "Handyman", "/handyman"],
            ].map(([firstLabel, firstHref, secondLabel, secondHref]) => (
              <span key={firstHref} style={{ color: "#8296a8", whiteSpace: "nowrap" }}>
                <a href={firstHref} style={{ color: "#25b9ff", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>{firstLabel}</a>
                <span style={{ color: "#c4d2df" }}> + </span>
                <a href={secondHref} style={{ color: "#25b9ff", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>{secondLabel}</a>
              </span>
            ))}
          </div>
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

      <section id="pros" aria-label="For Billings contractors" style={{ background: "#101b27", borderTop: "1px solid #273d50", padding: "48px 7% 58px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "18px 28px", padding: "22px 26px", background: "#15283b", border: "1px solid #397da4", borderRadius: 12 }}>
            <div style={{ flex: "1 1 340px", minWidth: 0 }}>
              <h2 style={{ margin: "0 0 8px", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)", fontWeight: 850, lineHeight: 1.2, color: "#fff", letterSpacing: "-0.02em" }}>Handymen welcome!</h2>
              <p style={{ margin: 0, color: "#d3e1ea", fontSize: "0.96rem", lineHeight: 1.6 }}>Work for yourself? No website? No problem. Get your business listed on Home Pros.</p>
            </div>
            <a href="/get-listed" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 46, padding: "12px 20px", background: "#25b9ff", color: "#0b1117", borderRadius: 8, fontWeight: 800, textDecoration: "none", textAlign: "center", flexShrink: 0 }}>Get Your Free Listing →</a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "22px 32px", padding: "42px 4px 0" }}>
            <div style={{ flex: "1 1 380px", minWidth: 0 }}>
              <div style={{ color: "#25b9ff", fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.13em", marginBottom: 12 }}>BILLINGS CONTRACTORS</div>
              <h2 style={{ color: "#fff", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.35rem)", fontWeight: 850, letterSpacing: "-0.035em", lineHeight: 1.2, margin: "0 0 12px" }}>Are you a local home-service professional?</h2>
              <p style={{ color: "#c4d2df", lineHeight: 1.65, margin: 0 }}>Get your business in front of Billings-area homeowners searching for the services you provide.</p>
            </div>
            <a href="/get-listed" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 46, padding: "12px 24px", background: "#25b9ff", color: "#0b1117", borderRadius: 8, fontWeight: 800, textDecoration: "none", flexShrink: 0 }}>Get Listed →</a>
          </div>
        </div>
      </section>

      <footer>
        <strong>Billings Home Pros</strong>

        <p>
          Connecting Billings-area homeowners with local home-service
          professionals.
        </p>

        <nav aria-label="Legal and support" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "18px", margin: "18px 0" }}>
          <a href="/site-map" style={{ color: "inherit", textDecoration: "underline" }}>Site Map</a>
          <a href="/privacy" style={{ color: "inherit", textDecoration: "underline" }}>Privacy Policy</a>
          <a href="/terms" style={{ color: "inherit", textDecoration: "underline" }}>Terms of Service</a>
          <a href="mailto:support@billingshomepros.com" style={{ color: "inherit", textDecoration: "underline" }}>Contact Support</a>
        </nav>
        <small>© 2026 BillingsHomePros.com</small>
      </footer>
    </main>
  );
}
