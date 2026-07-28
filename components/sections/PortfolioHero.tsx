"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IDXEmbed } from "@/components/IDXEmbed";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/motion";

// NTREIS Matrix IDX "Active Listings" embed (idx=92674587) — same live feed
// used on the homepage; this page just gives it a dedicated, linkable URL.
const ACTIVE_LISTINGS_IDX = "92674587";

const highlights = ["Live MLS Feed", "Auto-Updates Daily", "Brownwood & Early, TX"];

export function PortfolioHero() {
  return (
    <>
      <div className="relative overflow-hidden bg-black pb-20 pt-32 sm:pb-24 sm:pt-40">
        <span
          aria-hidden
          className="font-nav pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[7rem] font-bold uppercase leading-none text-white/[0.03] sm:text-[11rem]"
        >
          Portfolio
        </span>
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(206,1,31,0.22)_0%,transparent_45%),radial-gradient(circle_at_85%_80%,rgba(206,1,31,0.15)_0%,transparent_45%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="container-xl relative text-center"
        >
          <motion.p variants={fadeInUp} className="font-nav text-xs uppercase tracking-[0.4em] text-kw-red">
            Portfolio
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="mx-auto mt-5 max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Active Listings, <span className="text-kw-red">Live</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="mx-auto mt-5 max-w-xl text-sm text-gray-300 sm:text-base">
            Every home and lot below is pulled straight from the MLS &mdash; no stale photos, no
            outdated prices. What you see is what&apos;s actually on the market right now across
            Brownwood, Early, and the surrounding area.
          </motion.p>

          <motion.ul variants={fadeInUp} className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm sm:text-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {h}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeInUp} className="mt-8">
            <Link
              href="/home-search/listings"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-nav text-sm font-semibold uppercase tracking-widest text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-kw-red hover:text-white hover:shadow-[0_15px_40px_rgba(206,1,31,0.4)]"
            >
              Search By Map Instead
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="bg-white py-16 sm:py-20">
        <div className="container-xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInUp}
            className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]"
          >
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
                Live MLS Feed
              </div>
            </div>

            <IDXEmbed idx={ACTIVE_LISTINGS_IDX} title="Active MLS Listings — Cadenhead Realty Group" minHeight={800} />
          </motion.div>

          <p className="mt-6 text-center text-xs uppercase tracking-widest text-gray-400">
            Powered directly by NTREIS MLS &mdash; updates automatically, no manual refresh needed.
          </p>
        </div>
      </div>
    </>
  );
}
