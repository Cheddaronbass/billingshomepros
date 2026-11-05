export const metadata = { alternates: { canonical: "/" } };

import HomeSearch from "./components/HomeSearch";
import SeasonalBanner from "./components/SeasonalBanner";

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
    <main className="skylineHome">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [
    { "@context": "https://schema.org", "@type": "Organization", "@id": "https://billingshomepros.com/#organization", name: "Billings Home Pros", url: "https://billingshomepros.com/", description: "A local directory connecting Billings-area homeowners with home-service businesses." },
    { "@context": "https://schema.org", "@type": "WebSite", "@id": "https://billingshomepros.com/#website", name: "Billings Home Pros", url: "https://billingshomepros.com/", publisher: { "@id": "https://billingshomepros.com/#organization" } }
      ] }).replace(/</g, "\\u003c") }} />
      <header className="siteHeader">
        <a className="skylineBrand" href="/" aria-label="Billings Home Pros home">
          <img src="/bhp-logo-clean.png" alt="" width="1356" height="775" />
          <span>Billings Home Pros</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#services">Find a Pro</a>
          <a href="#planning">Homeowner Guides</a>
          <a href="#why">About</a>
          <a className="headerListing" href="/get-listed">List Your Business</a>
        </nav>
      </header>

      <SeasonalBanner />

      <section className="hero skylineHero">
        <img className="skylinePhoto" src="/billings-rims-sunset.webp" alt="Golden evening light on the Rimrocks above Billings, photographed by Shawn Eby" width="2048" height="1365" fetchPriority="high" />

        <style>{`
          /* Keep the authentic photograph intact and leave downtown below the controls. */
          .skylineHero.hero { min-height: max(768px, 53.32vw); padding: 30px 5% 30px; background: #426583; }
          .skylineHero .skylinePhoto { height: 125%; object-position: center top; }
          .skylineHero .heroCopy { max-width: 1100px; }
          .skylineHeroLogo { display: block; width: 320px; height: auto; margin: 0 auto 18px; filter: drop-shadow(0 2px 5px #16365055); }
          .skylineHero .eyebrow { margin-bottom: 14px; font-size: 18px; }
          .skylineHero .heroSearchDock { margin-top: clamp(130px, 11.5vw, 195px); }
          .skylineHero h1 { font-size: clamp(38px, 3.15vw, 54px); margin-bottom: 10px; }
          .skylineHero .heroText { font-size: clamp(18px, 1.45vw, 23px); line-height: 1.4; margin-bottom: 18px; }
          .skylineHero .searchBox { max-width: 800px; }
          .skylineHero .searchHint { margin-top: 8px; }
          .skylineHero .heroListing { margin-top: 12px; text-align: center; }
          @media (max-width: 1100px) and (min-width: 761px) {
            .skylineHero.hero { min-height: 864px; }
          }
          @media (max-width: 760px) {
            .skylineHero.hero { min-height: 0; padding: 24px 6% 36px; }
            .skylineHeroLogo { width: 240px; margin-bottom: 18px; }
            .skylineHero .skylinePhoto { inset: auto auto 0 50%; width: auto; max-width: none; height: 640px; transform: translateX(-56%); object-fit: contain; mask-image: linear-gradient(180deg, transparent 0%, #000 24%); }
            .skylineHero::before { background: linear-gradient(180deg, rgba(4,31,58,.25) 0%, rgba(4,31,58,.18) 45%, rgba(4,31,58,0) 76%); }
            .skylineHero h1 { font-size: clamp(32px, 8.2vw, 44px); line-height: 1.1; }
            .skylineHero .eyebrow { font-size: 10px; letter-spacing: .14em; }
            .skylineHero .heroText { font-size: 18px; }
            .skylineHero .heroSearchDock { margin-top: 48px; }
            .skylineHero .skylinePhoto { bottom: -128px; }
            .skylineHero .heroListing p { text-shadow: 0 1px 5px #102a46; }
            .skylineHero .searchHint { font-size: 13px; }
          }
        `}</style>
        <div className="heroCopy">
          <svg className="skylineHeroLogo" viewBox="0 0 1356 775" role="img" aria-label="Billings Home Pros">
            <defs>
              <filter id="hero-logo-colors" colorInterpolationFilters="sRGB">
                <feColorMatrix type="matrix" values="0 1 0 0 0  0 1 0 0 0  0 1 0 0 0  0 0 0 1 0" />
                <feComponentTransfer>
                  <feFuncR type="table" tableValues="1 1 0 0 1" />
                  <feFuncG type="table" tableValues="1 1 .62 .62 1" />
                  <feFuncB type="table" tableValues="1 1 1 1 1" />
                </feComponentTransfer>
              </filter>
            </defs>
            <image href="/bhp-logo-clean.png" width="1356" height="775" filter="url(#hero-logo-colors)" />
          </svg>

          <div className="eyebrow">BILLINGS • YELLOWSTONE COUNTY</div>
          <h1>Local pros. Right here in Billings.</h1>
          <p className="heroText">Find local help for your home, from repairs to renovations.</p>
          <div className="heroSearchDock">
          <HomeSearch />
          <div className="heroListing">
            <a href="/get-listed" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 46, padding: "12px 22px", background: "#25b9ff", color: "#071521", borderRadius: 9, fontWeight: 800, textDecoration: "none", fontSize: 16 }}>Get Your Free Listing →</a>
            <p style={{ color: "#e0edf5", fontSize: 14, lineHeight: 1.5, margin: "9px 0 0" }}>For local home-service businesses. No website required.</p>
          </div>
          </div>
        </div>
      </section>

      <section className="servicesSection" id="services">
        <div className="sectionHeading">
          <div className="eyebrow builtForBillings">START YOUR SEARCH</div>

          <h2>What can we help you with?</h2>

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

      <section id="planning" aria-labelledby="planning-title" style={{ background: "#f0f6fa", padding: "clamp(34px, 5vw, 56px) 7%", borderBottom: "1px solid #dce7ee", fontFamily: "Arial, Helvetica, sans-serif" }}>
        <style>{`
          #planning .planning-card:hover { border-color: #009cda !important; box-shadow: 0 8px 24px rgba(15, 55, 80, .10); }
          #planning .planning-card:focus-visible { outline: 3px solid #007eaf; outline-offset: 4px; }
        `}</style>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 26 }}>
            <p style={{ color: "#007da8", fontSize: 13, fontWeight: 800, letterSpacing: "0.14em", margin: "0 0 10px" }}>FREE BILLINGS HOMEOWNER GUIDES</p>
            <h2 id="planning-title" style={{ color: "#101b27", fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 850, lineHeight: 1.15, letterSpacing: "-0.035em", margin: "0 0 12px" }}>Planning a project?</h2>
            <p style={{ color: "#485b6a", fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.5, margin: 0 }}>Understand costs before you call a contractor.</p>
          </div>
          <nav aria-label="Homeowner cost guides" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 18 }}>
            {[
              ["Roof Replacement", "Compare roofing materials, project scope, and what to ask when gathering estimates.", "/guides/roof-replacement-cost-billings-mt"],
              ["Furnace Replacement", "Explore equipment choices, installation factors, and questions for your HVAC pro.", "/guides/furnace-replacement-cost-billings-mt"],
              ["Bathroom Remodeling", "Plan your scope, understand cost factors, and prepare for contractor estimates.", "/guides/bathroom-remodel-cost-billings-mt"],
            ].map(([title, description, href]) => (
              <a className="planning-card" key={href} href={href} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", background: "#fff", border: "1px solid #d3e2ec", borderTop: "4px solid #00a8e8", borderRadius: 12, padding: "24px", textDecoration: "none", minWidth: 0, textAlign: "left" }}>
                <h3 style={{ color: "#101b27", fontSize: 22, fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em", margin: "0 0 12px" }}>{title}</h3>
                <p style={{ color: "#485b6a", fontSize: 16, lineHeight: 1.6, margin: "0 0 20px" }}>{description}</p>
                <span style={{ color: "#007da8", fontSize: 16, fontWeight: 800, marginTop: "auto" }}>Read guide <span aria-hidden="true">→</span></span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="whySection" id="why">
        <div className="sectionHeading">
          <div className="eyebrow builtForBillings">BUILT FOR BILLINGS</div>

          <h2>Local home services without the runaround.</h2>

          <p style={{ color: "#009de0", maxWidth: 850, marginInline: "auto", lineHeight: 1.65 }}>
            Discover local home-service professionals, compare their services,
            and find the right fit for your next project.
          </p>
        </div>

        <style>{`
          #why .feature { text-align: center; }
          #why .feature > strong { display: flex; align-items: center; justify-content: center; min-height: 2.4em; line-height: 1.2; }
          @media (max-width: 760px) { #why .feature > strong { min-height: 0; } }
        `}</style>
        <div className="featureGrid">
          <div className="feature" style={{ textAlign: "center" }}>
            <strong>Local Focus</strong>
            <p>
              Find professionals serving Billings, Laurel and nearby Yellowstone
              County communities. Check service areas and contact details to find local help for your next home project.
            </p>
          </div>

          <div className="feature">
            <strong style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", textAlign: "left", gap: 10 }}><span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#9199a3", fontSize: 32, fontWeight: 700, lineHeight: 1, flexShrink: 0 }}>✓</span><span>What the Checkmark Means</span></strong>
            <p>
              The business has contacted Billings Home Pros directly. This does not verify licensing, insurance, workmanship or availability.
            </p>
          </div>

          <div className="feature" style={{ textAlign: "center" }}>
            <strong>Easy to Compare</strong>
            <p>
              Browse by the work you need and compare services and business
              details in one place. Contact professionals directly to ask about estimates, availability and your project.
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
            <a href="/get-listed" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 46, minWidth: 225, fontSize: 16, padding: "12px 20px", background: "#25b9ff", color: "#0b1117", borderRadius: 8, fontWeight: 800, textDecoration: "none", textAlign: "center", flexShrink: 0 }}>Get Your Free Listing →</a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "18px 28px", padding: "28px 26px 0" }}>
            <div style={{ flex: "1 1 340px", minWidth: 0 }}>
              <div style={{ color: "#25b9ff", fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.13em", marginBottom: 8 }}>BILLINGS CONTRACTORS</div>
              <h2 style={{ color: "#fff", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)", fontWeight: 850, letterSpacing: "-0.02em", lineHeight: 1.2, margin: "0 0 8px" }}>Are you a local home-service professional?</h2>
              <p style={{ color: "#d3e1ea", fontSize: "0.96rem", lineHeight: 1.6, margin: 0 }}>Basic listings are free. Share your services and contact details so Billings-area homeowners can find your business. No website required.</p>
            </div>
            <a href="/get-listed" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 46, minWidth: 225, fontSize: 16, padding: "12px 20px", background: "#25b9ff", color: "#0b1117", borderRadius: 8, fontWeight: 800, textDecoration: "none", flexShrink: 0 }}>Get Your Free Listing →</a>
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
