// One-time guarded corrections of source-confirmed BHP contact fields.
// Sources verified 2026-10-23. Do not invent websites or alter disputed phones.
const {createClient}=require("@supabase/supabase-js");
const sites=[
 {id:72,name:"River Ridge Landscape Company",category:"landscaping",phone:"406-628-7317",url:"http://riverridgelandscape.com/",marker:/River Ridge Landscape Company/i},
 {id:88,name:"Paints Well with Colors",category:"painting",phone:"406-530-1200",url:"https://paintswellwithcolors.com/",marker:/Paints Well With Colors/i},
 {id:131,name:"NCI Windows Doors & Siding",category:"windows-doors",phone:"406-252-1005",url:"https://nciwindows.com/",marker:/NCI|windows.*doors|siding/i},
 {id:139,name:"Plankwalker Siding and Roofing",category:"windows-doors",phone:"406-694-6064",url:"https://plankwalker.llc/",marker:/Plankwalker Siding/i}
];
const digits=s=>String(s||"").replace(/\D/g,"").slice(-10);
const host=s=>{try{return new URL(s).hostname.toLowerCase().replace(/^www\./,"")}catch{return""}};
async function main(){
 if(process.env.VERCEL_ENV!=="production"){console.log("BHP_CONTACT_FIX",{skip:"nonproduction"});return}
 const u=process.env.NEXT_PUBLIC_SUPABASE_URL,k=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!u||!k)throw Error("Missing production data credentials");
 const db=createClient(u,k,{auth:{persistSession:false,autoRefreshToken:false}});
 const results=[];
 for(const item of sites){
  try{
   const {data:b,error:readError}=await db.from("businesses").select("id,name,category,phone,website").eq("id",item.id).single();
   if(readError||!b||b.name!==item.name||b.category!==item.category||digits(b.phone)!==digits(item.phone))throw Error("record_identity_changed");
   if(b.website){results.push({id:item.id,name:item.name,status:"already_set"});continue}
   const response=await fetch(item.url,{headers:{"User-Agent":"Mozilla/5.0","Accept":"text/html"},signal:AbortSignal.timeout(11000),redirect:"follow"});
   const mime=response.headers.get("content-type")||"";
   if(!response.ok||!mime.includes("text/html")||host(response.url)!==host(item.url))throw Error("site_unavailable_or_redirected_elsewhere");
   const html=(await response.text()).slice(0,350000);
   if(!item.marker.test(html))throw Error("site_identity_unconfirmed");
   const {data:saved,error:writeError}=await db.from("businesses").update({website:item.url})
     .eq("id",item.id).eq("name",item.name).is("website",null).select("id").maybeSingle();
   if(writeError)throw Error("write_failed");
   results.push({id:item.id,name:item.name,status:saved?"updated":"changed_concurrently"});
  }catch(e){results.push({id:item.id,name:item.name,status:"unchanged",reason:String(e.message).slice(0,85)})}
 }
 // Smith's phone number is corroborated by independent Billings directories,
 // with consistent name and 1220 Weil St location. The saved official domain
 // is retained unchanged even if its website is temporarily inaccessible.
 try{
  const id=136,phoneValue="406-860-4505";
  const {data:b,error:readError}=await db.from("businesses").select("id,name,phone,website,category").eq("id",id).single();
  if(readError||!b||b.name!=="Smith & Company"||b.category!=="windows-doors"||host(b.website)!=="buildingbillings.com")throw Error("smith_identity_changed");
  if(b.phone){results.push({id,name:b.name,status:"phone_already_set"});}
  else{
   const {data:saved,error:writeError}=await db.from("businesses").update({phone:phoneValue})
    .eq("id",id).is("phone",null).eq("name",b.name).select("id").maybeSingle();
   if(writeError)throw Error("phone_write_failed");
   results.push({id,name:b.name,status:saved?"phone_added":"changed_concurrently"});
  }
 }catch(e){results.push({id:136,name:"Smith & Company",status:"unchanged",reason:String(e.message).slice(0,85)})}
 console.log("BHP_CONTACT_FIX "+JSON.stringify({updatedSites:results.filter(x=>x.status==="updated").length,updatedPhones:results.filter(x=>x.status==="phone_added").length,results}));
}
main().catch(e=>{console.error("BHP_CONTACT_FIX_FATAL",String(e.message));process.exitCode=1});