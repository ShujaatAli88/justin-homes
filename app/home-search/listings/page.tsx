import type { Metadata } from "next";
import { IDXEmbed } from "@/components/IDXEmbed";

// NTREIS Matrix IDX "Map Search" embed (idx=eddb4588) — live, map-based MLS
// search served cross-domain from the client's MLS; content auto-updates on
// their end, nothing here is mock data. See components/IDXEmbed.tsx for the
// domain-restriction note (blank on localhost, live on cadenheadrealty.com).
const MAP_SEARCH_IDX = "eddb4588";

const highlights = ["Live Map Search", "Auto-Updates Daily", "Brownwood & Early, TX"];

export const metadata: Metadata = {
  title: "Home Search",
  description:
    "Search active Brownwood & Early, TX area homes on an interactive map, powered by live MLS data from Cadenhead Realty Group.",
};

export default function HomeSearchPage() {
  return (
    <>
      {/* Black header band (matches every other page's hero) so the fixed
          navbar's transparent/white-text state stays legible at scroll 0 —
          a light bg here would make the nav invisible until scrolled. */}
      <div className="relative overflow-hidden bg-black pb-14 pt-32 sm:pb-16 sm:pt-40">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(206,1,31,0.22)_0%,transparent_45%),radial-gradient(circle_at_85%_80%,rgba(206,1,31,0.15)_0%,transparent_45%)]"
        />
        <div className="container-xl relative max-w-2xl">
          <p className="font-nav text-xs uppercase tracking-[0.3em] text-kw-red">Home Search</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Find Your Next Home
          </h1>
          <p className="mt-4 text-base text-gray-300 sm:text-lg">
            Search live, active listings across Brownwood, Early, and the surrounding area directly
            on the map below &mdash; powered by our MLS, updated in real time.
          </p>

          <ul className="mt-6 flex flex-wrap items-center gap-3">
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white py-16 sm:py-20">
        <div className="container-xl">
          <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] transition-shadow duration-500 hover:shadow-[0_40px_100px_-25px_rgba(206,1,31,0.25)]">
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-kw-red" />
              </div>
              <div className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-widest text-gray-500">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kw-red opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-kw-red" />
                </span>
                Live Map Search
              </div>
            </div>

            <IDXEmbed idx={MAP_SEARCH_IDX} title="Map-Based Home Search — Cadenhead Realty Group" minHeight={900} />
          </div>

          <p className="mt-6 text-center text-xs uppercase tracking-widest text-gray-400">
            Powered directly by NTREIS MLS &mdash; updates automatically, no manual refresh needed.
          </p>
        </div>
      </div>
    </>
  );
}
