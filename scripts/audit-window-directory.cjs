// Temporary read-only audit of existing BHP business records.
const {createClient}=require("@supabase/supabase-js");
async function run(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
 const key=process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url || !key) throw new Error("Supabase read credentials missing in deployment build");
 const sb=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const rows=[];
 for(let offset=0;offset<10000;offset+=1000){
   const {data,error}=await sb.from("businesses").select("id,name,category,services,phone,website").order("id").range(offset,offset+999);
   if(error)throw new Error("Read failed: "+error.message);
   rows.push(...data);
   if(data.length<1000)break;
 }
 const dist={};for(const a of rows){dist[a.category]=(dist[a.category]||0)+1;}
 console.log("WINDOW_AUDIT_SUMMARY",JSON.stringify({count:rows.length,byCategory:dist,windowCandidates:rows.filter(r=>r.category==="windows-doors" || (Array.isArray(r.services)&&r.services.some(s=>/window|door/i.test(s)))).map(r=>({id:r.id,name:r.name,category:r.category,services:r.services,phone:r.phone,website:r.website}))}));
}
run().catch(e=>{console.error("WINDOW_AUDIT_FAILED",e.message);process.exitCode=1;});
