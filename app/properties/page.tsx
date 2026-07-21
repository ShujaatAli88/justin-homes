import type { Metadata } from "next";
import { ListingCard } from "@/components/ui/ListingCard";
import { SectionEyebrow } from "@/components/ui/Card";
import { idxProvider } from "@/lib/idx";

export const metadata: Metadata = {
  title: "Portfolio | Active Listings",
  description: "Browse active Brownwood & Early, TX area listings from Cadenhead Realty Group.",
};

export default async function PropertiesPage() {
  const listings = await idxProvider.searchListings({});

  return (
    <div className="bg-white pb-24 pt-32 sm:pt-40">
      <div className="container-xl">
        <div className="max-w-2xl">
          <SectionEyebrow>Portfolio</SectionEyebrow>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Active Listings</h1>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            A look at homes and land currently available across Brownwood, Early, and the
            surrounding area.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}
