// One-time, safe canonicalization of two audited cross-category duplicates.
// Keep alias records and all public IDs; no deletion, no new Google IDs.
const {createClient}=require("@supabase/supabase-js");
const pairs=[{canonical:55,alias:117},{canonical:63,alias:118}];
const phone=s=>String(s||"").replace(/\D/g,"").slice(-10);
const domain=s=>{try{return new URL(s).hostname.toLowerCase().replace(/^www\./,"")}catch{return""}};
async function main(){
 if(process.env.VERCEL_ENV!=="production"){console.log("BHP_CANONICALIZE",{skipped:"notproduction"});return}
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,k=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!k)throw Error("Production database env unavailable");
 const db=createClient(url,k,{auth:{persistSession:false,autoRefreshToken:false}});
 const results=[];
 for(const pair of pairs){
  try{
   const {data,error}=await db.from("businesses").select("id,name,category,phone,website,services,claimed,featured,google_place_id").in("id",[pair.canonical,pair.alias]);
   if(error||data?.length!==2)throw Error("pair_unavailable");
   const can=data.find(x=>x.id===pair.canonical),alt=data.find(x=>x.id===pair.alias);
   if(!can||!alt||can.claimed||alt.claimed||can.featured||alt.featured)throw Error("claimed_featured_or_missing");
   if(can.category!=="contractors-remodeling"||alt.category!=="handyman")throw Error("category_changed");
   if(!phone(can.phone)||phone(can.phone)!==phone(alt.phone)||!domain(can.website)||domain(can.website)!==domain(alt.website))throw Error("identity_changed");
   if(!can.google_place_id)throw Error("canonical_missing_google_match");
   if(alt.google_place_id&&alt.google_place_id!==can.google_place_id)throw Error("alias_has_distinct_google_place");
   const serviceList=[...new Set([...(can.services||[]),...(alt.services||[]),"Handyman"])];
   if(serviceList.length===(can.services||[]).length){
    results.push({canonical:can.id,alias:alt.id,status:"already_cross_listed"});
    continue;
   }
   const {data:written,error:writeError}=await db.from("businesses").update({services:serviceList})
      .eq("id",can.id).eq("claimed",false).eq("featured",false)
      .select("id,services").maybeSingle();
   if(writeError)throw Error("service_update_failed");
   if(!written)throw Error("canonical_update_blocked");
   if(!written.services?.includes("Handyman"))throw Error("handyman_tag_missing");
   results.push({canonical:can.id,alias:alt.id,status:"cross_listed",mergedServiceCount:serviceList.length});
  }catch(e){results.push({canonical:pair.canonical,alias:pair.alias,status:"untouched",reason:String(e.message).slice(0,100)})}
 }
 console.log("BHP_CANONICALIZE "+JSON.stringify({results}));
 if(results.some(x=>x.status==="untouched"))process.exitCode=1;
}
main().catch(e=>{console.error("BHP_CANONICALIZE_FATAL",String(e.message));process.exitCode=1});