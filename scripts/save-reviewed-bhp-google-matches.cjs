// One-time approval of hand-reviewed local Google Places identities.
// Never assign a Place ID to two directory profiles or change contact fields.
const {createClient}=require("@supabase/supabase-js");
const targets=[
 {id:118,name:"Elevated Handyman & Construction",placeId:"ChIJATmMxDKJSFMRoZpHOB0jk9w",googleName:"Elevated Construction",street:"4244 Jackrabbit Dr",phone:true,website:true},
 {id:115,name:"A&M Mobile Handyman",placeId:"ChIJy6lu9dZ7SFMRzJVf6o-W2hE",googleName:"A&M Mobile Handyman Service",street:"707 N Wagner Ln",phone:true,website:true},
 {id:104,name:"Montana Fence",placeId:"ChIJR8_QEVNjSFMRqtkdGKOVOBE",googleName:"Montana Fence Billings",street:"7403 Entryway Dr",phone:true,website:true},
 {id:98,name:"Top Quality Builders",placeId:"ChIJsR3ShOsGNg8Rzhjq3XkKbyU",googleName:"Top Quality Builders - Billings Deck + Exterior Experts",street:"5190 Danford Dr",phone:true,website:true},
 {id:92,name:"Devine Design Concrete",placeId:"ChIJ4TiSgNSqn4gRe0S5H_0V1ao",googleName:"Devine Design Concrete (Billings)",street:"1738 Broadmoor Dr",phone:true,website:false},
 {id:69,name:"Lawntana",placeId:"ChIJYTf9r5l9SFMR_SDRIy7Z1cE",googleName:"Lawntana",street:"1742 Avenue E",phone:false,website:true}
];
const digits=s=>String(s||"").replace(/\D/g,"").slice(-10);
const domain=s=>{try{return new URL(s).hostname.toLowerCase().replace(/^www\./,"")}catch{return""}};
async function main(){
 if(process.env.VERCEL_ENV!=="production"){console.log("BHP_REVIEW_APPROVALS",JSON.stringify({skip:"nonproduction"}));return}
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY,g=process.env.GOOGLE_PLACES_API_KEY;
 if(!url||!key||!g){console.log("BHP_REVIEW_APPROVALS",JSON.stringify({skip:"missing_build_credentials"}));return}
 const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const results=[];
 for(const t of targets){
  try{
   const {data:b,error:readError}=await db.from("businesses").select("id,name,phone,website,google_place_id,google_match_status").eq("id",t.id).single();
   if(readError||!b||b.name!==t.name)throw Error("business_record_changed");
   if(b.google_place_id){results.push({id:t.id,name:t.name,status:b.google_place_id===t.placeId?"already_correct":"already_matched_to_other"});continue;}
   const response=await fetch("https://places.googleapis.com/v1/places/"+t.placeId,{headers:{"X-Goog-Api-Key":g,"X-Goog-FieldMask":"id,displayName,formattedAddress,nationalPhoneNumber,websiteUri,businessStatus"},signal:AbortSignal.timeout(12000)});
   if(!response.ok)throw Error("Google_HTTP_"+response.status);
   const p=await response.json();
   if(p.id!==t.placeId || p.displayName?.text!==t.googleName || p.businessStatus!=="OPERATIONAL" || !(p.formattedAddress||"").includes(t.street) || !/\bBillings\b/.test(p.formattedAddress||"") || !/\bMT\b/.test(p.formattedAddress||""))throw Error("google_name_or_location_changed");
   if(t.phone && (digits(p.nationalPhoneNumber).length!==10||digits(p.nationalPhoneNumber)!==digits(b.phone)))throw Error("google_phone_differs");
   if(t.website && (!domain(p.websiteUri)||domain(p.websiteUri)!==domain(b.website)))throw Error("google_website_differs");
   if(!t.website && !t.phone)throw Error("no_identity_evidence");
   const {data:dupes,error:dupeError}=await db.from("businesses").select("id").eq("google_place_id",t.placeId).neq("id",t.id).limit(1);
   if(dupeError)throw Error("duplicate_check_failed");
   if(dupes?.length)throw Error("same_google_profile_already_claimed");
   const {data:written,error:writeError}=await db.from("businesses").update({google_place_id:t.placeId,google_match_status:"matched",google_last_updated:new Date().toISOString()}).eq("id",t.id).is("google_place_id",null).select("id").maybeSingle();
   if(writeError)throw Error("db_save_failed");
   results.push({id:t.id,name:t.name,status:written?"saved":"concurrent_change"});
  }catch(e){results.push({id:t.id,name:t.name,status:"unchanged",reason:String(e.message).slice(0,110)})}
 }
 console.log("BHP_REVIEW_APPROVALS "+JSON.stringify({checked:results.length,saved:results.filter(x=>x.status==="saved").length,results}));
}
main().catch(e=>{console.error("BHP_REVIEW_APPROVALS_FATAL",String(e.message));process.exitCode=1});