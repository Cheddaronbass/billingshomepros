# BHP search and agent discovery

Public listings are server-rendered. Category ItemList entries point to the same
stable business IDs as their profile pages. A WebPage identifies BHP as publisher,
not as the owner of each contractor. Missing contractor websites fall back to
their BHP profiles. Keep schema grounded in visible, verified business facts.

The wildcard robots rule permits search crawlers, including OAI-SearchBot, while
retaining /api/ and /quote exclusions. Do not add a bot-specific group that drops
those exclusions. Search access and model-training access are separate choices;
this change does not alter the existing training policy.

After publishing listing changes, notify IndexNow without rebuilding Vercel:

```sh
node scripts/notify-indexnow.mjs --dry-run /pros/156 /contractors-remodeling
node scripts/notify-indexnow.mjs /pros/156 /contractors-remodeling
```

Only submit genuinely changed canonical public URLs, including affected category
pages. This is an operator-run helper, not an automatic database trigger. The
public ownership file must be deployed first. HTTP 200 means received; 202 means
key verification pending. Neither guarantees indexing, citation, or ranking.
Do not put private submissions, API routes, or query-string personal data in URLs.

Keep sitemap dates omitted until authoritative content timestamps are available.
Do not add fabricated dates, ratings, qualifications or AI ranking claims.
