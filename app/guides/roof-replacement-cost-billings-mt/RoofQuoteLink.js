"use client";

import Link from "next/link";

export default function RoofQuoteLink() {
  function trackClick() {
    window.gtag?.("event", "roof_guide_quote_click", { project_type: "roofing" });
  }

  return (
    <Link href="/quote?projectType=roofing" onClick={trackClick}
      style={{ display: "inline-block", padding: "13px 18px", borderRadius: 8, background: "#48c5ff", color: "#0b1117", fontWeight: 700, textDecoration: "none" }}>
      Request a roofing quote
    </Link>
  );
}
