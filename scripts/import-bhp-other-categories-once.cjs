// One-time authenticated production audit/import for the remaining BHP categories.
// Official-site logo assets were human-selected from earlier read-only source scan.
// Never replace previously verified logos, invent Google IDs, or repeat completed matches.
const {createClient}=require("@supabase/supabase-js");
const categories=["plumbing","hvac","electrical","contractors-remodeling","landscaping","painting","fencing","handyman","concrete"];
const logoJobs=[
[4,"Houser Plumbing LLC","houserplumbing.com","https://images.squarespace-cdn.com/content/v1/67c8e83ff30a5f5b5ac77b51/04600194-6131-4c0d-93a0-0833b5ca9581/houser-logo.png?format=1500w"],
[6,"Rimrock Plumbing","rimrockplumbing.com","https://irp.cdn-website.com/4b1b82c8/dms3rep/multi/opt/Rimrock-Plumbing-Logo1-272w.png"],
[8,"Brown Plumbing & Heating","brownplbg.com","https://brownplbg.com/wp-content/uploads/2026/03/logo-brown-black-2026.png"],
[11,"Williams Plumbing","service.willplumb.com","https://service.willplumb.com/billingsmt/img/williams-header-logo-billings.png"],
[15,"Prime Plumbing","primeph.com","https://primeph.com/images/prime/logo-full-dark-v1.svg"],
[19,"Homey Solutions","homeysolutionsinc.com","https://homeysolutionsinc.com/wp-content/uploads/2026/05/HOMEY_Logo_1st_K.png"],
[23,"Conditioned Air Systems","casmontana.com","https://images.squarespace-cdn.com/content/v1/65cfd5053921ea6aa4e2dda5/5b6d0246-ad40-4361-b292-4a43a2b31619/Conditioned+Air+Systems+Logo+no+bckgnd+header+logo.png?format=1500w"],
[24,"Encode Corporation","encodecorp.com","https://irp.cdn-website.com/0826fe10/dms3rep/multi/opt/Untitled-design---2026-07-09T132043.408-1120ac1c-1920w.png"],
[25,"White Heating & Air Conditioning","whitehvac.com","https://whitehvac.com/wp-content/themes/roots/assets/img/logo.svg"],
[26,"Central Heating & Air Conditioning","centralheatingandairmt.com","https://cdn-ilckdph.nitrocdn.com/aAANSjmbVpXdIIskPWBPsHguiraugLkK/assets/images/optimized/rev-819624b/centralheatingandairmt.com/wp-content/uploads/logo.svg"],
[28,"Tounsley Electric Inc.","tounsleyelectric.com","https://irp.cdn-website.com/d874547c/dms3rep/multi/opt/scraped-sites/tounsleyelectric/scraped/images/logos/header-logo-143h.jpg"],
[29,"Icon Electric","iconelectricmt.com","https://static.wixstatic.com/media/48c28f_e8f24889e3884acfbbe3ebd48facaa6d~mv2.png"],
[31,"Brighten, Inc.","brighteninc.net","https://brighteninc.net/images/img_HR9mJAYm5H6kceKA1SUnsx/logo.png"],
[32,"Town & Country Electric LLC","town-countryelectric.com","https://town-countryelectric.com/assets/logo.png"],
[38,"Rimrock Electric","rimrockelectric.com","https://rimrockelectric.com/wp-content/uploads/2022/09/RimrockElectric-logo.webp"],
[52,"Freyenhagen Construction","freyenhagenconstruction.com","https://freyenhagenconstruction.com/wp-content/uploads/Freyenhagen-Logo.png"],
[55,"Weber Construction Inc.","weberconstructionmt.com","https://irp.cdn-website.com/a9c57a74/dms3rep/multi/opt/weberlogo+copy-315w.png"],
[58,"Yellowstone Basin Construction","ybconstruction.com","https://irp.cdn-website.com/bce92c2f/dms3rep/multi/opt/Yellowstone-Basin-Construction-logo-1920w-1920w.webp"],
[59,"Pinnacle Remodeling","pinnacleremodels.com","https://pinnacleremodels.com/wp-content/uploads/2025/09/desktop-logo-b.png"],
[61,"Stapleton Construction","stapletonconstructionmt.com","https://irp.cdn-website.com/3094d3b0/dms3rep/multi/opt/scraped-sites/stapletonconstructionmt/scraped/images/logos/header-logo-238w.png"],
[73,"Sylvan Nursery & Landscaping","sylvannursery-mt.com","https://i0.wp.com/sylvannursery-mt.com/wp-content/uploads/2016/03/125logo.jpg?fit=244%2C125&ssl=1"],
[74,"H2 Lawn & Snow INC","h2lawnandsnow.com","https://img1.wsimg.com/isteam/ip/b3aa3dc0-2172-4bf7-af20-f70349c3c7aa/h2.png/:/rs=h:200,cg:true,m/qt=q:95"],
[76,"The Grounds Guys of Billings","groundsguys.com","https://www.groundsguys.com/locations/wp-content/themes/nbly/brands/guy/images/brand-logo.svg"],
[78,"Celtic Contracting","celticcontractingmt.com","https://images.squarespace-cdn.com/content/v1/65c7a87ad442ed20ff4583e9/8841936a-5cab-4968-8328-7293417f0d73/logo_transparent_background.png?format=1500w"],
[80,"Paintegrity","paintegritymt.com","https://paintegritymt.com/files/2020/12/Paintegrity_LOGO.png"],
[81,"Caution Wet Paint LLC","cautionwetpaintmt.com","https://www.cautionwetpaintmt.com/images/logo.png"],
[83,"MT Buckets Painting","mtbuckets.com","https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/prgFAy86szraKEbckYqd/media/c1d1b581-0ee5-4ad3-9ff0-ff9d08f88436.png"],
[85,"All Star Painting","billingsmtpainters.net","https://img1.wsimg.com/isteam/ip/d9255543-ae36-4fae-988e-450c4287abe4/All%20Star%20Painting%20Logo%20Official.png/:/rs=h:200,cg:true,m/qt=q:95"],
[86,"Matt the Painter","mattthepainter.com","https://d2if3j13w19mqs.cloudfront.net/6aa2a12e23d85fb823b097fb/mattthepainter.com/images/9e8485d7e4379f7f1f86024fadd9886e1cc9afd54f08b4bf5f8ca3ef3a8a4dfb.webp"],
[89,"Top Line Concrete","billingsconcretesolutions.com","https://i.ibb.co/fqgZ0NQ/Top-Line-Concrete.png"],
[97,"AGC Construction","agcconstructionmt.com","https://irp.cdn-website.com/25f643e1/dms3rep/multi/opt/Logo2-378w.png"],
[98,"Top Quality Builders","tqb406.com","https://tqb406.com/wp-content/uploads/2024/07/top-quality-builders_logo-1.png"],
[100,"Billings Fencing Company","billingsfencebuilder.com","https://i.ibb.co/zP90BJt/Billings-Fencing-Company.png"],
[101,"Absolute Fence","absolutefence.com","https://absolutefence.com/images/logo-footer.png"],
[103,"Jares Fence Company, Inc.","jaresfence.com","https://irp.cdn-website.com/88e91aea/dms3rep/multi/opt/scraped-sites/jaresfence/scraped/images/logos/header-logo-261w.png"],
[105,"SDK Custom Fencing LLC","sdkcustomfencing.com","https://www.sdkcustomfencing.com/wp-content/uploads/cropped-3A21E369-DDAB-4B8F-A53D-CD093B1190AF-1.jpg"],
[109,"Homewerx Services","homewerxservices.com","https://static.wixstatic.com/media/d78075_b3d17666933e4955a8e608c1a72604f2~mv2.png"],
[111,"Handy Home Services","handyhome-services.com","https://img1.wsimg.com/isteam/ip/e5d38d3a-17ba-4008-9681-41db9b628fe9/handyhome%20logo2.jpg/:/rs=h:1000,cg:true,m"],
[115,"A&M Mobile Handyman","ammobilehandyman.com","https://www.ammobilehandyman.com/media/images/hLogo.png"],
[116,"Zeus Home Repair","zeushomerepair.com","https://images.squarespace-cdn.com/content/v1/68c42468374c64789ea705ab/120dbf91-d3ee-42e3-9d0c-1c08b2157e37/Zeus+home+repair+logo.jpg?format=1500w"],
[117,"Weber Construction Inc.","weberconstructionmt.com","https://irp.cdn-website.com/a9c57a74/dms3rep/multi/opt/weberlogo+copy-315w.png"]
];
const domain=s=>{try{return new URL(s).hostname.toLowerCase().replace(/^www\./,"")}catch{return""}};
const cleanName=s=>String(s||"").toLowerCase().replace(/&/g,"and").replace(/\b(incorporated|inc|llc|ltd|corp|corporation|co|company)\b/g,"").replace(/[^a-z0-9]/g,"");
const digits=s=>String(s||"").replace(/\D/g,"").slice(-10);
function validImage(buf,type){
 if(buf.length<100||buf.length>4_000_000)return false;
 const text=buf.subarray(0,400).toString("utf8").trimStart();
 return (buf[0]===137&&buf[1]===80&&buf[2]===78&&buf[3]===71)||
 (buf[0]===255&&buf[1]===216&&buf[2]===255)||
 (buf.subarray(0,4).toString("ascii")==="RIFF"&&buf.subarray(8,12).toString("ascii")==="WEBP")||
 (buf.subarray(4,12).toString("ascii").startsWith("ftypavif"))||
 (/<svg(?:\s|>)/i.test(text)||/<\?xml/.test(text)&&/svg/i.test(type));
}
async function pool(items,max,work){
 const results=[];for(let start=0;start<items.length;start+=max){
  const batch=await Promise.all(items.slice(start,start+max).map(async(item)=>work(item)));
  results.push(...batch);
 }return results;
}
async function main(){
 if(process.env.VERCEL_ENV!=="production"){console.log("BHP_CATEGORY_IMPORT",{skip:"nonproduction"});return}
 const u=process.env.NEXT_PUBLIC_SUPABASE_URL,k=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY,g=process.env.GOOGLE_PLACES_API_KEY;
 if(!u||!k){console.log("BHP_CATEGORY_IMPORT",{skip:"no_production_database"});return}
 const db=createClient(u,k,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data,error}=await db.from("businesses").select("id,name,phone,website,category,google_place_id,google_match_status,logo_verified").in("category",categories).order("id");
 if(error)throw Error("Cannot read BHP listings");
 const byId=new Map(data.map(x=>[x.id,x]));
 const logos=await pool(logoJobs,8,async([id,name,expectedDomain,asset])=>{
  const b=byId.get(id);
  if(!b||b.name!==name||domain(b.website)!==expectedDomain)return {id,name,status:"skipped_identity"};
  if(b.logo_verified===true)return {id,name,status:"already_done"};
  try{
   const resp=await fetch(asset,{signal:AbortSignal.timeout(10000),redirect:"follow",headers:{"User-Agent":"Mozilla/5.0","Accept":"image/png,image/svg+xml,image/webp,image/jpeg,image/avif,*/*"}});
   if(!resp.ok)return {id,name,status:"http_"+resp.status};
   const binary=Buffer.from(await resp.arrayBuffer());
   if(!validImage(binary,resp.headers.get("content-type")||""))return {id,name,status:"invalid_image"};
   const {data:saved,error:writeError}=await db.from("businesses").update({logo_url:asset,logo_verified:true})
    .eq("id",id).eq("name",name).or("logo_verified.is.null,logo_verified.eq.false").select("id").maybeSingle();
   if(writeError)throw Error("save_logo_failed");
   return {id,name,status:saved?"saved":"concurrent_change"};
  }catch(e){return {id,name,status:"error",detail:String(e.message).slice(0,70)}}
 });
 for(const entry of logos)console.log("BHP_CATEGORY_LOGO "+JSON.stringify(entry));
 console.log("BHP_CATEGORY_LOGO_SUMMARY "+JSON.stringify({attempted:logoJobs.length,saved:logos.filter(x=>x.status==="saved").length,unmodified:logos.filter(x=>x.status!=="saved").length}));

 if(!g){console.log("BHP_CATEGORY_GOOGLE_SUMMARY "+JSON.stringify({skipped:"missing_google_key"}));return}
 const missing=data.filter(x=>!x.google_place_id);
 const matched=await pool(missing,5,async(b)=>{
  if(digits(b.phone).length!==10)return {id:b.id,category:b.category,name:b.name,status:"missing_phone"};
  try{
   const r=await fetch("https://places.googleapis.com/v1/places:searchText",{
    method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":g,
    "X-Goog-FieldMask":"places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.businessStatus"},
    body:JSON.stringify({textQuery:b.name+" Billings MT",maxResultCount:5}),signal:AbortSignal.timeout(9000)});
   if(!r.ok)throw Error("google_http_"+r.status);
   const places=(await r.json()).places||[];
   const exact=places.find(p=>p.id&&p.businessStatus==="OPERATIONAL"&&
       cleanName(p.displayName?.text)===cleanName(b.name)&&
       digits(p.nationalPhoneNumber)===digits(b.phone)&&
       /\b(Billings|Laurel)\b/i.test(p.formattedAddress||"")&&
       /\b(MT|Montana)\b/i.test(p.formattedAddress||""));
   if(!exact)return {id:b.id,category:b.category,name:b.name,status:places.length?"review":"not_found"};
   const {data:already,error:dupError}=await db.from("businesses").select("id").eq("google_place_id",exact.id).neq("id",b.id).limit(1);
   if(dupError)throw Error("duplicate_check_failed");
   if(already?.length)return {id:b.id,category:b.category,name:b.name,status:"duplicate_place"};
   const {data:saved,error:writeError}=await db.from("businesses").update({
     google_place_id:exact.id,google_match_status:"matched",google_last_updated:new Date().toISOString()
    }).eq("id",b.id).is("google_place_id",null).select("id").maybeSingle();
   if(writeError)throw Error("save_google_failed");
   return {id:b.id,category:b.category,name:b.name,status:saved?"matched":"concurrent_change"};
  }catch(e){return {id:b.id,category:b.category,name:b.name,status:"error",detail:String(e.message).slice(0,70)}}
 });
 for(const entry of matched)console.log("BHP_CATEGORY_GOOGLE "+JSON.stringify(entry));
 const summary=categories.map(cat=>({cat,checked:matched.filter(x=>x.category===cat).length,added:matched.filter(x=>x.category===cat&&x.status==="matched").length}));
 console.log("BHP_CATEGORY_GOOGLE_SUMMARY "+JSON.stringify({checked:missing.length,matched:matched.filter(x=>x.status==="matched").length,review:matched.filter(x=>x.status==="review").length,notFound:matched.filter(x=>x.status==="not_found").length,errors:matched.filter(x=>x.status==="error").length,byCategory:summary}));
}
main().catch(e=>{console.error("BHP_CATEGORY_IMPORT_FATAL",String(e.message));process.exitCode=1});