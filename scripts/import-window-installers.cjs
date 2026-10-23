// One-time, production-only idempotent import of source-checked window and door installers.
// Never place privileged keys in browser code or logging.
const fs=require("fs");
const {createClient}=require("@supabase/supabase-js");
const candidates=JSON.parse(fs.readFileSync("data/window-door-installers-2026-10-23.json","utf8"));
const strip=(s)=>String(s||"").toLowerCase().replace(/[^a-z0-9]+/g,"");
const normalizeName=(s)=>String(s||"").toLowerCase()
 .replace(/\b(incorporated|corporation|inc|llc|company|co|of|the|montana|billings)\b/g,"")
 .replace(/[^a-z0-9]+/g,"");
const phone=(s)=>String(s||"").replace(/\D/g,"").slice(-10);
function domain(s){try{return new URL(s).hostname.replace(/^www\./,"").toLowerCase()}catch{return ""}}
function matched(a,b){
 const aName=normalizeName(a.name),bName=normalizeName(b.name);
 return (aName===bName)||
 (aName.length>11&&bName.length>11&&(aName.startsWith(bName)||bName.startsWith(aName)))||
 (!!a.phone&&!!b.phone&&phone(a.phone)===phone(b.phone))||
 (!!a.website&&!!b.website&&domain(a.website)===domain(b.website));
}
async function main(){
 if(process.env.VERCEL_ENV!=="production")throw Error("Refusing importer outside production");
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL, secret=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!secret)throw Error("Missing production database credentials");
 const sb=createClient(url,secret,{auth:{autoRefreshToken:false,persistSession:false}});
 const existing=[];
 for(let i=0;i<10000;i+=1000){
  const {data,error}=await sb.from("businesses").select("id,name,phone,website,category,services").order("id").range(i,i+999);
  if(error)throw new Error("Existing listing check failed: "+error.message);
  existing.push(...(data||[]));
  if(!data||data.length<1000)break;
 }
 let inserted=0,tagged=0,already=0;
 for(const c of candidates){
  const match=existing.find(b=>matched(b,c));
  if(match){
   const services=[...new Set([...(match.services||[]),...c.services])];
   if(services.length===(match.services||[]).length){already++;continue}
   const {error}=await sb.from("businesses").update({services}).eq("id",match.id);
   if(error)throw new Error("Failed to cross-list "+c.name+": "+error.message);
   match.services=services;tagged++;
  } else {
   const row={name:c.name,phone:c.phone,website:c.website,description:c.description,
    category:"windows-doors",service_area:"Billings, Laurel and surrounding Yellowstone County, Montana",
    services:c.services,featured:false,claimed:false};
   const {data,error}=await sb.from("businesses").insert(row).select("id,name,phone,website,category,services").single();
   if(error)throw new Error("Failed to add "+c.name+": "+error.message);
   existing.push(data);inserted++;
  }
 }
 const {data:visible,error:visibleError}=await sb.from("businesses").select("id,name,phone,website,category,services")
  .or('category.eq.windows-doors,services.cs.{"Windows & Doors"}')
  .order("name");
 if(visibleError)throw new Error("Window directory visibility check failed: "+visibleError.message);
 const missing=candidates.filter(c=>!visible.some(b=>matched(b,c)));
 console.log("WINDOW_IMPORT_RESULT",JSON.stringify({sourceQualified:candidates.length,inserted,existingUpdated:tagged,alreadyTagged:already,visibleTotal:visible.length,missing:missing.map(c=>c.name)}));
 if(missing.length>0)throw new Error("Not all qualified installers visible");
}
main().catch(err=>{console.error("WINDOW_IMPORT_FAILED",err.message);process.exitCode=1;});
