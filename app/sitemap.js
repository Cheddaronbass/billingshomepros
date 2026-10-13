const baseUrl = "https://billingshomepros.com";

const pages = [
  { path: "", priority: 1.0 },
  { path: "/site-map", priority: 0.5 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  { path: "/get-listed", priority: 0.7 },
  { path: "/plumbing", priority: 0.9 },
  { path: "/hvac", priority: 0.9 },
  { path: "/hvac/ac-repair", priority: 0.8 },
  { path: "/electrical", priority: 0.9 },
  { path: "/roofing", priority: 0.9 },
  { path: "/contractors-remodeling", priority: 0.9 },
  { path: "/landscaping", priority: 0.9 },
  { path: "/painting", priority: 0.9 },
  { path: "/concrete", priority: 0.9 },
  { path: "/fencing", priority: 0.9 },
  { path: "/handyman", priority: 0.9 },
];

export default function sitemap() {
  return pages.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  }));
}
