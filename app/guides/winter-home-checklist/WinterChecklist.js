"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./winter.module.css";

const groups = [
  {
    "id": "freeze",
    "title": "Before the freeze",
    "intro": "Start with water, warmth, and keeping the cold outside.",
    "tasks": [
      [
        "hoses",
        "Disconnect hoses & protect faucets",
        "Remove, drain, and store garden hoses. Where your home has dedicated indoor shutoffs, shut off and drain outdoor faucet lines according to the fixture instructions. Add compatible insulated covers; a cover alone cannot prevent every freeze.",
        "A simple first step against frozen fixtures.",
        "/plumbing",
        "Find plumbing pros"
      ],
      [
        "irrigation",
        "Winterize the sprinkler system",
        "Turn off seasonal irrigation and book winterization appropriate to your system. Have a qualified irrigation pro handle compressed-air blowouts; incorrect pressure or technique can cause damage or injury.",
        "Book this before sustained freezing weather.",
        "/landscaping",
        "Find irrigation help"
      ],
      [
        "heat",
        "Get the furnace ready",
        "Check or replace the filter using the equipment instructions. Test the thermostat, clear supply and return vents, and arrange service for unusual noises, unreliable heat, or overdue maintenance.",
        "Have a heating pro investigate gas-appliance problems.",
        "/hvac",
        "Find heating pros"
      ],
      [
        "drafts",
        "Seal doors, windows & garage gaps",
        "Check accessible weatherstripping, door sweeps, window seals, and the garage-door bottom seal. Repair worn seals and caulk appropriate gaps without blocking drainage holes or required ventilation.",
        "Start where you can feel a draft.",
        "/windows-doors",
        "Find window & door pros"
      ],
      [
        "pipes",
        "Protect vulnerable plumbing",
        "Look for exposed water lines in unheated spaces. Add suitable pipe insulation, keep garage doors closed when plumbing is inside, and locate your main water shutoff. Have a plumber assess recurring freezing problems.",
        "Use only listed pipe-heating products as directed.",
        "/plumbing",
        "Find plumbing help"
      ]
    ]
  },
  {
    "id": "snow",
    "title": "Before the first snow",
    "intro": "Give water a way out and make everyday winter access easier.",
    "tasks": [
      [
        "gutters",
        "Clear gutters & check drainage",
        "Arrange safe gutter cleaning and check that downspouts discharge away from the foundation. Look for drainage trouble at walkways and entries. Stay off icy ladders and roofs.",
        "Use a pro for elevated or hard-to-reach work.",
        "/handyman",
        "Find maintenance help"
      ],
      [
        "roof",
        "Inspect the roof from the ground",
        "Look for missing shingles, damaged flashing, sagging gutters, and signs of past leaks indoors. Have a roofer assess concerns before snow covers the roof.",
        "Recurring ice dams need an assessment of heat loss and ventilation.",
        "/roofing",
        "Find local roofers"
      ],
      [
        "fireplace",
        "Prepare the fireplace or wood stove",
        "Arrange a qualified chimney/fireplace inspection and cleaning when needed before use. Follow appliance instructions for fuel, clearances, and ash handling; keep combustibles away.",
        "An unused or unfamiliar chimney should be checked before lighting a fire.",
        null,
        null
      ],
      [
        "alarms",
        "Test smoke & carbon monoxide alarms",
        "Test alarms and check their age, batteries, and replacement instructions. Make sure everyone knows the escape plan and where to meet outside.",
        "An alarm that sounds needs action, not just a new battery.",
        "/electrical",
        "Find electricians"
      ],
      [
        "walks",
        "Set up for snow & ice",
        "Check your shovel or snowblower, outdoor lighting, steps, and handrails. Choose ice melt suitable for your surfaces and follow its label around plants and pets.",
        "Keep entryways well lit and supplies easy to reach.",
        "/handyman",
        "Find handyman services"
      ]
    ]
  },
  {
    "id": "winter",
    "title": "Throughout winter",
    "intro": "A few repeat checks help you stay ready when conditions change.",
    "tasks": [
      [
        "vents",
        "Keep outdoor vents clear",
        "After snowfall or drifting, check accessible furnace and dryer outlets and air intakes from the ground. Clear snow carefully without damaging equipment; follow manufacturer instructions.",
        "Blocked combustion vents can create a carbon monoxide hazard.",
        "/hvac",
        "Find heating help"
      ],
      [
        "supplies",
        "Build a storm & outage kit",
        "Keep flashlights, batteries, charged power banks, drinking water, shelf-stable food, blankets, and needed medicines accessible. Include household and pet needs and a way to receive weather alerts.",
        "Plan for several days and check supplies regularly.",
        null,
        null
      ],
      [
        "backup",
        "Plan safe backup heat & power",
        "Never use an oven, grill, or outdoor heater to heat your home. Run generators outdoors at least 20 feet from doors, windows, and vents, with exhaust directed away. Never connect one to a wall outlet.",
        "Have an electrician install appropriate transfer equipment.",
        "/electrical",
        "Find electricians"
      ],
      [
        "away",
        "Prepare before leaving home",
        "Keep adequate heat on, arrange for someone to check the home, and review any insurer requirements for an unattended property. Ask a plumber about water shutoff or winterization for your particular home.",
        "Know who can respond if heat or power fails.",
        "/plumbing",
        "Find plumbing pros"
      ],
      [
        "repeat",
        "Recheck after storms & cold snaps",
        "Check accessible areas for leaks, new drafts, snow-blocked exits, and slippery walkways. Follow local utility guidance during extreme cold. Contact a pro for lost heat, suspected frozen pipes, or roof leaks.",
        "Never thaw a pipe with an open flame.",
        "/handyman",
        "Find home maintenance help"
      ]
    ]
  }
];
const ids = groups.flatMap(group => group.tasks.map(task => task[0]));
const storageKey = "bhp-winter-checklist-v1";

