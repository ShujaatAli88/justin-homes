import Link from "next/link";
import type { Listing } from "@/lib/idx";
import { formatPrice } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { StatIcon, statTint, type StatIconType } from "@/components/ui/StatIcons";

const statusLabel: Record<Listing["status"], string> = {
  active: "Active",
  pending: "Pending",
  sold: "Sold",
};

function PropertyTypeIcon({ isLand }: { isLand: boolean }) {
  if (isLand) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 18l5-9 4 6 3-4 6 7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v10h12V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

function StatChip({ type, value }: { type: StatIconType; value: string }) {
  const tint = statTint[type];
  return (
    <span className={`flex items-center gap-1.5 px-2.5 py-1 ${tint.bg}`}>
      <span className={tint.icon}>
        <StatIcon type={type} className="h-3.5 w-3.5" />
      </span>
      <span className="text-xs font-medium text-gray-800">{value}</span>
    </span>
  );
}

export function ListingCard({ listing }: { listing: Listing }) {
  const isLand = listing.beds === 0 && listing.baths === 0 && listing.sqft === 0;

  return (
    <Link
      href={`/properties/${listing.slug}`}
      className="group flex h-full flex-col bg-black shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(206,1,31,0.35)]"
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
          className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="absolute left-3 top-3 flex items-center gap-1.5 border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
          {listing.status === "active" && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
          )}
          {statusLabel[listing.status]}
        </div>

        {listing.originalPrice && (
          <span className="absolute left-3 top-11 bg-kw-red px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Price Reduced
          </span>
        )}

        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-kw-red group-hover:bg-kw-red">
          <PropertyTypeIcon isLand={isLand} />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-center gap-2">
            <span aria-hidden className="h-6 w-1 bg-kw-red" />
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-white">{formatPrice(listing.price)}</p>
              {listing.originalPrice && (
                <p className="text-sm text-gray-300 line-through">{formatPrice(listing.originalPrice)}</p>
              )}
            </div>
          </div>
          <p className="mt-1 pl-3 text-sm text-gray-200">
            {listing.address.street}, {listing.address.city}, {listing.address.state}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 border-t-2 border-kw-red bg-white p-5">
        <div className="flex flex-wrap gap-2">
          {!isLand && listing.beds > 0 && <StatChip type="bed" value={`${listing.beds} Beds`} />}
          {!isLand && listing.baths > 0 && <StatChip type="bath" value={`${listing.baths} Baths`} />}
          {!isLand && listing.sqft > 0 && <StatChip type="sqft" value={`${listing.sqft.toLocaleString()} SqFt`} />}
          {listing.lotSizeAcres > 0 && <StatChip type="acres" value={`${listing.lotSizeAcres} Acres`} />}
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">View Property</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:bg-kw-red group-hover:translate-x-1">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
