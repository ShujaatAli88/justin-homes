"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/Card";
import { ListingCard } from "@/components/ui/ListingCard";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/motion";
import type { Listing } from "@/lib/idx";

export function ActiveListings({ listings }: { listings: Listing[] }) {
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
          <Button href="/properties" variant="secondary" className="group/cta gap-3 rounded-full">
            View All
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">
              &rarr;
            </span>
          </Button>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {listings.map((listing) => (
            <motion.div key={listing.id} variants={fadeInUp}>
              <ListingCard listing={listing} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
