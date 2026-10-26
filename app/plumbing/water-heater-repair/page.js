import { withPageSocial } from "../../lib/seoMetadata";
import CategoryPage from "../../components/CategoryPage";
import Link from "next/link";
export const metadata = withPageSocial( {title:"Water Heater Repair in Billings, MT | Local Plumbers",description:"Find Billings-area plumbing companies listing water heater services and ask about diagnosis, repair, or replacement.",alternates:{canonical:"/plumbing/water-heater-repair"}});
export const dynamic="force-dynamic";
export default function ServicePage(){
 return <>
 <CategoryPage
   category="plumbing" categoryLabel="Plumbing"
   fixedService="water-heaters"
   filters={[{label:"All Plumbing",href:"/plumbing"},{label:"Water Heaters",href:"/plumbing/water-heater-repair",value:"water-heaters"}]}
   serviceNames={{"water-heaters":"Water Heaters"}}
   heroTitle="Water Heater Repair in Billings, Montana"
   heroDescription="Find Billings-area plumbing companies listing water heater services and ask about diagnosis, repair, or replacement."
   eyebrow="FIND A LOCAL SPECIALIST"
   introTitle="Compare Billings-area plumbers"
   introDescription="Compare Billings-area plumbers listing water heater troubleshooting, repairs, and replacement services. Ask whether they service your tank or tankless model, and request a written estimate before authorizing work."
   emptyTitle="No matching service listings yet."
   emptyDescription="Explore the broader category to find additional local professionals."
   localGuide={{title:"What to know about water heaters in Billings",paragraphs:["For leaking water heaters, avoid standing water near electrical equipment. Ask if the issue can be repaired or if replacement is recommended, and request a written estimate for both options where appropriate.", "Request an itemized written estimate, confirm credentials and insurance where applicable, and compare warranty terms before hiring."]}}
   icon="🏠"
   contractorEyebrow="LOCAL PLUMBING COMPANIES"
   contractorTitle="Own a local service business?"
   contractorDescription="Billings Home Pros helps homeowners discover local professionals."
 />
 <section aria-label="Water heater planning resources" style={{background:"#0b1117",padding:"24px 18px",borderTop:"1px solid #243c50"}}>
   <div style={{maxWidth:1000,margin:"0 auto"}}>
     <h2 style={{color:"#fff",fontSize:"clamp(20px,3vw,24px)",margin:"0 0 10px"}}>Repair or replace your water heater?</h2>
     <p style={{color:"#c9d8e4",fontSize:16,lineHeight:1.65,margin:0}}>Use our <Link href="/guides/water-heater-replacement-cost-billings-mt" style={{color:"#73d4ff"}}>Billings water heater replacement cost guide</Link> to prepare for estimates, or <Link href="/plumbing" style={{color:"#73d4ff"}}>browse local plumbing companies</Link> for other plumbing needs.</p>
   </div>
 </section>
 </>;
}