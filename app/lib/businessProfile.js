export function businessProfilePath({ id, name }) {
  const slug = String(name ?? "")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 100)
    .replace(/^-|-$/g, "");

  // Keep the ID in the URL so duplicate names and later renames still resolve.
  return `/pros/${slug || "business"}-${id}`;
}
