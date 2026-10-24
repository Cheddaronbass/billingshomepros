// Shared social metadata for public Billings Home Pros pages.
// Keep social URLs aligned with Vercel's apex-domain canonical redirect.
const siteUrl = "https://billingshomepros.com";
const siteName = "Billings Home Pros";

export function withPageSocial(metadata) {
  const title = metadata?.title;
  const description = metadata?.description;
  const pathname = metadata?.alternates?.canonical;
  if (typeof title !== "string" || typeof description !== "string" ||
      typeof pathname !== "string" || !pathname.startsWith("/")) {
    return metadata;
  }

  const hasBrand = title.endsWith(" | " + siteName);
  const socialTitle = hasBrand ? title : title + " | " + siteName;
  const url = siteUrl + (pathname === "/" ? "" : pathname);

  return {
    ...metadata,
    // Avoid duplicating the brand when the title already includes it.
    title: hasBrand ? { absolute: title } : title,
    openGraph: { title: socialTitle, description, url, siteName, type: "website" },
    twitter: { card: "summary", title: socialTitle, description },
  };
}
