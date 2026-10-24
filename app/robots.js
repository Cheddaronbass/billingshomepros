export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/quote"],
    },
    sitemap: "https://billingshomepros.com/sitemap.xml",
  };
}
