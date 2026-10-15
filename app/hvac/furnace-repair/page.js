import CategoryPage from "../../components/CategoryPage";
export const metadata = {title:"Furnace Repair in Billings, MT | Local HVAC Pros",description:"Find Billings-area HVAC professionals listing furnace repair services. Compare options and request a quote.",alternates:{canonical:"/hvac/furnace-repair"}};
export const dynamic="force-dynamic";
export default function ServicePage(){
 return <CategoryPage
   category="hvac" categoryLabel="HVAC"
   fixedService="furnace-repair"
   filters={[{label:"All HVAC",href:"/hvac"},{label:"Furnace Repair",href:"/hvac/furnace-repair",value:"furnace-repair"}]}
   serviceNames={{"furnace-repair":"Furnace Repair"}}
   heroTitle="Furnace Repair in Billings, Montana"
   heroDescription="Find Billings-area HVAC professionals listing furnace repair services. Compare options and request a quote."
   eyebrow="FIND A LOCAL SPECIALIST"
   introTitle="Compare Billings-area HVAC companies"
   introDescription="This page lists businesses that identify furnace repair in their available services. Confirm the exact work they perform before booking."
   emptyTitle="No matching service listings yet."
   emptyDescription="Explore the broader category to find additional local professionals."
   localGuide={{title:"What to know about furnace repair in Billings",paragraphs:["If your furnace isn't heating, describe the symptoms and ask about diagnosis, repair options, and estimated timing. If you smell gas or suspect carbon monoxide, leave immediately and contact your utility or emergency services.", "Request an itemized written estimate, confirm credentials and insurance where applicable, and compare warranty terms before hiring."]}}
   icon="🏠"
   contractorEyebrow="LOCAL HVAC COMPANIES"
   contractorTitle="Own a local service business?"
   contractorDescription="Billings Home Pros helps homeowners discover local professionals."
 />;
}