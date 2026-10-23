// Read-only production audit for existing Flooring listings.
// No business records modified. Google details and logo sources stay server-side.
const {createClient}=require("@supabase/supabase-js");
const domain=s=>{try{return new URL(s).hostname.toLowerCase().replace(/^www\./,"")}catch{return""}};
const phone=s=>String(s||"").replace(/\D/g,"").slice(-10);
const abs=(s,b)=>{try{const u=new URL(String(s||"").replace(/&amp;/g,"&"),b);return /^https?:/.test(u.protocol)?u.href:""}catch{return""}};
const attr=(t,n)=>t.match(new RegExp("\\b"+n+"\\s*=\\s*([\"'])(.*?)\\1","i"))?.[2]||"";
async function inspectWebsite(b){
 if(!b.website)return {error:"no_official_site"};
 try{
  const r=await fetch(b.website,{headers:{"User-Agent":"Mozilla/5.0","Accept":"text/html"},signal:AbortSignal.timeout(13000)});
  if(!r.ok)return {error:"site_http_"+r.status};
  const html=(await r.text()).slice(0,1100000), candidates=[];
  for(const m of html.matchAll(/<(?:img|source)\b[^>]{1,2500}>/gi)){
   const tag=m[0],alt=attr(tag,"alt"),cls=attr(tag,"class"),id=attr(tag,"id"),src=attr(tag,"src")||attr(tag,"data-src")||attr(tag,"data-lazy-src")||attr(tag,"srcset").split(/\s+/)[0];
   if(!src||src.startsWith("data:"))continue;
   const url=abs(src,r.url);
   const mark=[alt,cls,id,src].join(" ");
   if(!url||!/logo|brand|identity|masthead/i.test(mark))continue;
   if(/BBB|reviews|yelp|google|manufactur|carpet_one_brand|vendor|facebook|pinterest/i.test(mark))continue;
   candidates.push({url:url.slice(0,310),alt:alt.slice(0,110),className:cls.slice(0,80)});
  }
  for(const m of html.matchAll(/<(?:meta|link)\b[^>]*>/gi)){
   const t=m[0];if(!/og:image|twitter:image|icon/i.test(t))continue;
   const loc=attr(t,"content")||attr(t,"href");if(/logo/i.test(loc))candidates.push({url:abs(loc,r.url).slice(0,310),source:"meta"});
  }
  const unique=[...new Map(candidates.map(x=>[x.url,x])).values()].slice(0,9);
  return {siteStatus:r.status,finalDomain:domain(r.url),logos:unique};
 }catch(e){return {error:String(e.message).slice(0,80)}}
}
async function inspectGoogle(b,key){
 if(!key)return {error:"google_key_missing"};
 try{
  const requests=[b.name+" Billings Montana"];
  const all=new Map();
  for(const query of requests){
   const r=await fetch("https://places.googleapis.com/v1/places:searchText",{
    method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":key,"X-Goog-FieldMask":"places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.businessStatus,places.rating,places.userRatingCount"},
    body:JSON.stringify({textQuery:query,maxResultCount:6}),signal:AbortSignal.timeout(12000)});
   if(!r.ok)return {error:"google_http_"+r.status};
   for(const p of (await r.json()).places||[]){
    if(!p.id)continue;
    all.set(p.id,{placeId:p.id,name:p.displayName?.text||"",address:p.formattedAddress||"",phone:p.nationalPhoneNumber||"",website:p.websiteUri||"",status:p.businessStatus||"",phoneMatch:phone(p.nationalPhoneNumber).length===10&&phone(p.nationalPhoneNumber)===phone(b.phone),domainMatch:!!domain(p.websiteUri)&&domain(p.websiteUri)===domain(b.website),rating:p.rating??null,reviewCount:p.userRatingCount??null});
   }
  }
  return {places:[...all.values()].slice(0,6)};
 }catch(e){return {error:String(e.message).slice(0,80)}}
}
async function main(){
 if(process.env.VERCEL_ENV!=="production"){console.log("FLOOR_AUDIT",{skipped:"notproduction"});return}
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,secret=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY,key=process.env.GOOGLE_PLACES_API_KEY;
 if(!url||!secret)throw Error("Production DB credentials missing");
 const db=createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data,error}=await db.from("businesses").select("id,name,category,phone,website,logo_url,logo_verified,google_place_id,google_match_status").eq("category","flooring").order("id");
 if(error)throw Error("Failed to load flooring records");
 for(let i=0;i<data.length;i+=3){
  const results=await Promise.all(data.slice(i,i+3).map(async b=>{
   const base={id:b.id,name:b.name,phone:b.phone,website:b.website,logoVerified:b.logo_verified===true,existingLogo:!!b.logo_url,googleMatched:!!b.google_place_id,googleStatus:b.google_match_status};
   const site=await inspectWebsite(b);
   const google=b.google_place_id?{skipped:"already_matched"}:await inspectGoogle(b,key);
   return {...base,site,google};
  }));
  results.forEach(r=>console.log("FLOOR_AUDIT_ITEM "+JSON.stringify(r)));
 }
 console.log("FLOOR_AUDIT_SUMMARY "+JSON.stringify({total:data.length,verifiedLogos:data.filter(x=>x.logo_verified===true).length,matchedGoogle:data.filter(x=>x.google_place_id).length}));
}
main().catch(e=>{console.error("FLOOR_AUDIT_FATAL",String(e.message));process.exitCode=1});