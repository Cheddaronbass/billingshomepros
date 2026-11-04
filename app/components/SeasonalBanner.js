"use client";
import { useEffect, useState } from "react";

export default function SeasonalBanner() {
  const [season, setSeason] = useState(null);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    const now = new Date();
    const month = Number(new Intl.DateTimeFormat("en-US", { timeZone: "America/Denver", month: "numeric" }).format(now));
    const year = Number(new Intl.DateTimeFormat("en-US", { timeZone: "America/Denver", year: "numeric" }).format(now));
    const name = month >= 9 || month <= 2 ? "winter" : month <= 5 ? "spring" : "summer";
    const key = `bhp-seasonal-banner-${name}-${name === "winter" && month <= 2 ? year - 1 : year}`;
    setSeason({ name, key });
    try { setDismissed(localStorage.getItem(key) === "dismissed"); } catch {}
  }, []);
  if (!season || dismissed) return null;
  const winter = season.name === "winter";
  const message = winter ? "Cold weather is here. Is your home ready?" : season.name === "spring" ? "Time for a spring home checkup." : "Keep your home ready for summer.";
  return <aside aria-label="Seasonal home maintenance" style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",background:"#142536",borderBottom:"1px solid #2b4b63"}}>
    <a href={winter ? "/guides/winter-home-checklist" : "/guides/four-season-home-maintenance"} style={{flex:1,color:"#e6f2fa",textAlign:"center",fontSize:"clamp(13px,2.5vw,15px)",lineHeight:1.5,textDecoration:"none",padding:"4px 0"}}>
      {message} <span style={{color:"#58caff",fontWeight:800}}>{winter ? "View the checklist" : "View the seasonal guide"} →</span>
    </a>
    <button type="button" aria-label="Dismiss seasonal banner" onClick={() => { setDismissed(true); try { localStorage.setItem(season.key, "dismissed"); } catch {} }} style={{width:44,height:44,flexShrink:0,border:"1px solid #466176",borderRadius:8,background:"transparent",color:"#e6f2fa",fontSize:24,cursor:"pointer"}}>×</button>
  </aside>;
}
