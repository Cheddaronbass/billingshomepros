// Production-only, guarded data fix for two verified business contacts.
// Paints Well business-controlled website is the primary source for its displayed phone.
// Google Place ID is not changed; River Ridge's external site remains HTTP-only.
const {createClient}=require("@supabase/supabase-js");
const digits=s=>String(s||"").replace(/\D/g,"").slice(-10);
const domain=s=>{try{return new URL(s).hostname.toLowerCase().replace(/^www\./,"")}catch{return""}};
async function get(url){
 const r=await fetch(url,{redirect:"follow",headers:{"User-Agent":"Mozilla/5.0","Accept":"text/html"},signal:AbortSignal.timeout(12000)});
 if(!r.ok||!(r.headers.get("content-type")||"").includes("text/html"))throw Error("site_response_"+r.status);
 return {url:r.url,html:(await r.text()).slice(0,800000)};
}
async function main(){
 if(process.env.VERCEL_ENV!=="production"){console.log("BHP_CONTACT_RECONCILE "+JSON.stringify({skipped:"notproduction"}));return}
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY,g=process.env.GOOGLE_PLACES_API_KEY;
 if(!url||!key||!g){console.log("BHP_CONTACT_RECONCILE "+JSON.stringify({skipped:"credentials unavailable"}));return}
 const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data,error}=await db.from("businesses").select("id,name,category,phone,website,claimed,featured,google_place_id").in("id",[72,88]);
 if(error||data?.length!==2)throw Error("Missing business identities");
 const paints=data.find(x=>x.id===88),river=data.find(x=>x.id===72),results=[];
 if(!paints||paints.name!=="Paints Well with Colors"||paints.category!=="painting"||
    domain(paints.website)!=="paintswellwithcolors.com"||paints.google_place_id!=="ChIJz99LqOySSFMRBuPOeAYGY8E"||
    !["4065301200","4066306350"].includes(digits(paints.phone)))throw Error("Paints Well identity changed - do not modify");
 if(!river||river.name!=="River Ridge Landscape Company"||river.category!=="landscaping"||
    digits(river.phone)!=="4066287317"||!["http://riverridgelandscape.com/","http://www.riverridgelandscape.com/"].includes(river.website))throw Error("River Ridge identity changed - do not modify");

 // Re-check the live company-controlled source and corresponding Google profile.
 try{
  const official=await get("https://paintswellwithcolors.com/");
  if(domain(official.url)!=="paintswellwithcolors.com"||
     !/Paints Well With Colors/i.test(official.html)||
     !/\+?14066306350\b|406[\s().-]*630[\s().-]*6350\b/.test(official.html))throw Error("official_site_not_confirmed");
  const res=await fetch("https://places.googleapis.com/v1/places/"+paints.google_place_id,{
   headers:{"X-Goog-Api-Key":g,"X-Goog-FieldMask":"id,displayName,formattedAddress,nationalPhoneNumber,websiteUri,businessStatus"},signal:AbortSignal.timeout(12000)});
  if(!res.ok)throw Error("google_http_"+res.status);
  const google=await res.json();
  if(google.id!==paints.google_place_id||
    google.displayName?.text!=="Paints Well with Colors"||
    google.businessStatus!=="OPERATIONAL"||
    !/Billings/.test(google.formattedAddress||"")||
    domain(google.websiteUri)!=="paintswellwithcolors.com"||
    digits(google.nationalPhoneNumber)!=="4065301200")throw Error("google_identity_changed");
  if(digits(paints.phone)==="4066306350")results.push({id:88,status:"already_current",googleStillOld:true});
  else{
   const {data:updated,error:writeError}=await db.from("businesses").update({phone:"406-630-6350"})
     .eq("id",88).eq("name",paints.name).eq("phone","406-530-1200").eq("website",paints.website).select("id,phone").maybeSingle();
   if(writeError)throw Error("database_write_failed");
   results.push({id:88,status:updated?"updated_to_official_site_phone":"concurrent_change",googleStillOld:true});
  }
 }catch(e){results.push({id:88,status:"not_modified",reason:String(e.message).slice(0,110)})}

 // HTTP-only host is the business' own canonical target. Avoid its redirect,
 // never rewrite as HTTPS since it does not currently respond to HTTPS.
 try{
  const page=await get("http://www.riverridgelandscape.com/");
  if(page.url!=="http://www.riverridgelandscape.com/"||
    !/River Ridge Landscape Company/i.test(page.html)||
    !/406[\s().-]*628[\s().-]*7317/.test(page.html))throw Error("canonical_http_page_unconfirmed");
  if(river.website===page.url)results.push({id:72,status:"already_canonical",httpsSupported:false});
  else{
   const {data:updated,error:writeError}=await db.from("businesses").update({website:page.url})
    .eq("id",72).eq("name",river.name).eq("phone",river.phone).eq("website",river.website).select("id,website").maybeSingle();
   if(writeError)throw Error("database_write_failed");
   results.push({id:72,status:updated?"normalized_to_working_http":"concurrent_change",httpsSupported:false});
  }
 }catch(e){results.push({id:72,status:"not_modified",reason:String(e.message).slice(0,110)})}
 console.log("BHP_CONTACT_RECONCILE "+JSON.stringify({results}));
}
main().catch(e=>{console.error("BHP_CONTACT_RECONCILE_FATAL",String(e.message));process.exitCode=1});