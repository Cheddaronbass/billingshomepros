// Read-only production reconciliation of nine missing contact fields.
// No customer data or credentials printed, no changes made.
const {createClient}=require("@supabase/supabase-js");
const planned=[
 {id:7,name:"O'Neil Plumbing",urls:[]},
 {id:60,name:"McClinton Construction",urls:["https://mcclintonconstruction.com/","http://mcclintonconstruction.com/"]},
 {id:72,name:"River Ridge Landscape Company",urls:["https://riverridgelandscape.com/","http://riverridgelandscape.com/"]},
 {id:88,name:"Paints Well with Colors",urls:["https://paintswellwithcolors.com/"]},
 {id:91,name:"Appelt Custom Concrete and Construction",urls:[]},
 {id:92,name:"Devine Design Concrete",urls:[]},
 {id:131,name:"NCI Windows Doors & Siding",urls:["https://nciwindows.com/","http://nciwindows.com/"]},
 {id:139,name:"Plankwalker Siding and Roofing",urls:["https://plankwalker.llc/"]},
 {id:136,name:"Smith & Company",urls:["https://buildingbillings.com/"]}
];
const clean=s=>String(s||"").replace(/\s+/g," ").trim().slice(0,150);
(async()=>{
 if(process.env.VERCEL_ENV!=="production"){console.log("BHP_MISSING_CONTACT_AUDIT",{skipped:"notproduction"});return}
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key){console.log("BHP_MISSING_CONTACT_AUDIT",{skipped:"missing build DB"});return}
 const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data,error}=await db.from("businesses").select("id,name,phone,website,category").in("id",planned.map(x=>x.id));
 if(error)throw Error("Failed to read BHP source data");
 for(const p of planned){
  const b=data.find(x=>x.id===p.id),out={id:p.id,expected:p.name,current:b||null,sites:[]};
  for(const website of p.urls){
   try{
    const res=await fetch(website,{headers:{"User-Agent":"Mozilla/5.0","Accept":"text/html"},signal:AbortSignal.timeout(8500),redirect:"follow"});
    const ct=res.headers.get("content-type")||"";
    let title="",bodySnippet="";
    if(res.ok&&ct.includes("html")){
      const html=(await res.text()).slice(0,120000);
      title=clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
      bodySnippet=clean(html.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g," ").slice(0,11000)).slice(0,300);
    }
    out.sites.push({url:website,status:res.status,finalUrl:res.url,contentType:ct.split(";")[0],title,bodySnippet});
   }catch(e){out.sites.push({url:website,error:clean(e.message)})}
  }
  console.log("BHP_MISSING_CONTACT_ITEM "+JSON.stringify(out));
 }
 console.log("BHP_MISSING_CONTACT_AUDIT "+JSON.stringify({checked:planned.length}));
})().catch(e=>{console.error("BHP_MISSING_CONTACT_FATAL",String(e.message));process.exitCode=1});
