"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearch() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSearch(event) {
    event.preventDefault();

    const query = search
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

    if (!query) return;

    let destination = null;

    // PLUMBING — Water heaters
    if (
      query.includes("water heater") ||
      query.includes("waterheater") ||
      query.includes("waater heater") ||
      query.includes("watter heater") ||
      query.includes("hot water")
    ) {
      destination = "/plumbing?service=water-heaters";

    // PLUMBING — Drain / sewer
    } else if (
      query.includes("drain") ||
      query.includes("sewer") ||
      query.includes("clog")
    ) {
      destination = "/plumbing?service=drain-sewer";

    // PLUMBING — General
    } else if (
      query.includes("plumb") ||
      query.includes("plumer") ||
      query.includes("plummer") ||
      query.includes("pipe") ||
      query.includes("faucet") ||
      query.includes("toilet") ||
      query.includes("leak")
    ) {
      destination = "/plumbing";

    // HVAC — Furnace
    } else if (
      query.includes("furnace")
    ) {
      destination = "/hvac?service=furnace-repair";

    // HVAC — Air conditioning
    } else if (
      query.includes("air conditioning") ||
      query.includes("air conditioner") ||
      query.includes("a/c") ||
      query === "ac" ||
      query.includes("ac repair")
    ) {
      destination = "/hvac?service=air-conditioning";

    // HVAC — General
    } else if (
      query.includes("hvac") ||
      query === "heating" ||
      query.includes("heating repair") ||
      query.includes("heater repair") ||
      /\b(heat|heater|heaters|heating|cool|cooling|cooler|aircon|air con|ac unit|heat pump|thermostat|ventilation)\b/.test(query)
    ) {
      destination = "/hvac";

    // ELECTRICAL — Panels
    } else if (
      query.includes("panel") ||
      query.includes("breaker")
    ) {
      destination = "/electrical?service=panels-breakers";

    // ELECTRICAL — Lighting
    } else if (
      query.includes("light")
    ) {
      destination = "/electrical?service=lighting";

    // ELECTRICAL — Wiring
    } else if (
      query.includes("wiring") ||
      query.includes("wire")
    ) {
      destination = "/electrical?service=wiring";

    // ELECTRICAL — General
    } else if (
      query.includes("electric") ||
      query.includes("electrician")
    ) {
      destination = "/electrical";

    // WINDOWS & DOORS: check before "storm" roofing and "door repair" handyman.
    } else if (
      /\b(window(s)?|window\s+(replacement|installation|repair|installer|installers)|replacement\s+windows?|double[- ]pane|triple[- ]pane|energy[- ]efficient\s+windows?|glass\s+replacement|patio\s+doors?|sliding\s+(glass\s+)?doors?|entry\s+doors?|exterior\s+doors?|front\s+doors?|french\s+doors?|storm\s+doors?|door\s+(replacement|installation|repair|installer|installers))\b/.test(query) ||
      (/\bdoors?\b/.test(query) && !/\bgarage\b/.test(query))
    ) {
      destination = "/windows-doors";

    // ROOFING — Storm damage
    } else if (
      query.includes("storm") ||
      query.includes("hail")
    ) {
      destination = "/roofing?service=storm-damage";

    // ROOFING — Repair
    } else if (
      query.includes("roof repair") ||
      query.includes("leaking roof") ||
      query.includes("roof leak")
    ) {
      destination = "/roofing?service=roof-repair";

    // ROOFING — Replacement
    } else if (
      query.includes("roof replacement") ||
      query.includes("new roof")
    ) {
      destination = "/roofing?service=roof-replacement";

    // ROOFING — General
    } else if (
      query.includes("roof") ||
      query.includes("roofer")
    ) {
      destination = "/roofing";

    // FLOORING — Flooring material and refinishing searches before broad remodeling.
    } else if (/\b(refinish(?:ing)?|floor sanding|hardwood restoration)\b/.test(query)) {
      destination = "/flooring?service=refinishing";
    } else if (/\b(carpet|carpeting)\b/.test(query)) {
      destination = "/flooring?service=carpet";
    } else if (/\b(hardwood|wood flooring|wood floor)\b/.test(query)) {
      destination = "/flooring?service=hardwood";
    } else if (/\b(tile flooring|floor tile|tiling|tile installer|tile installation)\b/.test(query)) {
      destination = "/flooring?service=tile";
    } else if (/\b(lvp|lvt|vinyl floor|vinyl flooring|luxury vinyl|vinyl plank)\b/.test(query)) {
      destination = "/flooring?service=vinyl";
    } else if (/\b(flooring|floor installer|floor installers|floor installation|new floor|floor replacement|floors)\b/.test(query)) {
      destination = "/flooring";

    // CONTRACTORS — Additions
    } else if (
      query.includes("addition")
    ) {
      destination =
        "/contractors-remodeling?service=home-additions";

    // CONTRACTORS — Remodeling
    } else if (
      query.includes("remodel") ||
      query.includes("remodle") ||
      query.includes("renovation") ||
      query.includes("kitchen") ||
      query.includes("bathroom")
    ) {
      destination =
        "/contractors-remodeling?service=remodeling";

    // CONTRACTORS — General
    } else if (
      query.includes("contractor") ||
      query.includes("construction")
    ) {
      destination = "/contractors-remodeling";
    // LANDSCAPING — Common homeowner searches
    } else if (
      /\b(landscap\w*|lawn|mow\w*|grass|sprinkler\w*|irrigation|sod|yard|tree|trees|stump|shrubs?|bushes|hardscap\w*|retaining wall)\b/.test(query)
    ) {
      destination = "/landscaping";

    // PAINTING
    } else if (
      /\b(paint\w*|painter\w*|repaint\w*|stain\w*|wallpaper)\b/.test(query)
    ) {
      destination = "/painting";

    // CONCRETE
    } else if (
      /\b(concrete|cement|driveway\w*|sidewalk\w*|walkway\w*|patio\w*|slab\w*|foundation\w*|stamped concrete)\b/.test(query)
    ) {
      destination = "/concrete";

    // FENCING
    } else if (
      /\b(fenc\w*|fencing|gate|gates|chain link|privacy fence)\b/.test(query)
    ) {
      destination = "/fencing";

    // HANDYMAN — General household repairs
    } else if (
      /\b(handyman|handywoman|handyperson|drywall|sheetrock|odd jobs?|home maintenance|home repair\w*|small repairs?|fix\s+(?:my|a|the)|door repair|door installation|shelving|mount tv|tv mounting)\b/.test(query)
    ) {
      destination = "/handyman";
    }

    if (destination) {
      if (typeof window.gtag === "function") {
        window.gtag("event", "home_service_search", {
          search_term: query,
          destination,
          search_result: "matched",
        });
      }
      router.push(destination);
      return;
    }

    // Unknown searches return to service choices
    // instead of guessing the wrong category.
    if (typeof window.gtag === "function") {
      window.gtag("event", "home_service_search", {
        search_term: query,
        destination: "/#services",
        search_result: "unmatched",
      });
    }
    router.push("/#services");
  }

  return (
    <>
      <form className="searchBox" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="What do you need help with?"
          aria-label="Search home services"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button type="submit">Find a Pro</button>
      </form>

      <p className="searchHint">
        Try windows, flooring, plumbing, heating, roofing or remodeling
      </p>
    </>
  );
}
