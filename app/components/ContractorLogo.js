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

export default function ContractorLogo({ name, logoUrl, logoVerified = false }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <div className="businessLogo" aria-label={logoUrl && logoVerified && !imageFailed ? `${name} logo` : `${name} initials`}>
      {logoUrl && logoVerified && !imageFailed ? (
        <img src={logoUrl} alt={`${name} logo`} loading="lazy" onError={() => setImageFailed(true)} />
      ) : (
        <span className="businessLogoFallback" aria-hidden="true">{getBusinessInitials(name)}</span>
      )}
    </div>
  );
}
