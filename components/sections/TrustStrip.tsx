"use client";

import Image from "next/image";

type Badge =
  | { type: "image"; src: string; alt: string; height?: string; treatment?: "invert" }
  | { type: "text"; label: string; sublabel?: string; icon: "mls" };

const badges: Badge[] = [
  // White artwork on a transparent PNG — already visible with no help needed.
  { type: "image", src: "/logo.png", alt: "Cadenhead Realty Group" },
  // Solid red artwork on a transparent PNG (verified pixel-by-pixel — no
  // black content at all) — no backdrop needed here either.
  { type: "image", src: "/images/kw-logo-tight.png", alt: "Keller Williams", height: "h-8 sm:h-9" },
  // Solid black line art — inverting to white avoids needing any backdrop at all.
  {
    type: "image",
    src: "/images/badges/realtor-eho-logo.png",
    alt: "REALTOR / Equal Housing Opportunity",
    height: "h-12 sm:h-14",
    treatment: "invert",
  },
  { type: "text", label: "MLS", sublabel: "Member", icon: "mls" },
];

function BadgeIcon({ icon }: { icon: "mls" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0">
      <path d="M10 2.5 2 9.3h1.8V19h9.4v-9.7H15L10 2.5Z" fill="#f2f2f2" />
      <rect x="6" y="13" width="3.6" height="4.5" fill="#0a0a0a" />
      <circle cx="16.5" cy="16.5" r="3.4" fill="none" stroke="#ce011f" strokeWidth="1.8" />
      <line x1="19" y1="19" x2="21.7" y2="21.7" stroke="#ce011f" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BadgeItem({ badge }: { badge: Badge }) {
  if (badge.type === "image") {
    return (
      <Image
        src={badge.src}
        alt={badge.alt}
        width={355}
        height={184}
        unoptimized
        className={`w-auto transition-transform duration-300 hover:scale-110 ${
          badge.treatment === "invert" ? "" : "drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
        } ${badge.height ?? "h-10 sm:h-12"}`}
        style={badge.treatment === "invert" ? { filter: "invert(1)" } : undefined}
      />
    );
  }
  return (
    <span className="flex items-center gap-3 transition-transform duration-300 hover:scale-110">
      <BadgeIcon icon={badge.icon} />
      <span className="font-nav text-left text-xs uppercase leading-tight tracking-widest text-white">
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
    <section className="relative overflow-hidden bg-black py-14">
      <div aria-hidden className="animate-gradient-flow absolute inset-0" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-kw-red/70 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-kw-red/70 to-transparent" />

      <p className="font-nav relative mb-8 text-center text-xs uppercase tracking-[0.4em] text-white/50">
        Trusted &amp; Certified
      </p>

      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
          {track.map((badge, i) => (
            <span key={i} className="flex items-center">
              <span className="flex items-center px-8 sm:px-12">
                <BadgeItem badge={badge} />
              </span>
              <span aria-hidden className="h-8 w-px bg-white/10" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
