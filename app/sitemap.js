import { createClient } from "@supabase/supabase-js";

const baseUrl = "https://billingshomepros.com";

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
  { path: "/electrical", priority: 0.9 },
  { path: "/roofing", priority: 0.9 },
  { path: "/contractors-remodeling", priority: 0.9 },
  { path: "/landscaping", priority: 0.9 },
  { path: "/painting", priority: 0.9 },
  { path: "/concrete", priority: 0.9 },
  { path: "/fencing", priority: 0.9 },
  { path: "/handyman", priority: 0.9 },
];

export default async function sitemap() {
  let profilePages = [];
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);
    const { data, error } = await supabase.from("businesses").select("id").order("id");
    if (!error && data) profilePages = data.map(({ id }) => ({ url: `${baseUrl}/pros/${id}`, changeFrequency: "monthly", priority: 0.6 }));
  } catch (error) {
    console.error("Unable to load contractor sitemap entries:", error);
  }
  return pages.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    // Omit lastModified until authoritative content update timestamps are available.
    changeFrequency: "weekly",
    priority,
  })).concat(profilePages);
}
