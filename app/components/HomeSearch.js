"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearch() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSearch(event) {
    event.preventDefault();

    const query = search.trim().toLowerCase();

    if (!query) return;

    let destination = null;

    if (
      query.includes("water heater") ||
      query.includes("hot water")
    ) {
      destination = "/plumbing?service=water-heaters";
    } else if (
      query.includes("drain") ||
      query.includes("sewer") ||
      query.includes("clog")
    ) {
      destination = "/plumbing?service=drain-sewer";
    } else if (
      query.includes("plumb") ||
      query.includes("pipe") ||
      query.includes("faucet") ||
      query.includes("toilet")
    ) {
      destination = "/plumbing";
    } else if (
      query.includes("furnace")
    ) {
      destination = "/hvac?service=furnace-repair";
    } else if (
      query.includes("air conditioning") ||
      query === "ac" ||
      query.includes("a/c") ||
      query.includes("air conditioner")
    ) {
      destination = "/hvac?service=air-conditioning";
    } else if (
      query.includes("heat") ||
      query.includes("hvac")
    ) {
      destination = "/hvac";
    } else if (
      query.includes("panel") ||
      query.includes("breaker")
    ) {
      destination = "/electrical?service=panels-breakers";
    } else if (
      query.includes("light")
    ) {
      destination = "/electrical?service=lighting";
    } else if (
      query.includes("wiring") ||
      query.includes("wire")
    ) {
      destination = "/electrical?service=wiring";
    } else if (
      query.includes("electric")
    ) {
      destination = "/electrical";
    } else if (
      query.includes("storm") ||
      query.includes("hail")
    ) {
      destination = "/roofing?service=storm-damage";
    } else if (
      query.includes("roof repair") ||
      query.includes("leaking roof") ||
      query.includes("roof leak")
    ) {
      destination = "/roofing?service=roof-repair";
    } else if (
      query.includes("roof replacement") ||
      query.includes("new roof")
    ) {
      destination = "/roofing?service=roof-replacement";
    } else if (
      query.includes("roof")
    ) {
      destination = "/roofing";
    } else if (
      query.includes("addition")
    ) {
      destination = "/contractors-remodeling?service=home-additions";
    } else if (
      query.includes("remodel") ||
      query.includes("renovation") ||
      query.includes("kitchen") ||
      query.includes("bathroom")
    ) {
      destination = "/contractors-remodeling?service=remodeling";
    } else if (
      query.includes("contractor") ||
      query.includes("construction")
    ) {
      destination = "/contractors-remodeling";
    }

    if (destination) {
      router.push(destination);
      return;
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
        Try plumbing, furnace repair, roofing, electrical or remodeling
      </p>
    </>
  );
}
