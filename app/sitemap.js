import { createClient } from "@supabase/supabase-js";

const baseUrl = "https://www.billingshomepros.com";

const pages = [
  { path: "", priority: 1.0 },
  { path: "/site-map", priority: 0.5 },
  { path: "/our-progress", priority: 0.5 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  { path: "/get-listed", priority: 0.7 },
  { path: "/plumbing", priority: 0.9 },
  { path: "/hvac", priority: 0.9 },
  { path: "/hvac/ac-repair", priority: 0.8 },
  { path: "/hvac/furnace-repair", priority: 0.8 },
  { path: "/plumbing/water-heater-repair", priority: 0.8 },
  { path: "/roofing/roof-replacement", priority: 0.8 },
  { path: "/guides/roof-replacement-cost-billings-mt", priority: 0.7 },
  { path: "/guides/winter-home-checklist", priority: 0.7 },
  { path: "/electrical", priority: 0.9 },
  { path: "/roofing", priority: 0.9 },
  { path: "/windows-doors", priority: 0.9 },
  { path: "/contractors-remodeling", priority: 0.9 },
  { path: "/landscaping", priority: 0.9 },
  { path: "/painting", priority: 0.9 },
  { path: "/flooring", priority: 0.9 },
  { path: "/concrete", priority: 0.9 },
  { path: "/fencing", priority: 0.9 },
  { path: "/handyman", priority: 0.9 },
];

export default async function sitemap() {
  // Never present an incomplete sitemap as successful when the database is unavailable.
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);
  const profilePages = [];
  const batchSize = 1000;
  for (let start = 0; ; start += batchSize) {
    const { data, error } = await supabase
      .from("businesses")
      .select("id")
      // Duplicated cross-category profiles permanently redirect to canonical IDs.
      .not("id", "in", "(117,118)")
      .order("id")
      .range(start, start + batchSize - 1);
    if (error) {
      console.error("Unable to load contractor sitemap entries:", error);
      throw new Error("Contractor sitemap generation failed");
    }
    if (!data) throw new Error("Contractor sitemap query returned no data");
    profilePages.push(...data.map(({ id }) => ({
      url: `${baseUrl}/pros/${id}`, changeFrequency: "monthly", priority: 0.6,
    })));
    if (data.length < batchSize) break;
  }
  return pages.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    // Omit lastModified until authoritative content update timestamps are available.
    changeFrequency: "weekly",
    priority,
  })).concat(profilePages);
}
