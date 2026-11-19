import { withPageSocial } from "../../lib/seoMetadata";
import CategoryPage from "../../components/CategoryPage";
import Link from "next/link";
export const metadata = withPageSocial( {title:"Furnace Repair in Billings, MT | Local HVAC Pros",description:"Find furnace repair companies in Billings, MT. Compare listed service areas and emergency service options, then call a local technician to confirm availability.",alternates:{canonical:"/hvac/furnace-repair"}});
export const dynamic="force-dynamic";
const afterHoursProviders = [
  ["Ace Heating & Cooling","406-672-2163","hvacbillings.com/","24/7 emergency service"],
  ["ACT Heating & Cooling","406-248-5732","actheatingandcooling.com/contact/","After 4 p.m., voicemail gives the on-call number"],
  ["Central Heating & Air Conditioning","406-245-5424","centralheatingandairmt.com/","24/7 emergency service"],
  ["Comfort Heating & Air Conditioning","406-571-3846","www.comfortheatingbillings.com/","24-hour emergency service"],
  ["Conditioned Air Systems","406-652-9333","www.casmontana.com/","24/7 HVAC service response"],
  ["Homey Solutions","406-919-5648","homeysolutionsinc.com/","24/7 emergency support"],
  ["Kirby Heating & Cooling","406-500-4789","www.kirbyheatingmt.com/","24/7 emergency HVAC service"],
  ["Midwest Heating & Cooling","406-252-8042","www.mhcbillings.com/contact-us","24-hour emergency repairs"],
  ["Platinum HVAC","406-671-8446","platinumhvacllc.com/","Open 24/7"],
  ["White Heating & Air Conditioning","406-248-2162","whitehvac.com/","24/7 service year-round"],
];

function AfterHoursContacts() {
  return <>
    These companies publish after-hours heating service information for Billings. Call to confirm they service your furnace, when a technician can arrive, and the after-hours fee.
    <span style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 245px), 1fr))", gap:"16px 24px", marginTop:16}}>
      {afterHoursProviders.map(([name, phone, website, hours]) => (
        <span key={name}>
          <strong style={{display:"block"}}>{name}</strong>
          <a href={`tel:+1${phone.replaceAll("-", "")}`}>{phone}</a><br />
          <a href={`https://${website}`} aria-label={`${name}: ${hours}, on the company website`}>{hours}</a>
        </span>
      ))}
    </span>
  </>;
}

export default function ServicePage(){
 return <>
 <CategoryPage
   category="hvac" categoryLabel="HVAC"
   fixedService="furnace-repair"
   filters={[{label:"All HVAC",href:"/hvac"},{label:"Furnace Repair",href:"/hvac/furnace-repair",value:"furnace-repair"}]}
   serviceNames={{"furnace-repair":"Furnace Repair"}}
   heroTitle="Furnace Repair in Billings, Montana"
   heroDescription="Compare Billings-area furnace repair companies by service area. Call to confirm availability or request a quote."
   eyebrow="FIND A LOCAL SPECIALIST"
   introTitle="Who offers after-hours furnace repair in Billings?"
   introDescription={<AfterHoursContacts />}
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
     <p style={{color:"#c9d8e4",fontSize:16,lineHeight:1.65,margin:0}}>Review our <Link href="/guides/furnace-replacement-cost-billings-mt" style={{color:"#73d4ff"}}>Billings furnace replacement cost guide</Link> for budgeting questions, see <Link href="/guides/furnace-wont-light" style={{color:"#73d4ff"}}>what to check when your furnace won’t light</Link>, or <Link href="/hvac" style={{color:"#73d4ff"}}>browse HVAC companies</Link> for additional heating and maintenance services.</p>
   </div>
 </section>
 </>;
}