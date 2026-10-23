// One-time official logo import; only save images after checking live contents.
const {createClient}=require("@supabase/supabase-js");
const arr=[
 {id:126,name:"Lynnrich Seamless Siding, Windows and Doors",domain:"lynnrich.com",logo:"https://lynnrich.com/wp-content/uploads/2023/10/Group-566.svg"},
 {id:130,name:"A&L Exteriors",domain:"a-and-l-exteriors.com",logo:"https://primary.jwwb.nl/public/h/e/a/temp-wkyqhhyuqwpnmybnuorb/image-high-k5g5d8.png?enable-io=true&width=304"},
];
const domain=s=>{try{return new URL(s).hostname.replace(/^www\./,"").toLowerCase()}catch{return""}};
async function run(){
 if(process.env.VERCEL_ENV!=="production"){console.log("LOGO_SECOND_PASS",{status:"not_production"});return}
 const u=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!u||!key){console.log("LOGO_SECOND_PASS",{status:"missing_build_db_credentials"});return}
 const db=createClient(u,key,{auth:{autoRefreshToken:false,persistSession:false}});
 const outcomes=[];
 for(const item of arr){
  try {
   const {data:b,error:readErr}=await db.from("businesses")
     .select("id,name,website,logo_verified").eq("id",item.id).single();
   if(readErr||!b||b.name!==item.name||domain(b.website)!==item.domain)throw Error("business_domain_mismatch");
   if(b.logo_verified){outcomes.push({name:item.name,status:"already_verified"});continue}
   const res=await fetch(item.logo,{signal:AbortSignal.timeout(12000),headers:{"Accept":"image/*","User-Agent":"Mozilla/5.0"}});
   if(!res.ok)throw Error("asset_http_"+res.status);
   const type=(res.headers.get("content-type")||"").toLowerCase();
   const data=new Uint8Array(await res.arrayBuffer());
   if(data.length<100||data.length>3000000)throw Error("invalid_asset_size_"+data.length);
   const first=new TextDecoder().decode(data.slice(0,120)).trimStart();
   const isSvg=/svg/i.test(type)&&(/<\?xml/.test(first)||/<svg/.test(first)||/<!--/.test(first));
   const isPng=(data[0]===137&&data[1]===80&&data[2]===78&&data[3]===71);
   if(!isSvg&&!isPng)throw Error("invalid_asset_mime_"+type);
   const {data:written,error:writeErr}=await db.from("businesses")
     .update({logo_url:item.logo,logo_verified:true})
     .eq("id",item.id).eq("name",item.name)
     .or("logo_verified.is.null,logo_verified.eq.false")
     .select("id,logo_verified").maybeSingle();
   if(writeErr)throw Error("database_write_failed");
   outcomes.push({name:item.name,status:written?.logo_verified?"saved":"unchanged"});
  }catch(e){outcomes.push({name:item.name,status:"skipped",reason:String(e.message).slice(0,90)})}
 }
 console.log("LOGO_SECOND_PASS "+JSON.stringify(outcomes));
}
run().catch(e=>{console.error("LOGO_SECOND_PASS_FATAL",e.message);process.exitCode=1});