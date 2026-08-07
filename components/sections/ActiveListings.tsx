"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { IDXEmbed } from "@/components/IDXEmbed";
import { fadeInUp, viewportOnce } from "@/lib/motion";

// NTREIS Matrix IDX "Active Listings" embed (idx=6fd645a0) — live MLS feed,
// auto-updates on the client's end. Replaces the old mock listing-card grid.
// Recreated under Justin's own Matrix account (2026-08) so it's fully
// self-manageable — the original idx=92674587 wasn't owned by his login.
const ACTIVE_LISTINGS_IDX = "6fd645a0";

const highlights = ["Direct MLS Feed", "Auto-Updates Daily", "Brownwood & Early, TX"];

export function ActiveListings() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <span
        aria-hidden
        className="font-nav pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[8rem] font-bold leading-none text-gray-50 sm:text-[12rem]"
      >
        Listings
      </span>

      <div className="container-xl relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Active Listings" title="Homes in the Area" />
          <Button href="/home-search/listings" variant="secondary" className="group/cta gap-3 rounded-full">
            Search All Homes
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">
              &rarr;
            </span>
          </Button>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="mt-6 flex flex-wrap items-center gap-3"
        >
          {highlights.map((h) => (
            <li
              key={h}
              className="flex items-center gap-2 border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-600"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-kw-red">
                <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" />
              </svg>
              {h}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="relative mt-8 overflow-hidden rounded-2xl border border-gray-100 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] transition-shadow duration-500 hover:shadow-[0_40px_100px_-25px_rgba(206,1,31,0.25)]"
        >
          <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-kw-red" />
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-500">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kw-red opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-kw-red" />
              </span>
              Live MLS Feed
            </div>
          </div>

          <IDXEmbed idx={ACTIVE_LISTINGS_IDX} title="Active MLS Listings — Cadenhead Realty Group" minHeight={800} />
        </motion.div>
      </div>
    </section>
  );
}
