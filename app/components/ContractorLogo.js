"use client";

import { useState } from "react";

function getBusinessInitials(name = "") {
  const ignored = new Set(["and", "&", "the", "of", "llc", "inc", "co", "company", "ltd"]);
  const words = String(name).trim().split(/\s+/).filter((word) => {
    const clean = word.replace(/[^a-zA-Z0-9]/g, "");
    return clean && !ignored.has(clean.toLowerCase()) && /[a-zA-Z]/.test(clean);
  });
  if (!words.length) return String(name).trim().slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

// Show the contractor's supplied logo first. If one is missing, try the
// icon published by its own official website. Never create an invented logo.
function getWebsiteIcon(website) {
  try {
    const url = new URL(website);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(url.hostname)}&sz=128`;
  } catch {
    return "";
  }
}

export default function ContractorLogo({ name, logoUrl, logoVerified = false, website }) {
  const [imageIndex, setImageIndex] = useState(0);
  const websiteIcon = getWebsiteIcon(website);
  const imageSources = [
    ...(logoUrl ? [{ url: logoUrl, type: "logo" }] : []),
    ...(websiteIcon ? [{ url: websiteIcon, type: "website icon" }] : []),
  ];
  const current = imageSources[imageIndex];
  const imageLabel = current?.type === "website icon"
    ? `${name} website icon`
    : logoVerified ? `${name} verified logo` : `${name} logo candidate`;
  return (
    <div className="businessLogo" aria-label={current ? imageLabel : `${name} initials`}>
      {current ? (
        <img
          src={current.url}
          alt={imageLabel}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImageIndex((index) => index + 1)}
          onLoad={(event) => {
            // Google's generic missing-site globe is only 16px; prefer the
            // honest initials placeholder rather than a fake brand mark.
            if (current.type === "website icon" && event.currentTarget.naturalWidth <= 16) {
              setImageIndex((index) => index + 1);
            }
          }}
        />
      ) : (
        <span className="businessLogoFallback" aria-hidden="true">{getBusinessInitials(name)}</span>
      )}
    </div>
  );
}
