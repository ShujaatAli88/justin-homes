import type { Metadata } from "next";
import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/Card";
import { IDXEmbed } from "@/components/IDXEmbed";

// NTREIS Matrix IDX "Active Listings" embed (idx=44844573) — same live feed
// used on the homepage; this page just gives it a dedicated, linkable URL.
const ACTIVE_LISTINGS_IDX = "44844573";

export const metadata: Metadata = {
  title: "Portfolio | Active Listings",
  description:
    "Browse active Brownwood & Early, TX area listings from Cadenhead Realty Group, updated live from the MLS.",
};

export default function PropertiesPage() {
  return (
    <div className="bg-white pb-24 pt-32 sm:pt-40">
      <div className="container-xl">
        <div className="max-w-2xl">
          <SectionEyebrow>Portfolio</SectionEyebrow>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Active Listings</h1>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            A live look at homes and land currently available across Brownwood, Early, and the
            surrounding area, updated directly from the MLS.
          </p>
          <Link
            href="/home-search/listings"
            className="animated-underline mt-4 inline-block text-sm font-semibold text-kw-red"
          >
            Prefer to search by map? &rarr;
          </Link>
        </div>

        <div className="mt-14 border-t-4 border-kw-red bg-gray-50 shadow-sm">
          <IDXEmbed idx={ACTIVE_LISTINGS_IDX} title="Active MLS Listings — Cadenhead Realty Group" minHeight={800} />
        </div>
      </div>
    </div>
  );
}
