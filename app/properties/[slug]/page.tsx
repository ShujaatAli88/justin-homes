import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SmartImage } from "@/components/ui/SmartImage";
import { ContactTriggerButton } from "@/components/ui/ContactTriggerButton";
import { StatIcon, type StatIconType } from "@/components/ui/StatIcons";
import { idxProvider } from "@/lib/idx";
import { formatPrice, telHref } from "@/lib/utils";
import { agent } from "@/data/agent";

const statTint: Record<StatIconType, { bg: string; ring: string; icon: string }> = {
  bed: { bg: "bg-rose-50", ring: "ring-rose-100", icon: "text-kw-red" },
  bath: { bg: "bg-sky-50", ring: "ring-sky-100", icon: "text-sky-600" },
  sqft: { bg: "bg-amber-50", ring: "ring-amber-100", icon: "text-amber-600" },
  acres: { bg: "bg-emerald-50", ring: "ring-emerald-100", icon: "text-emerald-600" },
};

function StatTile({ type, value, label }: { type: StatIconType; value: string; label: string }) {
  const tint = statTint[type];
  return (
    <div className={`flex items-center gap-3 border ${tint.ring} ${tint.bg} px-4 py-3`}>
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white ${tint.icon}`}>
        <StatIcon type={type} className="h-5 w-5" />
      </span>
      <div>
        <p className="text-lg font-bold leading-tight text-black">{value}</p>
        <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      </div>
    </div>
  );
}

const statusLabel: Record<string, string> = {
  active: "Active",
  pending: "Pending",
  sold: "Sold",
};

const propertyTypeLabel: Record<string, string> = {
  "single-family": "Single Family Residence",
  manufactured: "Manufactured Home",
  land: "Unimproved Land",
  acreage: "Acreage",
  ranch: "Ranch",
  townhome: "Townhome",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await idxProvider.getListingBySlug(slug);
  if (!listing) return {};

  return {
    title: `${listing.address.street}, ${listing.address.city} | ${formatPrice(listing.price)}`,
    description: listing.description.slice(0, 155),
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await idxProvider.getListingBySlug(slug);

  if (!listing) notFound();

  const isLand = listing.beds === 0 && listing.baths === 0 && listing.sqft === 0;
  const paragraphs = listing.description.split("\n\n").filter(Boolean);

  const details: { label: string; value: string }[] = [
    { label: "MLS #", value: listing.mlsId },
    { label: "Property Type", value: propertyTypeLabel[listing.propertyType] ?? listing.propertyType },
    ...(listing.sqft > 0 ? [{ label: "Living Area", value: `${listing.sqft.toLocaleString()} sq ft` }] : []),
    { label: "Lot Size", value: `${listing.lotSizeAcres} acres` },
    ...(listing.yearBuilt ? [{ label: "Year Built", value: String(listing.yearBuilt) }] : []),
    ...(listing.daysOnSite ? [{ label: "Days on Site", value: `${listing.daysOnSite} Days` }] : []),
    ...(listing.hvac ? [{ label: "HVAC", value: listing.hvac }] : []),
    ...(listing.parking ? [{ label: "Parking", value: listing.parking }] : []),
  ];

  return (
    <div className="bg-white pb-24 pt-28 sm:pt-32">
      <div className="container-xl">
        <Link href="/properties" className="animated-underline text-sm font-medium text-gray-600">
          &larr; Back to Listings
        </Link>

        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden bg-black sm:aspect-[21/9]">
          <SmartImage src={listing.images[0]} alt={`${listing.address.street} photo`} label="Listing photo" />
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
              {statusLabel[listing.status]}
            </span>
            {listing.originalPrice && (
              <span className="bg-kw-red px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Price Reduced
              </span>
            )}
            <span className="bg-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Virtual Tour Available
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="text-3xl font-bold sm:text-4xl">{formatPrice(listing.price)}</h1>
              {listing.originalPrice && (
                <span className="text-lg text-gray-400 line-through">{formatPrice(listing.originalPrice)}</span>
              )}
            </div>
            <p className="mt-2 text-lg text-gray-700">
              {listing.address.street}, {listing.address.city}, {listing.address.state}{" "}
              {listing.address.zip}
            </p>
            {listing.estimatedPayment && (
              <p className="mt-2 text-sm text-gray-500">
                Estimated payment:{" "}
                <span className="font-semibold text-kw-red">${listing.estimatedPayment.toLocaleString()}/mo</span>{" "}
                &mdash; estimation provided by Keller Williams Realty, LLC. Actual payment may vary based on
                rate, taxes, insurance, and HOA dues.
              </p>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {!isLand && listing.beds > 0 && (
                <StatTile type="bed" value={String(listing.beds)} label={listing.beds === 1 ? "Bed" : "Beds"} />
              )}
              {!isLand && listing.baths > 0 && (
                <StatTile type="bath" value={String(listing.baths)} label={listing.baths === 1 ? "Bath" : "Baths"} />
              )}
              {!isLand && listing.sqft > 0 && (
                <StatTile type="sqft" value={listing.sqft.toLocaleString()} label="Sq Ft" />
              )}
              {listing.lotSizeAcres > 0 && (
                <StatTile type="acres" value={String(listing.lotSizeAcres)} label="Acres" />
              )}
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold">Property Description</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-700">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold">Property Details</h2>
              <dl className="mt-4 divide-y divide-gray-100 border border-gray-100 bg-gray-50/60 px-5">
                {details.map((d) => (
                  <div key={d.label} className="flex flex-wrap justify-between gap-4 py-3 text-sm">
                    <dt className="text-gray-500">{d.label}</dt>
                    <dd className="text-right font-medium text-gray-900">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 border-t-4 border-kw-red bg-gray-50 p-7">
              <div className="flex items-center gap-3">
                <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-full">
                  <SmartImage src={agent.headshot} alt={agent.name} label="Agent" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-kw-red">Interested?</p>
                  <p className="text-sm font-medium text-gray-700">{agent.name}</p>
                </div>
              </div>
              <h3 className="mt-4 text-xl font-bold">Let&apos;s Talk About This Property</h3>
              <p className="mt-3 text-sm text-gray-600">
                Reach out to {agent.name} for details, to schedule a private showing, or to make an
                offer.
              </p>
              <ContactTriggerButton size="lg" className="mt-6 w-full">
                Schedule a Showing
              </ContactTriggerButton>
              <a
                href={telHref(agent.phone)}
                className="mt-3 block text-center text-sm font-semibold text-gray-700 hover:text-kw-red"
              >
                {agent.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
