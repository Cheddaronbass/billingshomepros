// One-time production-only approvals after an independently inspected Google
// Places diagnostic. No API keys are printed or written to source.
const { createClient } = require("@supabase/supabase-js");
const digits = value => String(value || "").replace(/\D/g, "").slice(-10);
const domain = value => { try { return new URL(value).hostname.toLowerCase().replace(/^www\./, ""); } catch { return ""; } };
const plans = [
  {id:124, name:"Pella Windows & Doors of Billings", placeId:"ChIJ-YSQ2Ot8SFMR6bLlFi3Dde4", googleName:"Pella Windows and Doors Showroom of Billings, MT", street:"2520 Grand Ave", domain:"pella.com", exactPhone:true},
  {id:127, name:"Exterior Design Solutions", placeId:"ChIJHQzwwAN9SFMRGHMuIQnmfd4", googleName:"Exterior Design Solutions LLC", street:"1834 Grand Ave", domain:"exteriordesignsolution.com", exactPhone:false},
  {id:137, name:"Asphalt Plus Inc.", placeId:"ChIJY3jI0zhwSFMRKmyY3wh1o3I", googleName:"Asphalt Plus, Inc. (API)", street:"425 Johnson Ln", domain:"asphaltplusinc.com", exactPhone:true}
];
(async () => {
 if (process.env.VERCEL_ENV !== "production") { console.log("THREE_APPROVALS",JSON.stringify({skipped:"not_production"})); return; }
 const key=process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL, googleKey=process.env.GOOGLE_PLACES_API_KEY;
 if (!key || !url || !googleKey) { console.log("THREE_APPROVALS",JSON.stringify({skipped:"build_credentials_missing"})); return; }
 const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const outcomes=[];
 for(const p of plans) {
   try {
     const {data:b,error:readError}=await db.from("businesses")
        .select("id,name,phone,website,google_place_id,google_match_status").eq("id",p.id).single();
     if(readError || !b) throw Error("listing_missing");
     if(b.name !== p.name || domain(b.website)!==p.domain) throw Error("listing_identity_changed");
     if(b.google_place_id){outcomes.push({name:p.name,result:b.google_place_id===p.placeId?"already_correct":"already_other"});continue;}
     const res=await fetch("https://places.googleapis.com/v1/places/"+p.placeId,{
       headers:{"X-Goog-Api-Key":googleKey,
         "X-Goog-FieldMask":"id,displayName,formattedAddress,nationalPhoneNumber,websiteUri,businessStatus"},
       signal:AbortSignal.timeout(12000)
     });
     if(!res.ok)throw Error("Google_get_HTTP_"+res.status);
     const place=await res.json();
     const a=place.formattedAddress||"";
     if(place.id!==p.placeId || place.displayName?.text!==p.googleName ||
       place.businessStatus!=="OPERATIONAL" ||
       !a.includes(p.street) || !/\bBillings\b/.test(a) || !/\bMT\b/.test(a) ||
       domain(place.websiteUri)!==p.domain)throw Error("google_identity_mismatch");
     if(p.exactPhone && (digits(place.nationalPhoneNumber).length!==10 ||
       digits(place.nationalPhoneNumber)!==digits(b.phone)))throw Error("google_phone_mismatch");
     // EDS phone differs, but official-site domain, exact street address, city,
     // state, active status, and name are all required before this approval.
     const {data:other,error:usedError}=await db.from("businesses")
       .select("id").eq("google_place_id",p.placeId).neq("id",p.id).limit(1);
     if(usedError)throw Error("duplicate_lookup_failed");
     if(other?.length)throw Error("place_id_already_used");
     const {data:saved,error:saveError}=await db.from("businesses")
       .update({google_place_id:p.placeId,google_match_status:"matched",google_last_updated:new Date().toISOString()})
       .eq("id",p.id).is("google_place_id",null).select("id,google_match_status").maybeSingle();
     if(saveError)throw Error("save_failed");
     outcomes.push({name:p.name,result:saved?"matched":"concurrent_change"});
   }catch(e){outcomes.push({name:p.name,result:"unchanged",reason:String(e.message).slice(0,90)});}
 }
 console.log("THREE_APPROVALS "+JSON.stringify(outcomes));
})().catch(e=>{console.error("THREE_APPROVALS_FATAL",String(e.message));process.exitCode=1;});
