// One-time production-only import of official Flooring business logos and exact Google identities.
// Logos chosen from business-owned websites; no fabricated images, reviews, IDs or other data.
const {createClient}=require("@supabase/supabase-js");
const expected={
142:{name:"Carpet One Floor & Home of Billings",domain:"carpetonebillings.com",asset:"https://www.carpetonebillings.com/root/client/C803/img/logo/logo.png?rnd=5159"},
143:{name:"World Famous Carpet Barn",domain:"cbarn.com",asset:"https://cbarn.com/wp-content/uploads/2025/08/Logo-1.png"},
144:{name:"Floors By Design",domain:"floorsbydesignmt.com",asset:"https://www.floorsbydesignmt.com/wp-content/themes/floorsbydesign2/img/fbd-header-logo.png"},
145:{name:"Soft Touch Designs",domain:"softtouchdesigns.net",asset:"https://irp.cdn-website.com/f174599e/dms3rep/multi/opt/Soft-Touch-Designs_Logo--281-29-1920w.png"},
146:{name:"Fischer Commercial Flooring",domain:"fischercommercialflooring.com",asset:"https://fischerflooring.com/wp-content/uploads/2024/05/FischerCF-2024-Logo.svg"},
147:{name:"Choice Floors - Billings",domain:"choicefloors.com",asset:"https://www.choicefloors.com/cdn/shop/files/choice-floors-logo.png?v=1770616925&width=600"},
148:{name:"Rich's Modern Flooring",domain:"richsflooring.com",asset:"https://www.richsflooring.com/wp-content/uploads/2022/06/richs-modern-flooring-logo.webp"},
149:{name:"Montana Hardwood Floor Company",domain:"montanahardwoodfloorcompany.com",asset:"https://montanahardwoodfloorcompany.com/wp-content/uploads/2025/07/mt-hardwood-floor-1.png"},
150:{name:"The Floor Trader of Billings",domain:"floortraderbillings.com",asset:"https://www.floortraderbillings.com/root/clientimages/CCM0012/img/logo/logo-header.jpg?rnd=9963"},
151:{name:"Rimrock Cabinet Co",domain:"rimrockcabinetandflooring.com",asset:"https://irp.cdn-website.com/8002b037/dms3rep/multi/opt/rcclogothreeweb-230w.png"},
152:{name:"Murray Floor & Window Coverings",domain:"floorsandwindowsmt.com",asset:"https://www.floorsandwindowsmt.com/wp-content/uploads/Murray-Floor-and-Window-Coverings-Logo.png"}
};
const domain=s=>{try{return new URL(s).hostname.replace(/^www\./,"").toLowerCase()}catch{return""}};
const digits=s=>String(s||"").replace(/\D/g,"").slice(-10);
const isImage=(buf,type)=>{
 if(buf.length<100||buf.length>4_000_000)return false;
 const start=buf.subarray(0,450).toString("utf8").trimStart();
 return (buf[0]===137&&buf[1]===80&&buf[2]===78&&buf[3]===71) ||
 (buf[0]===255&&buf[1]===216&&buf[2]===255) ||
 (buf.subarray(0,4).toString("ascii")==="RIFF"&&buf.subarray(8,12).toString("ascii")==="WEBP") ||
 (buf.subarray(4,12).toString("ascii").startsWith("ftypavif")) ||
 ((/<svg(?:\s|>)/i.test(start)||/<\?xml/.test(start))&&/svg|xml/i.test(type));
};
function nameMatches(listing,google){
 const clean=s=>String(s||"").toLowerCase().replace(/&/g,"and").replace(/\b(billings|flooring|floor|home|design|center|of|the)\b/g,"").replace(/[^a-z0-9]/g,"");
 const a=clean(listing),b=clean(google);
 if(a&&b&&(a===b||a.includes(b)||b.includes(a)))return true;
 // An exact phone+official-domain match is accepted for location/branch naming
 // variants only when at least one distinctive company token overlaps.
 const stop=new Set(["billings","floor","flooring","floors","home","design","cabinet","company","center","the","of","one","and","modern","commercial"]);
 const terms=String(listing).toLowerCase().split(/[^a-z0-9]+/).filter(t=>t.length>=4&&!stop.has(t));
 return terms.some(t=>String(google).toLowerCase().includes(t));
}
async function main(){
 if(process.env.VERCEL_ENV!=="production"){console.log("FLOOR_IMPORT_RESULT",{skip:"notproduction"});return}
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY,g=process.env.GOOGLE_PLACES_API_KEY;
 if(!url||!key)throw Error("Production DB env missing");
 const sb=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data,error}=await sb.from("businesses").select("id,name,phone,website,category,logo_url,logo_verified,google_place_id,google_match_status").eq("category","flooring").order("id");
 if(error)throw Error("Flooring data unavailable");
 const records=[];
 for(const b of data){
  const result={id:b.id,name:b.name,logo:"not_checked",google:"not_checked"};
  if(b.logo_verified===true)result.logo="already_verified";
  else if(!expected[b.id])result.logo="manual_asset_review";
  else if(expected[b.id].name!==b.name||domain(b.website)!==expected[b.id].domain)result.logo="business_identity_changed";
  else {
   try{
    const res=await fetch(expected[b.id].asset,{signal:AbortSignal.timeout(12000),headers:{"User-Agent":"Mozilla/5.0","Accept":"image/png,image/jpeg,image/webp,image/svg+xml,*/*"}});
    if(!res.ok)throw Error("asset_http_"+res.status);
    const buf=Buffer.from(await res.arrayBuffer());
    if(!isImage(buf,res.headers.get("content-type")||""))throw Error("invalid_file");
    const {data:saved,error:writeError}=await sb.from("businesses")
      .update({logo_url:expected[b.id].asset,logo_verified:true})
      .eq("id",b.id).eq("name",b.name).or("logo_verified.is.null,logo_verified.eq.false").select("id").maybeSingle();
    if(writeError)throw Error("logo_write_failed");
    result.logo=saved?"saved":"concurrent_change";
   }catch(e){result.logo="skipped_"+String(e.message).slice(0,65)}
  }
  if(b.google_place_id)result.google="already_matched";
  else if(!g)result.google="no_google_api_key";
  else{
   try{
    const response=await fetch("https://places.googleapis.com/v1/places:searchText",{
     method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":g,
       "X-Goog-FieldMask":"places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.businessStatus"},
     body:JSON.stringify({textQuery:b.name+" Billings Montana",maxResultCount:6}),signal:AbortSignal.timeout(12000)});
    if(!response.ok)throw Error("google_http_"+response.status);
    const places=(await response.json()).places||[];
    const strong=places.filter(p=>p.id&&p.businessStatus==="OPERATIONAL"&&
     /\bBillings\b/i.test(p.formattedAddress||"")&&/\bMT\b/i.test(p.formattedAddress||"")&&
     digits(b.phone).length===10&&digits(p.nationalPhoneNumber)===digits(b.phone)&&
     !!domain(p.websiteUri)&&domain(p.websiteUri)===domain(b.website)&&
     nameMatches(b.name,p.displayName?.text||""));
    if(strong.length!==1){result.google=strong.length>1?"multiple_candidates":places.length?"review":"not_found"}
    else{
     const candidate=strong[0];
     const {data:used,error:dupError}=await sb.from("businesses").select("id").eq("google_place_id",candidate.id).neq("id",b.id).limit(1);
     if(dupError)throw Error("duplicate_check_failed");
     if(used?.length)result.google="place_already_used";
     else {
      const {data:saved,error:writeError}=await sb.from("businesses")
       .update({google_place_id:candidate.id,google_match_status:"matched",google_last_updated:new Date().toISOString()})
       .eq("id",b.id).is("google_place_id",null).select("id").maybeSingle();
      if(writeError)throw Error("google_write_failed");
      result.google=saved?"saved":"concurrent_change";
     }
    }
   }catch(e){result.google="skipped_"+String(e.message).slice(0,75)}
  }
  records.push(result);
  console.log("FLOOR_IMPORT_ITEM "+JSON.stringify(result));
 }
 console.log("FLOOR_IMPORT_RESULT "+JSON.stringify({total:data.length,logosSaved:records.filter(x=>x.logo==="saved").length,googleSaved:records.filter(x=>x.google==="saved").length,review:records.filter(x=>x.google==="review").map(x=>x.name),unverifiedLogos:records.filter(x=>x.logo!=="saved"&&x.logo!=="already_verified").map(x=>x.name)}));
}
main().catch(e=>{console.error("FLOOR_IMPORT_FATAL",String(e.message));process.exitCode=1});