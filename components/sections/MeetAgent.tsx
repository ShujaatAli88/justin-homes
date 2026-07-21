"use client";

import { motion } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { SocialIcon, type SocialPlatform } from "@/components/ui/SocialIcons";
import { fadeInUp, viewportOnce } from "@/lib/motion";
import { agent } from "@/data/agent";
import { isPlaceholder } from "@/lib/utils";

const socialLinks: { platform: SocialPlatform; href: string }[] = [
  { platform: "youtube", href: agent.social.youtube },
  { platform: "facebook", href: agent.social.facebook },
  { platform: "instagram", href: agent.social.instagram },
  { platform: "tiktok", href: agent.social.tiktok },
];

export function MeetAgent() {
  const bioParagraphs = isPlaceholder(agent.bio)
    ? ["{{CADENHEAD_BIO}}"]
    : agent.bio.split("\n\n").filter(Boolean);

  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="container-xl grid gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden lg:max-w-none">
            <SmartImage src={agent.headshot} alt={agent.name} label="Agent headshot" />
          </div>
          <div className="absolute bottom-0 left-0 max-w-[85%] bg-black px-8 py-7 sm:px-10 sm:py-8">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-kw-red" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-300">Meet</span>
            </div>
            <h2 className="font-nav mt-3 text-2xl uppercase tracking-wide text-white sm:text-3xl lg:text-4xl">
              {agent.name}
            </h2>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeInUp}>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            {agent.title} &middot; {agent.brokerage}
          </p>
          <div className="mt-5 space-y-5 text-base text-gray-700 sm:text-lg">
            {bioParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <Button href="/about" variant="secondary" className="group/cta mt-9 gap-4 rounded-full">
            Learn More About My Approach
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">
              &rarr;
            </span>
          </Button>

          <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="flex items-baseline gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
              License <span className="text-sm font-normal tracking-normal text-gray-700">#{agent.licenseNumber}</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            {socialLinks
              .filter((s) => !isPlaceholder(s.href))
              .map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-kw-red"
                >
                  <SocialIcon platform={s.platform} className="h-4 w-4" />
                </a>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
