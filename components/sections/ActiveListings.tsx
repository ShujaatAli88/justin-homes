"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { IDXEmbed } from "@/components/IDXEmbed";
import { fadeInUp, viewportOnce } from "@/lib/motion";

// NTREIS Matrix IDX "Active Listings" embed (idx=44844573) — live MLS feed,
// auto-updates on the client's end. Replaces the old mock listing-card grid.
const ACTIVE_LISTINGS_IDX = "44844573";

export function ActiveListings() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <span
        aria-hidden
        className="font-nav pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[8rem] font-bold uppercase leading-none text-gray-50 sm:text-[12rem]"
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="mt-12 border-t-4 border-kw-red bg-gray-50 shadow-sm"
        >
          <IDXEmbed idx={ACTIVE_LISTINGS_IDX} title="Active MLS Listings — Cadenhead Realty Group" minHeight={800} />
        </motion.div>
      </div>
    </section>
  );
}
