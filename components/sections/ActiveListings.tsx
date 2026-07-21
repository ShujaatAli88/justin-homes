"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/Card";
import { ListingCard } from "@/components/ui/ListingCard";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/motion";
import type { Listing } from "@/lib/idx";

export function ActiveListings({ listings }: { listings: Listing[] }) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Active Listings" title="Homes in the Area" />
          <Button href="/properties" variant="ghost">
            View All
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
