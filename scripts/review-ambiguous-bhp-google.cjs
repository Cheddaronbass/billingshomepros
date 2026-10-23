// Read-only Google candidates for unresolved existing contractor profiles.
const {createClient}=require("@supabase/supabase-js");
const ids=[21,65,69,92,96,98,104,106,111,115,117,118];
const digits=s=>String(s||"").replace(/\D/g,"").slice(-10);
const domain=s=>{try{return new URL(s).hostname.toLowerCase().replace(/^www\./,"")}catch{return""}};
async function main(){
 if(process.env.VERCEL_ENV!=="production"){console.log("BHP_MANUAL_GOOGLE_SUMMARY "+JSON.stringify({skipped:"notproduction"}));return}
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY,g=process.env.GOOGLE_PLACES_API_KEY;
 if(!url||!key||!g){console.log("BHP_MANUAL_GOOGLE_SUMMARY "+JSON.stringify({skipped:"credentials_not_available_in_build"}));return}
 const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data,error}=await db.from("businesses").select("id,name,phone,website,category,google_place_id,google_match_status").in("id",ids);
 if(error)throw Error("Failed to read existing listings");
 const results=[];
 for(const id of ids){
  const b=data.find(x=>x.id===id);if(!b){results.push({id,skip:"not_found"});continue}
  if(b.google_place_id){results.push({id,name:b.name,skip:"already_matched"});continue}
  const found=new Map(),errors=[];
  for(const query of [b.name+" Billings Montana",b.name+" "+(b.phone||"")+" Billings MT"]){
   try {
    const r=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":g,"X-Goog-FieldMask":"places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.businessStatus,places.rating,places.userRatingCount"},body:JSON.stringify({textQuery:query,maxResultCount:5}),signal:AbortSignal.timeout(12000)});
    if(!r.ok){errors.push("HTTP_"+r.status);continue}
    const places=(await r.json()).places||[];
    for(const p of places){if(!p.id)continue;found.set(p.id,{id:p.id,name:p.displayName?.text||"",address:p.formattedAddress||"",phone:p.nationalPhoneNumber||"",website:p.websiteUri||"",operational:p.businessStatus==="OPERATIONAL",domainMatch:!!domain(p.websiteUri)&&domain(p.websiteUri)===domain(b.website),phoneMatch:digits(p.nationalPhoneNumber).length===10&&digits(p.nationalPhoneNumber)===digits(b.phone),rating:p.rating??null,count:p.userRatingCount??null});}
   }catch(e){errors.push(String(e.message).slice(0,80))}
  }
  results.push({id,name:b.name,category:b.category,phone:b.phone,website:b.website,places:[...found.values()].slice(0,7),errors});
 }
 for(const r of results)console.log("BHP_MANUAL_GOOGLE "+JSON.stringify(r));
 console.log("BHP_MANUAL_GOOGLE_SUMMARY "+JSON.stringify({checked:results.length,candidates:results.filter(r=>r.places?.length).length,already:results.filter(r=>r.skip==="already_matched").length,errors:results.filter(r=>r.errors?.length).length}));
}
main().catch(e=>{console.error("BHP_MANUAL_GOOGLE_FATAL",String(e.message));process.exitCode=1});