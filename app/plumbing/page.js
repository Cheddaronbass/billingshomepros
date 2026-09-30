export const metadata = {
  title: "Plumbers in Billings, MT | Billings Home Pros",
  description:
    "Find plumbers serving Billings, Laurel and surrounding Yellowstone County communities.",
};

export default function PlumbingPage() {
  return (
    <main>
      <header className="siteHeader">
        <a className="textBrand" href="/">
          <span className="brandMain">Billings Home Pros</span>
          <span className="brandSub">LOCAL HOME SERVICES • BILLINGS, MT</span>
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
            Business listings will appear here as we build the Billings Home
            Pros directory.
          </p>
        </div>

        <div className="filterBar">
          <button>All Plumbing</button>
          <button>Emergency Service</button>
          <button>Water Heaters</button>
          <button>Drain & Sewer</button>
          <button>Repairs</button>
        </div>

   <div className="contractorList">

  <article className="contractorCard">
    <div className="contractorMain">

      <div className="contractorTop">
        <div>
          <span className="sampleBadge">SAMPLE LISTING</span>
          <h2>Yellowstone Plumbing Co.</h2>
          <p className="contractorLocation">
            Billings, Montana • Serving Yellowstone County
          </p>
        </div>

        <div className="ratingBox">
          <strong>★ 4.8</strong>
          <span>127 Google reviews</span>
        </div>
      </div>

      <div className="serviceTags">
        <span>Plumbing Repairs</span>
        <span>Water Heaters</span>
        <span>Drain Cleaning</span>
        <span>Emergency Service</span>
      </div>

      <p className="contractorDescription">
        Sample contractor listing showing how local plumbing businesses
        will appear in the Billings Home Pros directory.
      </p>

      <div className="homeProsRating">
        <strong>Billings Home Pros Reviews</strong>
        <span>No reviews yet</span>
      </div>

      <div className="contractorActions">
        <button>Call</button>
        <button>Visit Website</button>
        <button className="quoteButton">Request a Quote</button>
      </div>

    </div>
  </article>

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
