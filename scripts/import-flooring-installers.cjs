// Production-only, idempotent, source-checked Flooring launch seed.
// No materials-only suppliers. Do not overwrite existing verified profiles or create duplicates.
const fs=require("fs");
const {createClient}=require("@supabase/supabase-js");
const rows=JSON.parse(fs.readFileSync("data/flooring-installers-2026-10-23.json","utf8"));
const strip=s=>String(s||"").toLowerCase().replace(/[^a-z0-9]/g,"");
const phone=s=>String(s||"").replace(/\D/g,"").slice(-10);
const domain=s=>{try{return new URL(s).hostname.toLowerCase().replace(/^www\./,"")}catch{return""}};
const company=s=>String(s||"").toLowerCase()
 .replace(/\b(inc|llc|co|company|flooring|design|center|billings|mt|montana)\b/g,"")
 .replace(/[^a-z0-9]/g,"");
function same(a,b){
 const byPhone=phone(a.phone).length===10&&phone(a.phone)===phone(b.phone);
 const bySite=domain(a.website)&&domain(a.website)===domain(b.website);
 const byName=strip(a.name)===strip(b.name);
 return !!(byPhone||bySite||byName);
}
async function run(){
 if(process.env.VERCEL_ENV!=="production"){console.log("FLOORING_SEED",{skipped:"not_production"});return}
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,secret=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!secret)throw Error("Missing production database credentials");
 const db=createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});
 const existing=[];for(let i=0;i<10000;i+=1000){const {data,error}=await db.from("businesses").select("id,name,phone,website,category,services,claimed,featured,google_place_id").order("id").range(i,i+999);
 if(error)throw Error("Could not check existing businesses");existing.push(...data);if(data.length<1000)break}
 // Diagnostic only: do not merge/delete active contractor profiles or disturb public URLs.
 const dupes=[];
 for(let i=0;i<existing.length;i++)for(let j=i+1;j<existing.length;j++){
  const a=existing[i],b=existing[j];
  if(same(a,b))dupes.push({idA:a.id,idB:b.id,nameA:a.name,nameB:b.name,categoryA:a.category,categoryB:b.category,hasPlaceA:!!a.google_place_id,hasPlaceB:!!b.google_place_id});
 }
 console.log("BHP_DUPLICATE_REVIEW "+JSON.stringify(dupes.slice(0,30)));
 const counts={sourceQualified:rows.length,inserted:0,crossListed:0,alreadyPresent:0,blocked:0};
 const statuses=[];
 for(const candidate of rows){
  const matches=existing.filter(a=>same(a,candidate));
  if(matches.length>1){counts.blocked++;statuses.push({name:candidate.name,result:"multiple_existing_matches",ids:matches.map(a=>a.id)});continue}
  if(matches.length===1){
   const b=matches[0],services=[...new Set([...(Array.isArray(b.services)?b.services:[]),...candidate.services])];
   if(services.length===(b.services||[]).length){counts.alreadyPresent++;statuses.push({name:candidate.name,result:"already_present",id:b.id});continue}
   const {error}=await db.from("businesses").update({services}).eq("id",b.id);
   if(error)throw Error("Cross-list failed for "+candidate.name);
   b.services=services;counts.crossListed++;statuses.push({name:candidate.name,result:"cross_listed",id:b.id});continue
  }
  const b={name:candidate.name,phone:candidate.phone,website:candidate.website,description:candidate.description,category:"flooring",service_area:"Billings, Laurel and surrounding Yellowstone County, Montana",services:candidate.services,featured:false,claimed:false};
  const {data,error}=await db.from("businesses").insert(b).select("id,name,phone,website,category,services").single();
  if(error)throw Error("Insert failed for "+candidate.name+": "+error.message);
  existing.push(data);counts.inserted++;statuses.push({name:candidate.name,result:"inserted",id:data.id});
 }
 const {data:now,error:visibleError}=await db.from("businesses").select("id,name,phone,website,services,category").or('category.eq.flooring,services.cs.{"Flooring Installation"}').order("name");
 if(visibleError)throw Error("Flooring visibility check failed");
 const missing=rows.filter(row=>!now.some(b=>same(b,row)));
 console.log("FLOORING_SEED "+JSON.stringify({...counts,visibleTotal:now.length,missing:missing.map(x=>x.name),statuses}));
 if(missing.length||counts.blocked)throw Error("Flooring import has unresolved records; inspect before publishing homepage tile");
}
run().catch(e=>{console.error("FLOORING_SEED_FATAL",String(e.message));process.exitCode=1});