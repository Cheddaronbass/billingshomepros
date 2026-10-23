// Temporary diagnostic: inspect official site logo markup, without editing records.
const sites=[
["Win-Dor Industries","https://www.windorindustries.com/"],
["Reynolds Window and Door","https://www.reynoldswindowanddoor.com/"],
["Lynnrich Seamless Siding, Windows and Doors","https://lynnrich.com/"],
["Pella Windows & Doors of Billings","https://www.pella.com/locations/mt/billings/"],
["C's Exterior Designs","https://iwantwindows.com/"],
["Sprague Roofing","https://www.spragueroofingmt.com/"],
["A&L Exteriors","https://www.a-and-l-exteriors.com/"],
["Construction Building Connects","https://montanacbc.com/"],
["Exterior Design Solutions","https://exteriordesignsolution.com/"],
["Schwend Construction & Repair","https://www.schwendconstruction.com/"]
];
const decode=s=>String(s).replace(/&amp;/g,"&").replace(/&#039;|&#39;/g,"'");
const unq=s=>decode(s).replace(/\s+/g," ").slice(0,400);
function abs(src,base){try{return new URL(decode(src),base).href}catch{return""}}
(async()=>{
if(process.env.VERCEL_ENV!=="production"){console.log("MORE_LOGO_SCAN "+JSON.stringify({skip:"nonproduction"}));return}
for(const [name,url] of sites){
 try{
  const r=await fetch(url,{headers:{"User-Agent":"Mozilla/5.0","Accept":"text/html"},signal:AbortSignal.timeout(11000)});
  if(!r.ok){console.log("MORE_LOGO_SCAN "+JSON.stringify({name,status:r.status}));continue}
  const html=(await r.text()).slice(0,250000);
  const snippets=[];
  for(const m of html.matchAll(/<img\b[^>]{1,1700}>/gi)){
   const tag=m[0];
   if(/(?:id|class|alt|src)\s*=\s*["'][^"']*(?:logo|brand|masthead|header)[^"']*["']/i.test(tag)){
    const src=tag.match(/(?:data-src|src)\s*=\s*["']([^"']+)["']/i)?.[1]||"";
    snippets.push({src:abs(src,r.url).slice(0,230),tag:unq(tag).slice(0,310)});
   }
  }
  const bg=[];
  for(const m of html.matchAll(/(?:background-image\s*:\s*url\(|--[a-z-]*logo[a-z-]*\s*:|logo[^"'\n]{0,20}\.(?:png|svg|webp|jpg))/gi)){
    bg.push(unq(html.slice(Math.max(0,m.index-100),m.index+240)));
    if(bg.length>=6)break;
  }
  const logos=[];
  for(const m of html.matchAll(/<(?:link|meta)[^>]*(?:icon|og:image|twitter:image)[^>]*>/gi)){
   logos.push(unq(m[0]));if(logos.length>=5)break;
  }
  console.log("MORE_LOGO_SCAN "+JSON.stringify({name,status:r.status,final:r.url,images:snippets.slice(0,12),assetHints:bg.slice(0,6),iconMeta:logos.slice(0,4)}));
 }catch(e){console.log("MORE_LOGO_SCAN "+JSON.stringify({name,error:String(e.message).slice(0,150)}))}
}
})().catch(e=>{console.error("MORE_LOGO_SCAN_FATAL",e.message);process.exitCode=1})