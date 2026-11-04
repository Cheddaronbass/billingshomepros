import { withPageSocial } from "../../lib/seoMetadata";
import CategoryPage from "../../components/CategoryPage";
import Link from "next/link";
export const metadata = withPageSocial( {title:"Furnace Repair in Billings, MT | Local HVAC Pros",description:"Need furnace or heater repair in Billings, MT? Find local HVAC contractors, compare services, and contact professionals near you.",alternates:{canonical:"/hvac/furnace-repair"}});
export const dynamic="force-dynamic";
export default function ServicePage(){
 return <>
 <CategoryPage
   category="hvac" categoryLabel="HVAC"
   fixedService="furnace-repair"
   filters={[{label:"All HVAC",href:"/hvac"},{label:"Furnace Repair",href:"/hvac/furnace-repair",value:"furnace-repair"}]}
   serviceNames={{"furnace-repair":"Furnace Repair"}}
   heroTitle="Furnace Repair in Billings, Montana"
   heroDescription="Find Billings-area HVAC professionals listing furnace repair services. Compare options and request a quote."
   eyebrow="FIND A LOCAL SPECIALIST"
   introTitle="Compare Billings-area HVAC companies"
   introDescription="Compare Billings-area HVAC businesses listing furnace diagnosis, heating repairs, and service. Ask whether they work on your furnace type, confirm appointment availability, and request a written estimate before authorizing repairs."
   emptyTitle="No matching service listings yet."
   emptyDescription="Explore the broader category to find additional local professionals."
   localGuide={{title:"What to know about furnace repair in Billings",faqs:[["What should I ask about furnace diagnostic charges?","Ask for the diagnostic visit fee, what it covers, and whether it is credited toward an approved repair. Confirm travel charges, after-hours rates, and whether the technician will provide a written repair estimate before starting work."],["Will every listed company service my furnace type?","Contact the company to confirm experience with your equipment brand, model, and fuel type. Mention whether you have a gas or electric furnace, a heat pump, or another heating system so the provider can confirm that the service is a fit."],["What information helps when booking a furnace repair?","Describe whether the furnace will not start, blows cool air, cycles frequently, or heats rooms unevenly, and when the problem began. Share the model and any displayed error code if readily accessible. Confirm your address and current appointment availability."],["How should I compare a furnace repair with replacement?","Ask the technician to explain the diagnosis, repair scope, parts availability, warranty, and whether other problems are expected. Compare an itemized repair estimate with a replacement estimate that includes installation and related work. Use the equipment condition and total costs rather than age alone."]],paragraphs:["If your furnace isn't heating, describe the symptoms and ask about diagnosis, repair options, and estimated timing. If you smell gas or suspect carbon monoxide, leave immediately and contact your utility or emergency services.", "Request an itemized written estimate, confirm credentials and insurance where applicable, and compare warranty terms before hiring."]}}
   icon="🏠"
   contractorEyebrow="LOCAL HVAC COMPANIES"
   contractorTitle="Own a local service business?"
   contractorDescription="Billings Home Pros helps homeowners discover local professionals."
 />
 <section aria-label="Related heating services" style={{background:"#0b1117",padding:"24px 18px",borderTop:"1px solid #243c50"}}>
   <div style={{maxWidth:1000,margin:"0 auto"}}>
     <h2 style={{color:"#fff",fontSize:"clamp(20px,3vw,24px)",margin:"0 0 10px"}}>Comparing heating repair and replacement options?</h2>
     <p style={{color:"#c9d8e4",fontSize:16,lineHeight:1.65,margin:0}}>Review our <Link href="/guides/furnace-replacement-cost-billings-mt" style={{color:"#73d4ff"}}>Billings furnace replacement cost guide</Link> for budgeting questions, or <Link href="/hvac" style={{color:"#73d4ff"}}>browse HVAC companies</Link> for additional heating and maintenance services.</p>
   </div>
 </section>
 </>;
}