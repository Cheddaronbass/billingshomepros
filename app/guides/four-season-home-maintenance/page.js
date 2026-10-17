import Link from "next/link";

export const metadata = {
  title: "Four-Season Home Maintenance in Billings — Preview",
  description: "A year-round home maintenance overview for Billings homeowners, with seasonal checklists and links to relevant local home-service categories.",
  robots: { index: false, follow: false },
};

const seasons = [["Fall","Get ready for freezing temperatures",[["Heating","Check filters and schedule furnace service if needed.","/hvac","Heating & cooling"],["Outdoor water","Disconnect hoses; arrange sprinkler winterization before freezing weather.","/landscaping","Landscaping"],["Roof & gutters","Look for clogged drainage or damaged shingles from the ground.","/roofing","Roofing"]]],["Winter","Watch for cold-weather trouble",[["Leaks & frozen pipes","Know the main water shutoff and get professional help for leaks or frozen lines.","/plumbing","Plumbing"],["Heating & ventilation","Keep approved vents clear and maintain carbon monoxide alarms.","/hvac","Heating & cooling"],["Roof ice","Avoid climbing onto icy roofs; have worrying ice or leaks inspected.","/roofing","Roofing"]]],["Spring","Check for damage after thaw",[["Storm damage","Inspect roofs and siding visually from a safe location.","/roofing","Roofing"],["Drainage & sprinklers","Look for pooling water and check irrigation equipment for leaks.","/landscaping","Landscaping"],["Exterior upkeep","Assess peeling paint, loose trim and weather seals.","/painting","Painting"]]],["Summer","Prepare for heat and storms",[["Air conditioning","Maintain filters according to instructions; have performance problems checked.","/hvac","Heating & cooling"],["Hail & wind","Photograph visible damage safely and request qualified assessments.","/roofing","Roofing"],["Fences & walkways","Inspect loose gates, uneven concrete and potential trip hazards.","/fencing","Fencing"]]]];

export default function FourSeasonGuide() {
  const navy = "#101b27", blue = "#25b9ff";
  return (
    <main style={{fontFamily:"Arial, Helvetica, sans-serif",background:"#eef3f7",color:navy,minHeight:"100vh"}}>
      <header style={{background:"#0b1117",color:"#fff",padding:"18px 6%"}}>
        <div style={{maxWidth:1080,margin:"auto",display:"flex",flexWrap:"wrap",gap:12,alignItems:"center",justifyContent:"space-between"}}>
          <Link href="/" style={{color:"white",textDecoration:"none",fontWeight:900,fontSize:19}}>BILLINGS <span style={{color:blue}}>HOME PROS</span></Link>
          <span style={{fontSize:12,letterSpacing:".1em",color:"#d0dce5"}}>EDITORIAL PREVIEW • NOT YET IN SITE NAVIGATION</span>
        </div>
      </header>
      <section style={{background:"linear-gradient(135deg,#0b1117,#173751)",color:"white",padding:"64px 6% 72px"}}>
        <div style={{maxWidth:1080,margin:"auto"}}>
          <p style={{color:blue,fontWeight:800,letterSpacing:".15em",fontSize:13,margin:"0 0 18px"}}>A BILLINGS HOMEOWNER RESOURCE</p>
          <h1 style={{fontFamily:"Arial, Helvetica, sans-serif",fontWeight:900,fontSize:"clamp(2.3rem,5vw,4.2rem)",maxWidth:850,letterSpacing:"-.045em",lineHeight:1.08,margin:"0 0 22px",color:"#fff"}}>Your Four-Season Home Maintenance Guide</h1>
          <p style={{maxWidth:740,fontSize:"clamp(1rem,1.9vw,1.2rem)",lineHeight:1.7,color:"#dae6ef",margin:0}}>Montana weather keeps homeowners on their toes. Use this practical checklist to plan seasonal upkeep and find the right type of local home-service professional when a job needs an expert.</p>
        </div>
      </section>
      <section style={{maxWidth:1080,margin:"auto",padding:"36px 6% 8px"}}>
        <div style={{background:"#fff",padding:"20px 24px",borderLeft:"4px solid #25b9ff",borderRadius:10,color:"#3e5261",lineHeight:1.6}}>
          <strong style={{color:navy}}>How to use this guide:</strong> Start with the season, note anything that needs attention, and use the links to browse the related contractor category. This is a planning resource, not an inspection, endorsement, or substitute for professional guidance.
        </div>
      </section>
      <section style={{maxWidth:1080,margin:"auto",padding:"32px 6% 72px"}}>
        <div style={{display:"grid",gap:24}}>
          {seasons.map(([season,subtitle,items],i)=>(
            <article key={season} style={{background:"#fff",border:"1px solid #d7e3eb",borderRadius:16,overflow:"hidden",boxShadow:"0 5px 18px rgba(11,27,45,.05)"}}>
              <div style={{padding:"23px 26px",background:i===1?"#123955":"#172d41",color:"#fff",display:"flex",flexWrap:"wrap",alignItems:"baseline",gap:12}}>
                <h2 style={{fontFamily:"Arial, Helvetica, sans-serif",fontSize:"clamp(1.5rem,3vw,2rem)",margin:0,color:"white"}}>{season}</h2>
                <span style={{color:"#d0e2ee"}}>{subtitle}</span>
              </div>
              <div style={{padding:"10px 26px 22px"}}>
                {items.map(([name,description,href,trade])=>(
                  <div key={name} style={{padding:"21px 0",borderBottom:"1px solid #e1eaf0"}}>
                    <h3 style={{fontFamily:"Arial, Helvetica, sans-serif",fontSize:18,margin:"0 0 8px",color:navy}}>{name}</h3>
                    <p style={{color:"#4c6070",lineHeight:1.65,margin:"0 0 10px"}}>{description}</p>
                    <Link href={href} style={{color:"#096b9d",fontWeight:800,textDecoration:"underline",textUnderlineOffset:3}}>Browse {trade} professionals →</Link>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <section style={{marginTop:38,padding:"32px 28px",background:navy,color:"#fff",borderRadius:15}}>
          <h2 style={{fontFamily:"Arial, Helvetica, sans-serif",color:"white",fontSize:"clamp(1.45rem,3vw,2rem)",margin:"0 0 12px"}}>Not sure which professional you need?</h2>
          <p style={{lineHeight:1.7,color:"#d0e2ee",margin:"0 0 22px"}}>Billings Home Pros organizes area service businesses by trade so you can begin with the work that needs doing.</p>
          <Link href="/#services" style={{display:"inline-block",background:blue,padding:"13px 20px",borderRadius:8,textDecoration:"none",fontWeight:900,color:"#0b1117"}}>Explore Home-Service Categories →</Link>
        </section>
        <p style={{marginTop:25,fontSize:13,lineHeight:1.65,color:"#627586"}}>Safety note: Never climb onto an icy or damaged roof, work on energized electrical equipment, or attempt unsafe gas or furnace repairs. If you suspect a gas leak or carbon monoxide emergency, leave the area and contact emergency services or the utility from a safe location. Verify insurance, credentials, and qualifications independently before hiring.</p>
      </section>
    </main>
  );
}
