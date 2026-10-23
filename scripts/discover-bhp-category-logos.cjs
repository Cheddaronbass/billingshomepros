// Production-only READ-ONLY branded logo source discovery for remaining BHP categories.
const {createClient}=require("@supabase/supabase-js");
const cats=["plumbing","hvac","electrical","contractors-remodeling","landscaping","painting","fencing","handyman","concrete"];
const decode=s=>String(s||"").replace(/&amp;/gi,"&").replace(/&#(?:x27|39);/gi,"'").replace(/&quot;/gi,'"');
function absolute(raw,base){try{const u=new URL(decode(raw),base);return /^https?:$/.test(u.protocol)?u.href:""}catch{return""}}
const attr=(s,key)=>s.match(new RegExp("\\b"+key+"\\s*=\\s*([\"'])(.*?)\\1","i"))?.[2]||"";
const normalized=s=>String(s||"").toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]/g,"");
function scan(html,url,name){
 const matches=[],company=normalized(name),terms=String(name).toLowerCase().split(/[\W_]+/).filter(w=>w.length>=5&&!["company","roofing","construction","electric","plumbing","heating","painting","contracting","services","billings","montana","incorporated"].includes(w));
 for(const m of html.matchAll(/<img\b[^>]{1,2600}>/gi)){
  const tag=m[0],alt=decode(attr(tag,"alt")),cls=attr(tag,"class"),id=attr(tag,"id");
  let src=attr(tag,"src")||attr(tag,"data-src")||attr(tag,"data-lazy-src");
  if(!src||src.startsWith("data:"))src=attr(tag,"data-src")||attr(tag,"data-lazy-src")||attr(tag,"srcset").split(/\s+/)[0];
  const link=absolute(src,url);
  if(!link||/\.(?:gif)(?:$|\?)/i.test(link))continue;
  const previous=html.slice(Math.max(0,m.index-350),m.index);
  const meta=[alt,cls,id,src].join(" ").toLowerCase();
  const heading=/logo|brand|site-identity|masthead/i.test(meta),inHeader=/<(?:header|nav)[^>]*[^>]*>[\s\S]*$/i.test(previous)&&/logo/i.test(meta);
  const brand=terms.some(t=>normalized(meta).includes(t.toLowerCase()));
  const exactName=company.length>4&&normalized(meta).includes(company);
  const partner=/google|facebook|bbb|yelp|houzz|owens|corning|gaf|iko|angi|reviews|trustindex|licensed|certified|manufacturer|badge/i.test(meta);
  let score=(heading?3:0)+(brand?3:0)+(exactName?4:0)+(inHeader?2:0)-(partner?8:0);
  if(score>=4)matches.push({url:link.slice(0,300),alt:alt.slice(0,85),score,css:cls.slice(0,70)});
 }
 const dedup=[...new Map(matches.map(m=>[m.url,m])).values()].sort((a,b)=>b.score-a.score);
 return dedup.slice(0,3);
}
(async()=>{
 if(process.env.VERCEL_ENV!=="production"){console.log("BHP_ALL_LOGOS_SUMMARY",JSON.stringify({skipped:"not_production"}));return}
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key){console.log("BHP_ALL_LOGOS_SUMMARY",JSON.stringify({skipped:"missing_server_credentials"}));return}
 const sb=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data,error}=await sb.from("businesses").select("id,name,category,website,logo_url,logo_verified,google_place_id,google_match_status").in("category",cats).order("id");
 if(error)throw Error("Read BHP categories failed");
 const pending=data.filter(x=>x.logo_verified!==true);
 const counts={rows:data.length,verified:data.filter(x=>x.logo_verified===true).length,pending:pending.length,websites:pending.filter(x=>x.website).length,found:0,unreachable:0,results:0};
 for(let i=0;i<pending.length;i+=12){
  const group=await Promise.all(pending.slice(i,i+12).map(async b=>{
    const base={id:b.id,name:b.name,category:b.category,website:b.website,hasSavedLogo:!!b.logo_url,alreadyMatchedGoogle:!!b.google_place_id};
    if(!b.website)return {...base,reason:"no_website"};
    try{
      const res=await fetch(b.website,{headers:{"User-Agent":"Mozilla/5.0","Accept":"text/html"},signal:AbortSignal.timeout(9000),redirect:"follow"});
      if(!res.ok)return {...base,reason:"HTTP_"+res.status};
      const html=(await res.text()).slice(0,750000),candidates=scan(html,res.url,b.name);
      return {...base,candidates};
    }catch(e){return {...base,reason:String(e.message).slice(0,70)}}
  }));
  for(const v of group){
   if(v.candidates?.length)counts.found++;
   if(v.reason)counts.unreachable++;
   console.log("BHP_LOGO_CATEGORY "+JSON.stringify(v));
   counts.results++;
  }
 }
 console.log("BHP_ALL_LOGOS_SUMMARY "+JSON.stringify(counts));
})().catch(e=>{console.error("BHP_ALL_LOGOS_FATAL",String(e.message));process.exitCode=1});