import { withPageSocial } from "../../lib/seoMetadata";
import CategoryPage from "../../components/CategoryPage";
export const metadata = withPageSocial( {title:"Roof Replacement in Billings, MT | Local Roofing Companies",description:"Find local Billings roofing companies listing roof replacement services. Compare businesses and request a written estimate.",alternates:{canonical:"/roofing/roof-replacement"}});
export const dynamic="force-dynamic";
export default function ServicePage(){
 return <CategoryPage
   category="roofing" categoryLabel="Roofing"
   fixedService="roof-replacement"
   filters={[{label:"All Roofing",href:"/roofing"},{label:"Roof Replacement",href:"/roofing/roof-replacement",value:"roof-replacement"}]}
   serviceNames={{"roof-replacement":"Roof Replacement"}}
   heroTitle="Roof Replacement in Billings, Montana"
   heroDescription="Find local Billings roofing companies listing roof replacement services. Compare businesses and request a written estimate."
   eyebrow="FIND A LOCAL SPECIALIST"
   introTitle="Compare Billings-area roofing companies"
   introDescription="This page lists businesses that identify roof replacement in their available services. Confirm the exact work they perform before booking."
   emptyTitle="No matching service listings yet."
   emptyDescription="Explore the broader category to find additional local professionals."
   localGuide={{title:"What to know about roof replacement in Billings",paragraphs:["Billings roofs face wind, hail and winter weather. Ask roofing contractors to document roof condition, replacement materials, flashing, ventilation, tear-off and cleanup before deciding.", "Request an itemized written estimate, confirm credentials and insurance where applicable, and compare warranty terms before hiring."]}}
   icon="🏠"
   contractorEyebrow="LOCAL ROOFING COMPANIES"
   contractorTitle="Own a local service business?"
   contractorDescription="Billings Home Pros helps homeowners discover local professionals."
 />;
}