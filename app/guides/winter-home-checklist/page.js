import Link from "next/link";

export const metadata = {
  title: "Montana Winter Home Preparation Checklist",
  description: "A practical Billings, Montana winter home checklist: sprinklers, outdoor faucets, heating, drafts, gutters, and cold-weather safety.",
  alternates: { canonical: "/guides/winter-home-checklist" },
};

const tasks = [
  { title: "Disconnect hoses and protect outdoor faucets", detail: "Remove garden hoses, drain them, and store them indoors. Shut off and drain exterior faucet supply lines if your home has indoor shutoff valves. Use insulated faucet covers where appropriate.", href: "/plumbing", label: "Find local plumbers" },
  { title: "Winterize irrigation systems", detail: "Turn off your sprinkler system and arrange proper winterization before hard freezes. Compressed-air blowouts can damage systems or cause injury if done incorrectly; consider an irrigation professional.", href: "/landscaping", label: "Browse landscaping and irrigation pros" },
  { title: "Prepare your heating system", detail: "Replace or clean furnace filters according to the equipment instructions, check thermostat settings, keep vents clear, and schedule professional service if your system is overdue or acting unusually.", href: "/hvac", label: "Find heating professionals" },
  { title: "Seal drafts and check doors and windows", detail: "Inspect weatherstripping and caulk around accessible doors and windows. Replace damaged seals and check that doors latch properly.", href: "/handyman", label: "Find handyman services" },
  { title: "Check gutters, drainage, and roof condition", detail: "Clear accessible gutters safely, direct downspouts away from the foundation, and look for loose or damaged shingles from the ground. Avoid climbing icy roofs or ladders.", href: "/roofing", label: "Browse local roofers" },
  { title: "Protect pipes in cold areas", detail: "Insulate exposed pipes in unheated areas, close garage doors when plumbing is nearby, and learn where your main water shutoff is. During extreme cold, follow local utility guidance.", href: "/plumbing", label: "Find plumbing help" },
  { title: "Test safety equipment", detail: "Test smoke and carbon monoxide alarms and replace batteries or units as directed by their manufacturers. Keep furnace exhaust and outdoor vents clear of snow. Never run grills or generators indoors.", href: "/electrical", label: "Browse electricians" },
  { title: "Prepare for snow and ice", detail: "Check snow shovels, ice melt suitability for your surfaces and pets, exterior lighting, and safe walkways. Keep emergency supplies available for winter storms.", href: "/handyman", label: "Browse handyman services" },
];

export default function WinterHomeChecklist() {
  return (
    <main style={{ minHeight: "100vh", background: "#0b1117", color: "#e7f0f7", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <header style={{ padding: "20px 7%", borderBottom: "1px solid #273d50", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        <Link href="/" style={{ color: "#fff", fontWeight: 900, fontSize: 21 }}>Billings Home Pros</Link>
        <Link href="/" style={{ color: "#25b9ff", fontWeight: 700 }}>← Back to Home Pros</Link>
      </header>
      <article style={{ maxWidth: 920, margin: "0 auto", padding: "55px 22px 85px" }}>
        <p style={{ color: "#25b9ff", fontSize: 13, fontWeight: 800, letterSpacing: 2 }}>BILLINGS, MONTANA • SEASONAL HOME GUIDE</p>
        <h1 style={{ color: "#fff", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "clamp(2.3rem, 6vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 1.1, margin: "16px 0 20px" }}>Winter Home Preparation Checklist</h1>
        <p style={{ color: "#c4d2df", fontSize: 18, lineHeight: 1.7, maxWidth: 760 }}>Montana winters can be tough on a home. Use this quick checklist to prepare for freezing temperatures, snow, and heating season in Billings and Yellowstone County.</p>
        <p style={{ color: "#b7cad8", lineHeight: 1.6, padding: "14px 18px", border: "1px solid #33516a", borderRadius: 10, background: "#122332" }}>Start before the first hard freeze when possible. If a task involves electrical work, gas appliances, heights, or unfamiliar equipment, hire a qualified professional.</p>
        <div style={{ display: "grid", gap: 14, marginTop: 34 }}>
          {tasks.map((task, i) => (
            <section key={task.title} style={{ padding: "22px 24px", background: "#142332", border: "1px solid #2b4357", borderRadius: 12 }}>
              <h2 style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "clamp(1.1rem, 3vw, 1.35rem)", color: "#fff", margin: "0 0 10px", lineHeight: 1.35 }}>{i + 1}. {task.title}</h2>
              <p style={{ color: "#c4d2df", lineHeight: 1.65, margin: "0 0 13px" }}>{task.detail}</p>
              <Link href={task.href} style={{ color: "#58caff", fontWeight: 800, textDecoration: "underline", textUnderlineOffset: 4 }}>{task.label} →</Link>
            </section>
          ))}
        </div>
        <p style={{ color: "#9cb1c1", lineHeight: 1.6, fontSize: 14, marginTop: 30 }}>General homeowner information only. Follow equipment manuals, local codes, and qualified professional guidance for your property. Businesses listed on Billings Home Pros are independent providers.</p>
        <Link href="/" style={{ display: "inline-block", marginTop: 18, color: "#25b9ff", fontWeight: 800 }}>← Find more Billings home services</Link>
      </article>
    </main>
  );
}
