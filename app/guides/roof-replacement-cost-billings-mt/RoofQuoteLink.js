"use client";

import Link from "next/link";

export default function GuideQuoteLink({ projectType = "roofing", children = "Request a roofing quote" }) {
  function trackClick() {
    window.gtag?.("event", projectType === "roofing" ? "roof_guide_quote_click" : "guide_quote_click", { project_type: projectType });
  }

  return (
    <Link href={`/quote?projectType=${projectType}`} onClick={trackClick}
      style={{ display: "inline-block", padding: "13px 18px", borderRadius: 8, background: "#48c5ff", color: "#0b1117", fontWeight: 700, textDecoration: "none" }}>
      {children}
    </Link>
  );
}