export default function WinterChecklist() {
  const [checked, setChecked] = useState([]);
  const [storageReady, setStorageReady] = useState(false);
  const [saved, setSaved] = useState(true);
  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(value)) setChecked(value.filter(id => ids.includes(id)));
    } catch { setSaved(false); }
    setStorageReady(true);
  }, []);
  function update(next) {
    setChecked(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setSaved(true); }
    catch { setSaved(false); }
  }
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">Billings Home Pros<span>LOCAL HOME SERVICES • BILLINGS, MT</span></Link>
        <Link href="/">← Back to Home Pros</Link>
      </header>
      <div className={styles.wrap}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>THE BILLINGS HOMEOWNER’S SEASONAL GUIDE</p>
          <h1>Get your home<br/><span>winter ready.</span></h1>
          <p className={styles.lead}>Cold snaps. Snow days. Fewer surprises.</p>
          <p className={styles.intro}>A practical checklist for homes in Billings, Laurel, and Yellowstone County. Work through it a little at a time, and find local help when you need it.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#freeze">Start the checklist ↓</a>
            <button className={styles.secondary} onClick={() => window.print()}>Print checklist</button>
          </div>
          <div className={styles.summary}><span>15 practical tasks</span><span>3 seasonal stages</span><span>Free to use</span></div>
        </section>
        <div className={styles.toolbar}>
          <div><strong aria-live="polite">{checked.length} of {ids.length} completed</strong><p>{saved ? "Progress stays in this browser. No account needed." : "Progress is available for this visit; browser storage is unavailable."}</p></div>
          <button disabled={!storageReady || !checked.length} className={styles.reset} onClick={() => { if (window.confirm("Clear your winter checklist progress in this browser?")) update([]); }}>Reset checklist</button>
          <progress aria-label="Winter checklist completion" max={ids.length} value={checked.length}/>
        </div>
        <nav className={styles.jump} aria-label="Checklist stages">{groups.map((group, index) => <a key={group.id} href={"#" + group.id}><span>0{index + 1}</span>{group.title} ↓</a>)}</nav>
        <aside className={styles.note}><strong>Start with what your home needs now.</strong> If freezing weather has already arrived, prioritize exposed water lines and reliable heat. Use qualified professionals for gas, electrical, chimney, and elevated work.</aside>
        {groups.map((group, index) => <section key={group.id} id={group.id} className={styles.stage}>
          <div className={styles.stageHeading}><span className={styles.number}>0{index + 1}</span><div><h2>{group.title}</h2><p>{group.intro}</p></div></div>
          <div className={styles.grid}>{group.tasks.map(([id, title, detail, tip, href, label]) => <article key={id} className={styles.card} data-complete={checked.includes(id)}>
            <label className={styles.taskTitle}><input type="checkbox" checked={checked.includes(id)} disabled={!storageReady} onChange={event => update(event.target.checked ? [...checked, id] : checked.filter(value => value !== id))}/><h3>{title}</h3></label>
            <p>{detail}</p><p className={styles.tip}>{tip}</p>
            {href && <Link className={styles.proLink} href={href}>{label} <span aria-hidden="true">↗</span></Link>}
          </article>)}</div>
        </section>)}
        <section className={styles.help}><p className={styles.eyebrow}>LOCAL HELP, WHEN YOU NEED IT</p><h2>Some jobs need a second set of hands.</h2><p>Find Billings-area professionals for heating, plumbing, roofing, and home maintenance.</p><Link className={styles.primary} href="/">Find a local pro →</Link></section>
        <footer className={styles.footer}><p>General homeowner information. Follow equipment manuals, local codes, and professional guidance for your property. Listed businesses are independent providers.</p><p>Safety resources: <a href="https://www.ready.gov/winter-weather">Ready.gov winter weather</a> · <a href="https://www.cdc.gov/carbon-monoxide/about/">CDC carbon monoxide safety</a></p><Link href="/">← Billings Home Pros</Link></footer>
      </div>
    </main>
  );
}
