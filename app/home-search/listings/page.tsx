import type { Metadata } from "next";
import { IDXEmbed } from "@/components/IDXEmbed";
import { SectionEyebrow } from "@/components/ui/Card";

// NTREIS Matrix IDX "Map Search" embed (idx=64914572) — live, map-based MLS
// search served cross-domain from the client's MLS; content auto-updates on
// their end, nothing here is mock data. See components/IDXEmbed.tsx for the
// domain-restriction note (blank on localhost, live on cadenheadrealty.com).
const MAP_SEARCH_IDX = "64914572";

export const metadata: Metadata = {
  title: "Home Search",
  description:
    "Search active Brownwood & Early, TX area homes on an interactive map, powered by live MLS data from Cadenhead Realty Group.",
};

export default function HomeSearchPage() {
  return (
    <div className="bg-white pb-24 pt-32 sm:pt-40">
      <div className="container-xl">
        <div className="max-w-2xl">
          <SectionEyebrow>Home Search</SectionEyebrow>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Find Your Next Home</h1>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            Search live, active listings across Brownwood, Early, and the surrounding area directly
            on the map below &mdash; powered by our MLS, updated in real time.
          </p>
        </div>

        <div className="mt-12 border-t-4 border-kw-red bg-gray-50 shadow-sm">
          <IDXEmbed idx={MAP_SEARCH_IDX} title="Map-Based Home Search — Cadenhead Realty Group" minHeight={900} />
        </div>
      </div>
    </div>
  );
}
