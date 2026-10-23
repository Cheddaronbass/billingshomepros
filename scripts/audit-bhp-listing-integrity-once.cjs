// One-time read-only integrity report for BHP listing data.
// Checks structure and duplicate identity; does not guess or modify contractors.
const {createClient}=require("@supabase/supabase-js");
const validCategories=new Set(["plumbing","hvac","electrical","roofing","contractors-remodeling","landscaping","painting","flooring","concrete","fencing","windows-doors","handyman"]);
const domain=s=>{try{const u=new URL(s);return /https?:/.test(u.protocol)?u.hostname.replace(/^www\./,"").toLowerCase():""}catch{return""}};
const phone=s=>String(s||"").replace(/\D/g,"").slice(-10);
(async()=>{
if(process.env.VERCEL_ENV!=="production"){console.log("BHP_INTEGRITY_SUMMARY "+JSON.stringify({skipped:"notproduction"}));return}
const url=process.env.NEXT_PUBLIC_SUPABASE_URL,secret=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url||!secret){console.log("BHP_INTEGRITY_SUMMARY "+JSON.stringify({skipped:"db_env_missing"}));return}
const db=createClient(url,secret,{auth:{autoRefreshToken:false,persistSession:false}});
const rows=[];
for(let offset=0;offset<5000;offset+=1000){
 const {data,error}=await db.from("businesses").select("id,name,phone,website,category,services,logo_verified,logo_url,google_place_id,google_match_status,featured,claimed,lead_email_verified").order("id").range(offset,offset+999);
 if(error)throw Error("listing read failed: "+error.code);
 rows.push(...data);if(data.length<1000)break;
}
const categories={};const issues=[];
const add=(kind,row,info)=>issues.push({type:kind,id:row.id,name:row.name,category:row.category,...(info?{detail:info}:{})});
for(const b of rows){
 if(!categories[b.category])categories[b.category]={total:0,withPhones:0,withWebsites:0,withLogos:0,withGoogle:0};
 const c=categories[b.category];c.total++;
 if(!b.name||b.name.trim().length<3)add("blank_or_short_name",b);
 if(!validCategories.has(b.category))add("unknown_primary_category",b);
 if(b.phone){
  if(phone(b.phone).length===10)c.withPhones++;else add("invalid_phone",b);
 }else add("missing_phone",b);
 if(b.website){
  if(domain(b.website))c.withWebsites++;else add("bad_website_url",b);
 }else add("missing_website",b);
 if(!Array.isArray(b.services)||!b.services.length)add("missing_services",b);
 if(b.logo_verified===true){c.withLogos++;if(!b.logo_url)add("verified_logo_missing_url",b);}
 if(b.google_place_id){
  c.withGoogle++;if(b.google_match_status!=="matched")add("google_id_status_mismatch",b);
 }else if(b.google_match_status==="matched")add("matched_status_missing_place_id",b);
 if(b.lead_email_verified&&b.claimed!==true)add("verified_lead_email_on_unclaimed",b);
}
const duplicates=[];
for(let i=0;i<rows.length;i++){
 const a=rows[i],aDomain=domain(a.website),aPhone=phone(a.phone);
 for(let j=i+1;j<rows.length;j++){
  const b=rows[j],bDomain=domain(b.website),bPhone=phone(b.phone);
  const byPhone=aPhone.length===10&&aPhone===bPhone,byDomain=!!aDomain&&aDomain===bDomain;
  if(byPhone&&byDomain)duplicates.push({ids:[a.id,b.id],names:[a.name,b.name],categories:[a.category,b.category],bothClaimed:[a.claimed,b.claimed],bothFeatured:[a.featured,b.featured]});
 }
}
const errors=issues.reduce((acc,x)=>{acc[x.type]=(acc[x.type]||0)+1;return acc},{});
console.log("BHP_INTEGRITY_SUMMARY "+JSON.stringify({total:rows.length,categories,issueTypes:errors,duplicatePairs:duplicates.length}));
for(const item of issues)console.log("BHP_INTEGRITY_ISSUE "+JSON.stringify(item));
for(const item of duplicates)console.log("BHP_INTEGRITY_DUPLICATE "+JSON.stringify(item));
})().catch(e=>{console.error("BHP_INTEGRITY_FATAL",String(e.message));process.exitCode=1});
