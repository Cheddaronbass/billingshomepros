// One-time guarded import of logo images actually published by roofing firms.
// Refuses to overwrite verified branding; checks official domains and file bytes.
const {createClient}=require("@supabase/supabase-js");
const jobs=[
 {id:42,name:"Lyman Exteriors LLC",domain:"lymanexteriors.com",asset:"https://irp.cdn-website.com/7cb11f54/dms3rep/multi/opt/LOGO-261w.png"},
 {id:41,name:"Sterling Roofing",domain:"sterlingroofingmt.com",asset:"https://sterlingroofingmt.com/Media%20(SRM)/Logo%20Suite%20(SRM)/(Horizontal%20SRG%20White%20BG)%20STERLING.jpg"},
 {id:43,name:"Wegner Roofing & Solar",domain:"wegnerroofing.com",asset:"https://wegnerroofing.com/wp-content/uploads/2026/04/wegner-logo-new-scaled.png"},
 {id:50,name:"MJB Trades Roofing & Siding",domain:"mjbtrades.com",asset:"https://le-cdn.hibuwebsites.com/3723ed0036464f1dbdbdf30a280539d1/dms3rep/multi/opt/logo-mjb-trades-roofing-and-siding-118w.png"},
 {id:51,name:"YellowBall Roofing & Solar",domain:"goyellowball.com",asset:"https://goyellowball.com/wp-content/uploads/2025/09/YellowBall-Logo-600-1.webp"},
 {id:46,name:"Built Wright Homes",domain:"builtwright.com",asset:"https://builtwright.com/wp-content/uploads/2021/08/logo-alt-368x260-1.png"},
 {id:45,name:"Great White Construction",domain:"greatwhiteconstruction.org",asset:"https://greatwhiteconstruction.org/__l5e/assets-v1/2b60c5c0-15fe-400a-980e-f999deb9c12a/gwc-logo.png"}
];
const domain=s=>{try{return new URL(s).hostname.toLowerCase().replace(/^www\./,"")}catch{return""}};
const imageHeader=b=>
 (b[0]===137&&b[1]===80&&b[2]===78&&b[3]===71) ||
 (b[0]===255&&b[1]===216&&b[2]===255) ||
 (b.subarray(0,4).toString("ascii")==="RIFF"&&b.subarray(8,12).toString("ascii")==="WEBP");
async function run(){
 if(process.env.VERCEL_ENV!=="production"){console.log("ROOFING_LOGO_IMPORT "+JSON.stringify({skip:"not_production"}));return}
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key){console.log("ROOFING_LOGO_IMPORT "+JSON.stringify({skip:"db_credentials_missing_in_build"}));return}
 const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const results=[];
 for(const job of jobs){
  try{
   const {data:b,error:readError}=await db.from("businesses")
     .select("id,name,website,category,logo_verified").eq("id",job.id).single();
   if(readError||!b||b.name!==job.name||b.category!=="roofing"||domain(b.website)!==job.domain) throw Error("listing_identity_changed");
   if(b.logo_verified===true){results.push({name:job.name,status:"already_verified"});continue}
   const response=await fetch(job.asset,{headers:{"User-Agent":"Mozilla/5.0","Accept":"image/png,image/webp,image/jpeg,*/*"},redirect:"follow",signal:AbortSignal.timeout(12000)});
   if(!response.ok) throw Error("image_http_"+response.status);
   const body=Buffer.from(await response.arrayBuffer());
   if(body.length<100||body.length>3_000_000||!imageHeader(body)) throw Error("invalid_image_content_"+body.length);
   const {data:saved,error:saveError}=await db.from("businesses")
     .update({logo_url:job.asset,logo_verified:true})
     .eq("id",job.id).eq("name",job.name).eq("category","roofing")
     .or("logo_verified.is.null,logo_verified.eq.false").select("id,logo_verified").maybeSingle();
   if(saveError) throw Error("db_write_failed");
   results.push({name:job.name,status:saved?.logo_verified?"saved":"concurrent_change"});
  }catch(e){results.push({name:job.name,status:"skipped",reason:String(e.message).slice(0,100)})}
 }
 console.log("ROOFING_LOGO_IMPORT "+JSON.stringify({attempted:jobs.length,saved:results.filter(z=>z.status==="saved").length,results}));
}
run().catch(e=>{console.error("ROOFING_LOGO_IMPORT_FATAL",e.message);process.exitCode=1});