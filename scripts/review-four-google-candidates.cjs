// Temporary read-only diagnostic. No DB updates or admin secrets logged.
const {createClient}=require("@supabase/supabase-js");
const digits=s=>String(s||"").replace(/\D/g,"").slice(-10);
const targets=[
 {name:"Pella Windows & Doors of Billings",queries:["Pella Window and Door Showroom of Billings 2520 Grand Avenue MT","Pella Windows and Doors 2520 Grand Ave Billings MT"]},
 {name:"Exterior Design Solutions",queries:["Exterior Design Solutions LLC 1834 Grand Avenue Billings MT","Exterior Design Solutions Billings Montana"]},
 {name:"Smith & Company",queries:["Smith and Company Construction and Design 1220 Weil St Billings MT","Smith & Company Construction 1220 Weil Billings MT"]},
 {name:"Asphalt Plus Inc.",queries:["Asphalt Plus Inc 425 Johnson Ln Billings MT","Asphalt Plus API Billings Montana"]}
];
(async()=>{
 if(process.env.VERCEL_ENV!=="production"){console.log("FOUR_GOOGLE_REVIEW",JSON.stringify({skip:"nonproduction"}));return}
 const dbUrl=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY,googleKey=process.env.GOOGLE_PLACES_API_KEY;
 if(!dbUrl||!key||!googleKey){console.log("FOUR_GOOGLE_REVIEW",JSON.stringify({skip:"credentials_missing_in_build"}));return}
 const db=createClient(dbUrl,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data:rows,error}=await db.from("businesses").select("id,name,phone,website,google_match_status,google_place_id").in("name",targets.map(t=>t.name));
 if(error)throw Error("Unable to fetch target records "+error.code);
 const out=[];
 for(const t of targets){
   const b=rows.find(x=>x.name===t.name);
   if(!b){out.push({name:t.name,error:"missing_business"});continue}
   const found=new Map(),queryErrors=[];
   for(const q of t.queries){
     try{
       const response=await fetch("https://places.googleapis.com/v1/places:searchText",{
         method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":googleKey,
         "X-Goog-FieldMask":"places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.businessStatus,places.rating,places.userRatingCount"},
         body:JSON.stringify({textQuery:q,maxResultCount:5}),signal:AbortSignal.timeout(12000)
       });
       if(!response.ok){queryErrors.push(response.status);continue}
       const results=(await response.json()).places||[];
       for(const p of results){if(!p.id)continue; found.set(p.id,{id:p.id,name:p.displayName?.text||"",address:p.formattedAddress||"",phone:p.nationalPhoneNumber||"",website:p.websiteUri||"",status:p.businessStatus||"",rating:p.rating??null,count:p.userRatingCount??null,phoneMatches:digits(p.nationalPhoneNumber)===digits(b.phone)&&digits(b.phone).length===10});}
     }catch(e){queryErrors.push(String(e.message).slice(0,80))}
   }
   out.push({name:b.name,id:b.id,phone:b.phone,website:b.website,currentStatus:b.google_match_status,candidates:[...found.values()].slice(0,8),queryErrors});
 }
 console.log("FOUR_GOOGLE_REVIEW "+JSON.stringify(out));
})().catch(e=>{console.error("FOUR_GOOGLE_REVIEW_FATAL",String(e.message));process.exitCode=1});
