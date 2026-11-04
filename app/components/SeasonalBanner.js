"use client";
import { useEffect, useState } from "react";

export default function SeasonalBanner() {
  const [month, setMonth] = useState(11);
  useEffect(() => { setMonth(Number(new Intl.DateTimeFormat("en-US", { timeZone: "America/Denver", month: "numeric" }).format(new Date()))); }, []);
  const winter = month >= 9 || month <= 2;
  const message = winter ? "Cold weather is here. Is your home ready?" : month <= 5 ? "Time for a spring home checkup." : "Keep your home ready for summer.";
  return (
    <aside aria-label="Seasonal home maintenance" style={{ background: "#142536", borderBottom: "1px solid #2b4b63" }}>
      <a href={winter ? "/guides/winter-home-checklist" : "/guides/four-season-home-maintenance"} style={{ display: "block", color: "#e6f2fa", textAlign: "center", fontSize: "clamp(13px,2.5vw,15px)", lineHeight: 1.5, textDecoration: "none", padding: "11px 18px" }}>
        {message} <span style={{ color: "#58caff", fontWeight: 800 }}>{winter ? "View the checklist" : "View the seasonal guide"} →</span>
      </a>
    </aside>
  );
}
