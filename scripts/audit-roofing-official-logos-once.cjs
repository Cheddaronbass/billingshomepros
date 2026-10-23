// One-time read-only diagnostic for existing Roofing records.
// Source: each contractor's official website; never infer logos from partners.
const {createClient}=require("@supabase/supabase-js");
const decode=x=>String(x||"").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;|&#x27;/gi,"'");
function absolute(x,base){try{const u=new URL(decode(x),base);return /^https?:$/.test(u.protocol)?u.href:""}catch{return""}}
const attr=(s,n)=>s.match(new RegExp("\\b"+n+"\\s*=\\s*([\"'])([\\s\\S]*?)\\1","i"))?.[2]||"";
function logos(html,url){
 const out=[];
 for(const match of html.matchAll(/<img\b[^>]{1,2800}>/gi)){
  const tag=match[0],alt=decode(attr(tag,"alt")),cls=attr(tag,"class"),id=attr(tag,"id");
  let src=attr(tag,"src")||attr(tag,"data-src")||"";
  if(src.startsWith("data:"))src=attr(tag,"data-src")||"";
  if(!src || src.startsWith("data:"))src=attr(tag,"srcset").split(/\s+/)[0]||"";
  const link=absolute(src,url);
  if(!link)continue;
  const surrounding=html.slice(Math.max(0,match.index-180),match.index);
  const candidate=/logo|brand|header/i.test([alt,cls,id,src,surrounding].join(" "));
  if(candidate)out.push({src:link.slice(0,310),alt:alt.slice(0,130),className:cls.slice(0,100),tag:tag.slice(0,270)});
 }
 const extra=[];
 for(const m of html.matchAll(/"logo"\s*:\s*(?:"([^"]+)"|\{\s*"?url"?\s*:\s*"([^"]+)")/gi)){
  const p=absolute(m[1]||m[2],url);if(p)extra.push(p.slice(0,310));if(extra.length>=3)break;
 }
 return {images:[...new Map(out.map(z=>[z.src,z])).values()].slice(0,12),structured:extra};
}
async function main(){
 if(process.env.VERCEL_ENV!=="production"){console.log("ROOFING_LOGO_SCAN",{skip:"notproduction"});return}
 const dbUrl=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!dbUrl||!key){console.log("ROOFING_LOGO_SCAN",{skip:"missing_DB_build_configuration"});return}
 const db=createClient(dbUrl,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data,error}=await db.from("businesses").select("id,name,website,logo_verified,logo_url").eq("category","roofing").order("id");
 if(error)throw new Error("Could not inspect existing businesses");
 console.log("ROOFING_LOGO_SUMMARY "+JSON.stringify({count:data.length,verified:data.filter(z=>z.logo_verified===true).length,pending:data.filter(z=>z.logo_verified!==true).length}));
 const pending=data.filter(x=>x.logo_verified!==true);
 for(let i=0;i<pending.length;i+=5){
  await Promise.all(pending.slice(i,i+5).map(async b=>{
   try{
    if(!b.website){console.log("ROOFING_LOGO_SITE "+JSON.stringify({id:b.id,name:b.name,reason:"no_official_site"}));return}
    const r=await fetch(b.website,{headers:{"User-Agent":"Mozilla/5.0","Accept":"text/html"},signal:AbortSignal.timeout(14000)});
    if(!r.ok){console.log("ROOFING_LOGO_SITE "+JSON.stringify({id:b.id,name:b.name,status:r.status}));return}
    const html=(await r.text()).slice(0,900000);
    console.log("ROOFING_LOGO_SITE "+JSON.stringify({id:b.id,name:b.name,website:b.website,actual:r.url,status:r.status,alreadySaved:!!b.logo_url,...logos(html,r.url)}));
   }catch(e){console.log("ROOFING_LOGO_SITE "+JSON.stringify({id:b.id,name:b.name,error:String(e.message).slice(0,130)}))}
  }));
 }
}
main().catch(e=>{console.error("ROOFING_LOGO_FATAL",String(e.message));process.exitCode=1});