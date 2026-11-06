// Submit only public BHP pages that actually changed. No deployment is required.
import { readFile } from "node:fs/promises";

const origin = "https://billingshomepros.com";
const key = (await readFile(new URL("../public/indexnow-key.txt", import.meta.url), "utf8")).trim();
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const paths = args.filter((arg) => arg !== "--dry-run");
if (!paths.length) throw new Error("Provide changed public page paths, e.g. /pros/156 /contractors-remodeling");
const urlList = [...new Set(paths.map((path) => {
  const url = new URL(path, origin);
  if (url.origin !== origin || url.username || url.password || url.search || url.hash ||
      /^\/(api|quote|admin)(\/|$)/.test(url.pathname)) {
    throw new Error(`Not a public canonical BHP page: ${path}`);
  }
  return url.href;
}))];
if (urlList.length > 10000) throw new Error("IndexNow allows at most 10,000 URLs per request");
const payload = { host: new URL(origin).host, key, keyLocation: `${origin}/indexnow-key.txt`, urlList };
if (dryRun) {
  console.log(JSON.stringify({ dryRun: true, urlList }, null, 2));
} else {
  const proof = await fetch(payload.keyLocation, { signal: AbortSignal.timeout(15000) });
  if (!proof.ok || (await proof.text()).trim() !== key) throw new Error("Live IndexNow ownership file does not match; no notification sent");
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30000),
  });
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`IndexNow rejected notification: HTTP ${response.status}`);
  }
  console.log(JSON.stringify({ status: response.status, submitted: urlList.length,
    message: response.status === 202 ? "Received; key validation pending" : "Received; indexing is not guaranteed" }));
}
