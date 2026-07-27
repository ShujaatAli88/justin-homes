"use client";

import { motion } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/motion";
import { team, type TeamMember } from "@/data/team";
import { telHref } from "@/lib/utils";

const iconCommon = { viewBox: "0 0 24 24", className: "h-4 w-4 shrink-0", fill: "none", stroke: "currentColor", strokeWidth: 1.8 } as const;

function PhoneIcon() {
  return (
    <svg {...iconCommon}>
      <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconCommon}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg {...iconCommon}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

const contactChipClass =
  "flex items-center gap-3 rounded-full bg-gray-50 px-4 py-2.5 text-sm text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white";

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-kw-red/15 hover:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.15)] sm:p-8"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-kw-red/5 transition-transform duration-500 group-hover:scale-125"
      />

      <div className="relative flex items-center gap-4">
        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full shadow-md ring-4 ring-white">
          <SmartImage
            src={member.headshot}
            alt={member.name}
            label={`${member.name} headshot`}
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-kw-red/40" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-kw-red">{member.role}</p>
          <h3 className="text-xl font-bold text-black">{member.name}</h3>
          <p className="text-xs text-gray-500">
            {member.brokerage} &middot; {member.location}
          </p>
        </div>
      </div>

      <div className="relative mt-6 space-y-2.5">
        <a href={telHref(member.phone)} className={contactChipClass}>
          <PhoneIcon />
          {member.phone}
        </a>
        <a href={`mailto:${member.email}`} className={contactChipClass}>
          <MailIcon />
          {member.email}
        </a>
        {member.website && (
          <a href={`https://${member.website}`} target="_blank" rel="noopener noreferrer" className={contactChipClass}>
            <GlobeIcon />
            {member.website}
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function TeamContact() {
  return (
    <section className="bg-white pt-10 sm:pt-14">
      <div className="container-xl">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2"
        >
          {team.map((member) => (
            <TeamCard key={member.slug} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
