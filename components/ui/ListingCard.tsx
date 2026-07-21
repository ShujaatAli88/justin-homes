import Link from "next/link";
import type { Listing } from "@/lib/idx";
import { formatPrice } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { StatIcon } from "@/components/ui/StatIcons";

const statusLabel: Record<Listing["status"], string> = {
  active: "Active",
  pending: "Pending",
  sold: "Sold",
};

export function ListingCard({ listing }: { listing: Listing }) {
  const isLand = listing.beds === 0 && listing.baths === 0 && listing.sqft === 0;

  return (
    <Link
      href={`/properties/${listing.slug}`}
      className="group flex h-full flex-col bg-black shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <SmartImage
          src={listing.images[0]}
          alt={`${listing.address.street}, ${listing.address.city}, ${listing.address.state}`}
          label="Listing photo"
          className="transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="absolute left-3 top-3 flex gap-2">
          <span className="bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
            {statusLabel[listing.status]}
          </span>
          {listing.originalPrice && (
            <span className="bg-kw-red px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Price Reduced
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-white">{formatPrice(listing.price)}</p>
            {listing.originalPrice && (
              <p className="text-sm text-gray-300 line-through">{formatPrice(listing.originalPrice)}</p>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-200">
            {listing.address.street}, {listing.address.city}, {listing.address.state}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 border-t-2 border-kw-red bg-white px-5 py-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-gray-700">
          {!isLand && listing.beds > 0 && (
            <span className="flex items-center gap-1.5">
              <StatIcon type="bed" /> {listing.beds} Beds
            </span>
          )}
          {!isLand && listing.baths > 0 && (
            <span className="flex items-center gap-1.5">
              <StatIcon type="bath" /> {listing.baths} Baths
            </span>
          )}
          {!isLand && listing.sqft > 0 && (
            <span className="flex items-center gap-1.5">
              <StatIcon type="sqft" /> {listing.sqft.toLocaleString()} SqFt
            </span>
          )}
          {listing.lotSizeAcres > 0 && (
            <span className="flex items-center gap-1.5">
              <StatIcon type="acres" /> {listing.lotSizeAcres} Acres
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black">
          View Property
          <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
