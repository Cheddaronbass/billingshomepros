// Read-only one-shot audit of logo assets published on official installer sites.
const {createClient}=require("@supabase/supabase-js");
const decode=(s)=>String(s||"").replace(/&amp;/g,"&").replace(/&#x2f;/gi,"/").replace(/&quot;/g,'"').replace(/&#39;/g,"'");
const clean=(s)=>decode(s).replace(/\s+/g," ").slice(0,320);
const abs=(p,base)=>{try {const u=new URL(decode(p),base); return ["http:","https:"].includes(u.protocol)?u.href:""}catch{return""}};
function extract(html,website){
  const candidates=[];
  const imgs=[...html.matchAll(/<(?:img|source)\b[^>]{1,1200}>/gi)].map(m=>m[0]);
  for(const tag of imgs){
    const src=tag.match(/(?:src|data-src|srcset|data-lazy-src)\s*=\s*["']([^"']+)["']/i)?.[1]||"";
    const alt=tag.match(/(?:alt|aria-label|title)\s*=\s*["']([^"']+)["']/i)?.[1]||"";
    const url=abs(src.split(/\s+/)[0],website);if(!url)continue;
    const label=src+" "+alt;
    if(/logo|brand|identity|header/i.test(label))candidates.push({url:url.slice(0,310),alt:clean(alt),reason:"img"});
  }
  for(const m of html.matchAll(/"logo"\s*:\s*(?:"([^"]+)"|\{\s*"?url"?\s*:\s*"([^"]+)")/gi)) {
    const url=abs(m[1]||m[2],website);if(url)candidates.push({url:url.slice(0,310),reason:"jsonld"});
  }
  for(const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    if(!/twitter:image|og:image/i.test(m[0]))continue;
    const p=m[0].match(/content\s*=\s*["']([^"']+)["']/i)?.[1]||"";
    const url=abs(p,website);if(url&&/logo/i.test(url))candidates.push({url:url.slice(0,310),reason:"meta"});
  }
  return [...new Map(candidates.map(o=>[o.url,o])).values()].slice(0,6);
}
(async()=>{
 if(process.env.VERCEL_ENV!=="production"){console.log("WINDOW_LOGO_AUDIT",{skipped:"not-production"});return}
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key){console.log("WINDOW_LOGO_AUDIT",{skipped:"no-db-env"});return}
 const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data,error}=await db.from("businesses").select("id,name,website,logo_url,logo_verified").or('category.eq.windows-doors,services.cs.{"Windows & Doors"}').order("id");
 if(error)throw Error("db audit "+error.code);
 const batch=6,results=[];
 for(let i=0;i<data.length;i+=batch){
  const out=await Promise.all(data.slice(i,i+batch).map(async b=>{
   const rec={id:b.id,name:b.name,website:b.website,existing:!!b.logo_url,verified:b.logo_verified===true};
   if(!b.website)return {...rec,reason:"no_website"};
   try{
    const res=await fetch(b.website,{headers:{"User-Agent":"Mozilla/5.0 (compatible; BHPDirectoryLogoAudit/1.0)","Accept":"text/html"},signal:AbortSignal.timeout(10000),redirect:"follow"});
    if(!res.ok)return {...rec,reason:"http_"+res.status};
    const type=res.headers.get("content-type")||"";
    if(!/html/i.test(type))return {...rec,reason:"not_html"};
    const html=(await res.text()).slice(0,1000000);
    return {...rec,status:res.status,redirect:res.url===b.website?"":res.url,logos:extract(html,res.url)};
   }catch(e){return {...rec,reason:clean(e.message)}}
  }));
  results.push(...out);
 }
 for(const row of results) console.log("WINDOW_LOGO_ITEM "+JSON.stringify(row));
 console.log("WINDOW_LOGO_SUMMARY "+JSON.stringify({businesses:results.length,existingLogos:results.filter(x=>x.existing).length,verifiedLogos:results.filter(x=>x.verified).length}));
})().catch(e=>{console.error("WINDOW_LOGO_AUDIT_FATAL",String(e.message));process.exitCode=1});