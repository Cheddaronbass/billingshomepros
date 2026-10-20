export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/quote"],
    },
    sitemap: "https://www.billingshomepros.com/sitemap.xml",
  };
}
