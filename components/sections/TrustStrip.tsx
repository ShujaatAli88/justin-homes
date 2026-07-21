import Image from "next/image";

type Badge =
  | { type: "image"; src: string; alt: string; dark?: boolean; height?: string }
  | { type: "text"; label: string; sublabel?: string; icon: "mls" };

const badges: Badge[] = [
  { type: "image", src: "/logo.png", alt: "Cadenhead Realty Group", dark: true },
  { type: "image", src: "/images/kw-logo.png", alt: "Keller Williams" },
  { type: "image", src: "/images/badges/realtor-eho-logo.png", alt: "REALTOR / Equal Housing Opportunity", height: "h-12 sm:h-14" },
  { type: "text", label: "MLS", sublabel: "Member", icon: "mls" },
];

function BadgeIcon({ icon }: { icon: "mls" }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path d="M10 2.5 2 9.3h1.8V19h9.4v-9.7H15L10 2.5Z" fill="#0a0a0a" />
        <rect x="6" y="13" width="3.6" height="4.5" fill="#f2f2f2" />
        <circle cx="16.5" cy="16.5" r="3.4" fill="none" stroke="#ce011f" strokeWidth="1.8" />
        <line x1="19" y1="19" x2="21.7" y2="21.7" stroke="#ce011f" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function BadgeItem({ badge }: { badge: Badge }) {
  if (badge.type === "image") {
    return (
      <span className={badge.dark ? "flex items-center bg-black p-2" : "flex items-center"}>
        <Image
          src={badge.src}
          alt={badge.alt}
          width={355}
          height={184}
          unoptimized
          className={`w-auto ${badge.height ?? "h-9 sm:h-10"}`}
        />
      </span>
    );
  }
  return (
    <span className="flex items-center gap-3 border border-gray-300 px-5 py-3">
      <BadgeIcon icon={badge.icon} />
      <span className="font-nav text-left text-xs uppercase leading-tight tracking-widest text-black">
        {badge.label}
        {badge.sublabel && (
          <>
            <br />
            {badge.sublabel}
          </>
        )}
      </span>
    </span>
  );
}

export function TrustStrip() {
  const track = [...badges, ...badges, ...badges, ...badges];

  return (
    <section className="overflow-hidden border-y border-gray-200 bg-white py-10">
      <div className="flex w-max animate-marquee items-center">
        {track.map((badge, i) => (
          <span key={i} className="flex items-center">
            <span className="flex items-center px-8 sm:px-12">
              <BadgeItem badge={badge} />
            </span>
            <span aria-hidden className="h-8 w-px bg-gray-200" />
          </span>
        ))}
      </div>
    </section>
  );
}
