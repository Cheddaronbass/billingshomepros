export const metadata = { alternates: { canonical: "/" } };

import HomeSearch from "./components/HomeSearch";

const services = [
  {
    name: "Plumbing",
    image: "https://cdn.pixabay.com/photo/2015/07/11/14/53/plumbing-840835_1280.jpg",
    description: "Repairs, water heaters, drains, fixtures & more",
    href: "/plumbing",
    iconPath: "M5 3h7v8H5z M12 9h9v4a7 7 0 0 1-7 7H9a4 4 0 0 1-4-4v-5 M9 20v2h9v-2",
    theme: "plumbing",
  },
  {
    name: "Heating & Cooling",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/AirConditioner.jpg/960px-AirConditioner.jpg",
    description: "Furnaces, air conditioning, maintenance & repair",
    href: "/hvac",
    iconPath: "M12 2v20 M4.93 4.93l14.14 14.14 M2 12h20 M4.93 19.07 19.07 4.93 M9 5l3 3 3-3 M9 19l3-3 3 3",
    theme: "hvac",
  },
  {
    name: "Electrical",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700&q=78&fit=crop",
    description: "Repairs, panels, lighting, wiring & installation",
    href: "/electrical",
    iconPath: "M13 2 4 14h7l-1 8 10-12h-7l1-8z",
    theme: "electrical",
  },
  {
    name: "Roofing",
    image: "https://images.pexels.com/photos/33404248/pexels-photo-33404248/free-photo-of-professional-roofer-installing-shingles-on-new-roof.jpeg?auto=compress&dpr=1&h=750&w=1260",
    description: "Roof repair, replacement, inspections & storm damage",
    href: "/roofing",
    iconPath: "M2 11 12 3l10 8 M5 10v11h14V10 M9 21v-7h6v7",
    theme: "roofing",
  },
  {
    name: "Contractors & Remodeling",
    image: "https://unsplash.com/photos/J2AdfKkDY5s/download?w=700",
    description: "Remodeling, additions, repairs & general contracting",
    href: "/contractors-remodeling",
    iconPath: "M9.8,17L5.9,11.6L20,2L22,5V8H19V11H16V14H13V17M9.7,18.7L9.2,21.5L7.6,22.7C6.7,23.3 5.5,23.1 4.8,22.2L1.3,17.3C0.7,16.4 0.9,15.2 1.8,14.5L5.1,12.2L9.7,18.7M4.6,15L3,16.1L6.5,21L8.1,19.8L4.6,15Z",
    theme: "remodeling",
  },
  {
    name: "Landscaping",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=700&q=78&fit=crop",
    description: "Lawn care, irrigation, landscape design & tree services",
    href: "/landscaping",
    iconPath: "M20 4C9 3 4 8 4 15c0 3 2 5 5 5 8 0 12-8 11-16z M4 20c3-5 7-8 13-11",
    theme: "landscaping",
  },
  {
    name: "Painting",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=700&q=78&fit=crop",
    description: "Interior, exterior, cabinet & commercial painting",
    href: "/painting",
    iconPath: "M3 9h16v4H3z M19 11h2v5h-9v6",
    theme: "painting",
  },
  {
    name: "Concrete",
    image: "https://images.pexels.com/photos/37121407/pexels-photo-37121407/free-photo-of-construction-workers-smoothing-wet-concrete.jpeg?auto=compress&dpr=1&h=750&w=1260",
    description: "Driveways, patios, foundations & decorative concrete",
    href: "/concrete",
    iconPath: "M4 5h16l2 14H2L4 5z M4 12h16 M10 5l-2 14 M16 5l2 14",
    theme: "concrete",
  },
  {
    name: "Fencing",
    image: "https://images.unsplash.com/photo-1769831190663-95fe8454d8c9?auto=format&fit=crop&w=700&q=82",
    description: "Wood, vinyl, chain-link fencing & fence repairs",
    href: "/fencing",
    iconPath: "M3 7l3-4 3 4v14H3V7z M10 7l3-4 3 4v14h-6V7z M17 7l3-4 2 4v14h-5V7z",
    theme: "fencing",
  },
  {
    name: "Windows & Doors",
    image: "/windows-doors-montana.jpg",
    description: "Window replacement, installation, repairs & exterior doors",
    href: "/windows-doors",
    iconPath: "M3 3h18v18H3z M12 3v18 M3 12h18",
    theme: "windows-doors",
  },
  {
    name: "Flooring",
    image: "https://images.unsplash.com/photo-1737065189944-1b50964f4193?auto=format&fit=crop&w=700&q=82",
    description: "Carpet, hardwood, tile, vinyl flooring & refinishing",
    href: "/flooring",
    iconPath: "M3 4h18v16H3z M3 10h18 M3 16h18 M9 4v6 M15 10v6 M10 16v4",
    theme: "flooring",
  },
  {
    name: "Handyman",
    image: "https://unsplash.com/photos/Klby0nxseY8/download?w=700",
    description: "Home repairs, drywall, maintenance & installations",
    href: "/handyman",
    iconPath: "M2 19.63L13.43 8.2L12.72 7.5L14.14 6.07L12 3.89C13.2 2.7 15.09 2.7 16.27 3.89L19.87 7.5L18.45 8.91H21.29L22 9.62L18.45 13.21L17.74 12.5V9.62L16.27 11.04L15.56 10.33L4.13 21.76L2 19.63Z",
    theme: "handyman",
  },
];

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [
    { "@context": "https://schema.org", "@type": "Organization", "@id": "https://billingshomepros.com/#organization", name: "Billings Home Pros", url: "https://billingshomepros.com/", description: "A local directory connecting Billings-area homeowners with home-service businesses." },
    { "@context": "https://schema.org", "@type": "WebSite", "@id": "https://billingshomepros.com/#website", name: "Billings Home Pros", url: "https://billingshomepros.com/", publisher: { "@id": "https://billingshomepros.com/#organization" } }
      ] }).replace(/</g, "\\u003c") }} />
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
          loading="lazy"
          decoding="async"
          alt=""
          aria-hidden="true"
        />
      </div>

      <div className="serviceCardContent">
        <svg className="serviceTileIcon" viewBox="0 0 24 24" aria-hidden="true" fill={service.theme === "handyman" || service.theme === "remodeling" ? "currentColor" : "none"} stroke={service.theme === "handyman" || service.theme === "remodeling" ? "none" : "currentColor"} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">{service.theme === "painting" && <rect x="3" y="2" width="16" height="5" fill="currentColor" stroke="none" />}<path d={service.iconPath} /></svg>
        <h3>{service.theme === "remodeling" ? <><span className="desktopRemodelLabel">Contractors & Remodeling</span><span className="mobileRemodelLabel">Remodeling</span></> : service.name}</h3>
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
              ["Windows & Doors", "/windows-doors", "Remodeling", "/contractors-remodeling"],
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

      <section aria-label="Free homeowner planning guides" style={{background:"#0b1117",padding:"0 7% 32px"}}>
        <div style={{maxWidth:1100,margin:"0 auto",textAlign:"center",borderTop:"1px solid #273d50",paddingTop:22}}>
          <p style={{color:"#c4d2df",fontSize:15,margin:"0 0 12px"}}>Planning a project? Explore our free Billings homeowner guides:</p>
          <nav aria-label="Homeowner cost guides" style={{display:"flex",justifyContent:"center",gap:"10px 26px",flexWrap:"wrap",fontSize:15,lineHeight:1.7}}>
            <a href="/guides/roof-replacement-cost-billings-mt" style={{color:"#73d4ff",fontWeight:700}}>Roof Replacement Costs</a>
            <a href="/guides/furnace-replacement-cost-billings-mt" style={{color:"#73d4ff",fontWeight:700}}>Furnace Replacement Costs</a>
            <a href="/guides/bathroom-remodel-cost-billings-mt" style={{color:"#73d4ff",fontWeight:700}}>Bathroom Remodel Costs</a>
          </nav>
        </div>
      </section>

      <section className="whySection" id="why">
        <div className="sectionHeading">
          <div className="eyebrow builtForBillings">BUILT FOR BILLINGS</div>

          <h2>Local home services without the runaround.</h2>

          <p>
            Discover local home-service professionals, compare their services,
            and find the right fit for your next project.
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
