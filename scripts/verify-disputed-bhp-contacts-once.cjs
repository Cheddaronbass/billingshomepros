// Read-only final check of official contact info and safe-link behavior.
const {createClient}=require("@supabase/supabase-js");
const endpoints=[
 "https://riverridgelandscape.com/",
 "https://www.riverridgelandscape.com/",
 "http://riverridgelandscape.com/",
 "http://www.riverridgelandscape.com/",
 "https://paintswellwithcolors.com/",
];
(async()=>{
 if(process.env.VERCEL_ENV!=="production"){console.log("BHP_CONTACT_VERIFY",{skip:"notproduction"});return}
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY,g=process.env.GOOGLE_PLACES_API_KEY;
 if(!url||!key)throw Error("Missing DB");
 const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data,error}=await db.from("businesses").select("id,name,phone,website,category,google_place_id").in("id",[72,88]);
 if(error)throw Error("Reading current listings failed");
 console.log("BHP_CONTACT_RECORDS "+JSON.stringify(data));
 const health=await Promise.all(endpoints.map(async p=>{
  try{
   const r=await fetch(p,{redirect:"follow",signal:AbortSignal.timeout(10500),headers:{"User-Agent":"Mozilla/5.0","Accept":"text/html"}});
   const html=r.ok&&(r.headers.get("content-type")||"").includes("text/html")?(await r.text()).slice(0,700000):"";
   const title=html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g," ").slice(0,130)||"";
   const nums=[...new Set([...(html.match(/(?:\+?1[\s-]?)?\(?406\)?[\s-.]*\d{3}[\s-.]*\d{4}/g)||[]),...(html.match(/tel:(?:\+?1)?406\d{7}/gi)||[])])].slice(0,12);
   const telLinks=[...new Set([...html.matchAll(/href=["'](tel:[^"']+)/gi)].map(x=>x[1]))].slice(0,12);
   return{url:p,http:r.status,final:r.url,title,nums,telLinks,containsOld:html.includes("530-1200"),containsNew:html.includes("630-6350")||html.includes("6306350")};
  }catch(e){return{url:p,error:String(e.message).slice(0,100)}}
 }));
 for(const h of health)console.log("BHP_CONTACT_SITE "+JSON.stringify(h));
 const p=data.find(x=>x.id===88);
 if(p?.google_place_id&&g){
  try{
   const r=await fetch("https://places.googleapis.com/v1/places/"+p.google_place_id,{headers:{"X-Goog-Api-Key":g,"X-Goog-FieldMask":"id,displayName,formattedAddress,nationalPhoneNumber,internationalPhoneNumber,websiteUri,businessStatus"},signal:AbortSignal.timeout(12000)});
   const body=await r.json();
   console.log("BHP_CONTACT_GOOGLE "+JSON.stringify({http:r.status,details:body}));
  }catch(e){console.log("BHP_CONTACT_GOOGLE "+JSON.stringify({error:String(e.message).slice(0,110)}))}
 }
 console.log("BHP_CONTACT_VERIFY "+JSON.stringify({sites:health.length}));
})().catch(e=>{console.error("BHP_CONTACT_VERIFY_FATAL",String(e.message));process.exitCode=1});