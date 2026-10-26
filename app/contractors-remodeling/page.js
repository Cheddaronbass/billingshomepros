import { withPageSocial } from "../lib/seoMetadata";
import Link from "next/link";
import CategoryPage from "../components/CategoryPage";

export const metadata = withPageSocial( {
  title: "General Contractors & Remodeling in Billings, MT",
  description:
    "Find general contractors and remodeling companies in Billings, Montana for renovations, home additions, repairs, and general contracting. Compare local professionals and request a quote.",
  alternates: {
    canonical: "/contractors-remodeling",
  },
});

export const dynamic = "force-dynamic";

const filters = [
  { label: "All Contractors", href: "/contractors-remodeling" },
  {
    label: "Remodeling",
    href: "/contractors-remodeling?service=remodeling",
    value: "remodeling",
  },
  {
    label: "Home Additions",
    href: "/contractors-remodeling?service=home-additions",
    value: "home-additions",
  },
  {
    label: "Repairs",
    href: "/contractors-remodeling?service=repairs",
    value: "repairs",
  },
  {
    label: "General Contracting",
    href: "/contractors-remodeling?service=general-contracting",
    value: "general-contracting",
  },
];

const serviceNames = {
  remodeling: "Remodeling",
  "home-additions": "Home Additions",
  repairs: "Repairs",
  "general-contracting": "General Contracting",
};

export default function ContractorsRemodelingPage({ searchParams }) {
  return (
    <>
    <CategoryPage
      searchParams={searchParams}
      category="contractors-remodeling"
      categoryLabel="Contractors & Remodeling"
      filters={filters}
      serviceNames={serviceNames}
      heroTitle="General Contractors & Remodeling in Billings, Montana"
      heroDescription="Find local professionals for remodeling, home additions, repairs, general contracting and more."
      eyebrow="FIND A LOCAL CONTRACTOR"
      introTitle="Contractors serving the Billings area"
      introDescription="Browse local contractors and remodeling companies and find the services you need. Use Billings Home Pros to compare local businesses serving the Billings area."
      emptyTitle="No matching contractor listings yet."
      emptyDescription="Try another service or view all contractors serving the Billings area."
      localGuide={{
        "title": "Choosing a Remodeling Contractor in Billings, MT",
        "paragraphs": [
                "For kitchen updates, home additions, or major repairs, begin with a clear description of your goals, budget, and desired schedule. Ask contractors about experience with similar projects in the Billings area.",
                "Request detailed written proposals showing the scope, materials, payment schedule, and how changes will be handled. Check references and confirm any necessary permits, insurance, and registrations.",
                "Comparing the same project scope across bids can help you spot missing work and choose a contractor based on fit and communication, not price alone."
        ]
}}

      icon="🛠️"
      contractorEyebrow="BILLINGS CONTRACTORS"
      contractorTitle="Own a contracting or remodeling business?"
      contractorDescription="Billings Home Pros is building a local directory designed to help homeowners find businesses like yours."
    />
    <section aria-label="Related remodeling resources" style={{background:"#0b1117",padding:"20px 18px",borderTop:"1px solid #243c50"}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <h2 style={{color:"#fff",fontSize:"clamp(19px,3vw,24px)",margin:"0 0 10px"}}>Find the right professional for your project</h2>
        <p style={{color:"#c9d8e4",fontSize:16,lineHeight:1.65,margin:0}}>For smaller maintenance and repair jobs, compare <Link href="/handyman" style={{color:"#73d4ff",textUnderlineOffset:3}}>Billings handyman services</Link>. Planning a bathroom renovation? Start with our <Link href="/guides/bathroom-remodel-cost-billings-mt" style={{color:"#73d4ff",textUnderlineOffset:3}}>local bathroom remodeling cost guide</Link>. If your renovation includes exterior roof work, you can also <Link href="/roofing" style={{color:"#73d4ff",textUnderlineOffset:3}}>browse roofing companies</Link>.</p>
      </div>
    </section>
    <section style={{background:"#0b1117",padding:"22px 18px 40px"}}>
      <div style={{maxWidth:1000,margin:"0 auto",padding:"20px 24px",border:"1px solid #2e5875",borderRadius:14,background:"#102638",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:18}}>
        <div><div style={{color:"#79d6ff",fontSize:12,fontWeight:800,letterSpacing:".1em"}}>FREE BILLINGS HOMEOWNER GUIDE</div><h2 style={{color:"#fff",fontSize:"clamp(20px,3vw,25px)",margin:"8px 0"}}>What does bathroom remodeling cost in Billings?</h2><p style={{color:"#c9d8e4",margin:0,lineHeight:1.5}}>Explore 2026 budget guidance and questions to ask local pros.</p></div>
        <Link href="/guides/bathroom-remodel-cost-billings-mt" style={{background:"#24baff",color:"#07151f",borderRadius:9,fontWeight:800,textDecoration:"none",padding:"13px 18px"}}>Read the Free Guide →</Link>
      </div>
    </section>
    </>
  );
}
