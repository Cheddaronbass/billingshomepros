// One-time, read-only image identity audit. No DB writes.
const tests=[
 {id:"cs",url:"https://iwantwindows.com/wp-content/uploads/2023/02/logo-200x88-1.webp"},
 {id:"reynolds_logo",url:"https://static.wixstatic.com/media/74b6ef_2e7ec33b975b4465b2432e4322b0dd2c~mv2.png/v1/fill/w_345,h_76,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/74b6ef_2e7ec33b975b4465b2432e4322b0dd2c~mv2.png"},
 {id:"reynolds_plain",url:"https://static.wixstatic.com/media/74b6ef_2e7ec33b975b4465b2432e4322b0dd2c~mv2.png"},
 {id:"reynolds_favicon",url:"https://static.wixstatic.com/media/74b6ef_075fc6b9b76e4a3f922838ab6a86a2cb~mv2.png/v1/fill/w_192,h_192,lg_1,usm_0.66_1.00_0.01/74b6ef_075fc6b9b76e4a3f922838ab6a86a2cb~mv2.png"}
];
(async()=>{
 if(process.env.VERCEL_ENV!=="production"){console.log("BHP_LOGO_DEBUG",{skipped:"notproduction"});return}
 for(const t of tests){try{
  const r=await fetch(t.url,{headers:{"User-Agent":"Mozilla/5.0","Accept":"image/avif,image/webp,image/png,image/jpeg,image/svg+xml,*/*"},signal:AbortSignal.timeout(11000)});
  const ct=r.headers.get("content-type")||"";
  const buffer=Buffer.from(await r.arrayBuffer());
  console.log("BHP_LOGO_DEBUG "+JSON.stringify({id:t.id,status:r.status,contentType:ct,bytes:buffer.length,magic:buffer.subarray(0,32).toString("hex"),textStart:/text|html/.test(ct)?buffer.subarray(0,110).toString("utf8"):""}));
 }catch(e){console.log("BHP_LOGO_DEBUG "+JSON.stringify({id:t.id,error:String(e.message).slice(0,120)}))}}
 for(const site of [{id:"pella_official",url:"https://localmedia.pella.com/"},{id:"reynolds_home",url:"https://www.reynoldswindowanddoor.com/"}]){
  try{
   const r=await fetch(site.url,{headers:{"User-Agent":"Mozilla/5.0"},signal:AbortSignal.timeout(11000)}),h=(await r.text()).slice(0,300000);
   const imgs=[...h.matchAll(/<img\b[^>]+>/gi)].map(m=>m[0]);
   const logos=imgs.filter(i=>/logo|brand/i.test(i)).slice(0,5);
   const mark=h.indexOf("74b6ef_2e7ec33b975b4465b2432e4322b0dd2c");
   console.log("BHP_LOGO_SITE "+JSON.stringify({site:site.id,status:r.status,brandImages:logos.map(x=>x.slice(0,550)),reynoldsContext:mark>=0?h.slice(Math.max(0,mark-600),mark+420).slice(0,1050):""}));
  }catch(e){console.log("BHP_LOGO_SITE "+JSON.stringify({site:site.id,error:String(e.message).slice(0,120)}))}
 }
})().catch(e=>{console.error("BHP_LOGO_DEBUG_FATAL",e.message);process.exitCode=1});