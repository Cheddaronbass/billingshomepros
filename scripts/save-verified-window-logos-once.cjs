// One-time, production-only: use official business-site images, never invented artwork.
// Entries were manually reviewed against image tags on the business's own homepage.
const {createClient}=require("@supabase/supabase-js");
const jobs=[
 [48,"A-Team Roofing & Solar","ateamroofingandsolar.com","https://ateamroofingandsolar.com/wp-content/uploads/2021/11/A-Team-Roofing-Solar-Logos-03.png"],
 [49,"Big Sky Exterior Designs and Bath Solutions","bigskyed.com","https://bigskyed.com/wp-content/themes/bigsky-theme/assets/images/logo.png"],
 [110,"Clean Cut Handyman LLC","cleancuthandymanllc.com","https://cleancuthandymanllc.com/wp-content/uploads/2024/11/clean-cut-handyman-llc-logo.webp"],
 [120,"Billings Window & Door","billingswindowanddoor.net","https://www.billingswindowanddoor.net/wp-content/themes/bwd/assets/images/bwd_logo_header.svg"],
 [123,"Benchmark Window & Door","benchmarkwindow.com","https://le-cdn.hibuwebsites.com/f24d4bfdb7b04e10a3dd2a71916cac7b/dms3rep/multi/opt/logo-benchmark-window-and-door-223w.jpg"],
 [125,"Renewal by Andersen of Montana","rbamontana.com","https://www.rbamontana.com/wp-content/uploads/2021/03/renewal-by-andersen-of-montana-logo.png"],
 [128,"C's Exterior Designs","iwantwindows.com","https://iwantwindows.com/wp-content/uploads/2023/02/logo-200x88-1.webp"],
 [129,"DaBella","dabella.us","https://dabella.us/nitropack_static/OtcHMkfbRmXAvekCYjMASHyUaumEeJiO/assets/images/source/rev-6fa49c8/dabella.us/wp-content/uploads/2023/07/logo.svg"],
 [132,"Finishing Touch Exteriors","finishingtouch406.com","https://finishingtouch406.com/wp-content/uploads/2025/02/LOGO-1-1-1-1024x288.png"],
 [133,"Econo Glass Company","econoglass.com","https://econoglass.com/files/2018/12/logo6v2.png"],
 [134,"Becker's Glass Shop","beckersglass.com","https://d13cw1lxlociqy.cloudfront.net/yg6mno0ubkvop1l67v1x6mvkok84"],
 [135,"Critelli Glass","critelliglass.com","https://irp.cdn-website.com/13141b12/dms3rep/multi/opt/logo-288w.png"],
 [137,"Asphalt Plus Inc.","asphaltplusinc.com","https://asphaltplusinc.com/wp-content/themes/webgrain-child/assets/img/logo.png"]
];
const domain=value=>{try{return new URL(value).hostname.replace(/^www\./,"").toLowerCase()}catch{return ""}};
(async()=>{
 if(process.env.VERCEL_ENV!=="production"){console.log("WINDOW_LOGO_IMPORT",{skip:"not_production"});return}
 const dbUrl=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!dbUrl||!key){console.log("WINDOW_LOGO_IMPORT",{skip:"db_not_configured"});return}
 const db=createClient(dbUrl,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const results=[];
 for(const [id,name,sourceDomain,asset] of jobs){
  let result="error",detail="";
  try {
   const {data:b,error:loadError}=await db.from("businesses")
     .select("id,name,website,logo_url,logo_verified").eq("id",id).single();
   if(loadError||!b||b.name!==name||domain(b.website)!==sourceDomain)throw Error("source_identity_mismatch");
   if(b.logo_verified===true){results.push({id,name,result:"already_verified"});continue}
   const resp=await fetch(asset,{method:"GET",redirect:"follow",signal:AbortSignal.timeout(12000),
     headers:{"Accept":"image/*","User-Agent":"Mozilla/5.0"}});
   const type=(resp.headers.get("content-type")||"").toLowerCase();
   const bytes=Number(resp.headers.get("content-length")||0);
   if(!resp.ok||(!type.startsWith("image/")&&!type.includes("svg"))||bytes>5_000_000)throw Error("image_unavailable_or_invalid_"+resp.status);
   await resp.body?.cancel();
   const {data:updated,error:writeError}=await db.from("businesses")
     .update({logo_url:asset,logo_verified:true}).eq("id",id).eq("name",name)
     .eq("logo_verified",false).select("id,logo_verified").maybeSingle();
   // The brand field may be null instead of false, so retry safely with null only.
   if(writeError)throw Error("write_error");
   if(updated)result="saved";
   else {
     const {data:nullUpdated,error:nullError}=await db.from("businesses")
      .update({logo_url:asset,logo_verified:true}).eq("id",id).eq("name",name)
      .is("logo_verified",null).select("id").maybeSingle();
     if(nullError)throw Error("null_write_error");
     result=nullUpdated?"saved":"not_updated";
   }
  } catch(e){result="skipped";detail=String(e.message).slice(0,80)}
  results.push({id,name,result,...(detail?{detail}:{})});
 }
 console.log("WINDOW_LOGO_IMPORT "+JSON.stringify({attempted:jobs.length,saved:results.filter(x=>x.result==="saved").length,results}));
})().catch(err=>{console.error("WINDOW_LOGO_IMPORT_FATAL",String(err.message));process.exitCode=1});
