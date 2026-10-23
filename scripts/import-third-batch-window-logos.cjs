// One-time guarded import, using actual image bytes from official business websites.
const {createClient}=require("@supabase/supabase-js");
const records=[
 {id:128,name:"C's Exterior Designs",website:"iwantwindows.com",asset:"https://iwantwindows.com/wp-content/uploads/2023/02/logo-200x88-1.webp",source:"official website brand/header logo"},
 {id:122,name:"Reynolds Window and Door",website:"reynoldswindowanddoor.com",asset:"https://static.wixstatic.com/media/74b6ef_2e7ec33b975b4465b2432e4322b0dd2c~mv2.png",source:"logo WS image on official website"},
 {id:124,name:"Pella Windows & Doors of Billings",website:"pella.com",asset:"https://localmedia.pella.com/media/ihucpkoz/logo.png",source:"Pella official media site dealer logo"}
];
const domain=s=>{try{return new URL(s).hostname.replace(/^www\./,"").toLowerCase()}catch{return""}};
function isImage(b){
 return b.length>=100 && b.length<2_000_000 && (
 (b[0]===137&&b[1]===80&&b[2]===78&&b[3]===71)||
 (b.subarray(0,4).toString("ascii")==="RIFF"&&b.subarray(8,12).toString("ascii")==="WEBP")||
 (b.subarray(4,12).toString("ascii").startsWith("ftypavif"))
 );
}
(async()=>{
 if(process.env.VERCEL_ENV!=="production"){console.log("WINDOW_THIRD_LOGOS "+JSON.stringify({skipped:"notproduction"}));return}
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key){console.log("WINDOW_THIRD_LOGOS "+JSON.stringify({skipped:"credentials_not_available_in_build"}));return}
 const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const result=[];
 for(const x of records){
  try{
   const {data:row,error:lookupError}=await db.from("businesses").select("id,name,website,logo_url,logo_verified").eq("id",x.id).single();
   if(lookupError || !row || row.name!==x.name || domain(row.website)!==x.website)throw Error("business_identity_mismatch");
   if(row.logo_verified===true){result.push({name:x.name,status:"already_verified"});continue}
   const res=await fetch(x.asset,{signal:AbortSignal.timeout(12000),headers:{"User-Agent":"Mozilla/5.0","Accept":"image/avif,image/webp,image/png,*/*"}});
   if(!res.ok)throw Error("asset_http_"+res.status);
   const buffer=Buffer.from(await res.arrayBuffer());
   if(!isImage(buffer))throw Error("not_a_valid_image_"+buffer.length);
   // The business's own logo files were identified directly from the official site's HTML.
   const {data:write,error:writeError}=await db.from("businesses")
    .update({logo_url:x.asset,logo_verified:true})
    .eq("id",x.id).eq("name",x.name)
    .or("logo_verified.is.null,logo_verified.eq.false")
    .select("id").maybeSingle();
   if(writeError)throw Error("database_write_failed");
   result.push({name:x.name,status:write?"saved":"no_change"});
  }catch(e){result.push({name:x.name,status:"skipped",reason:String(e.message).slice(0,100)});}
 }
 console.log("WINDOW_THIRD_LOGOS "+JSON.stringify(result));
})().catch(e=>{console.error("WINDOW_THIRD_LOGOS_FATAL",e.message);process.exitCode=1});