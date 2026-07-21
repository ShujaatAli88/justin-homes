"use client";

import { motion } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { SocialIcon, type SocialPlatform } from "@/components/ui/SocialIcons";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/motion";
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
    <section className="overflow-hidden bg-gray-50 py-20 sm:py-28">
      <div className="container-xl grid gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="relative"
        >
          <div aria-hidden className="absolute -bottom-4 -right-4 h-full w-full bg-kw-red sm:-bottom-6 sm:-right-6" />

          <div className="group relative z-10 aspect-[4/5] w-full max-w-md overflow-hidden lg:max-w-none">
            <SmartImage
              src={agent.headshot}
              alt={agent.name}
              label="Agent headshot"
              className="transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <span className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-center shadow-lg sm:h-20 sm:w-20">
              <span className="font-nav text-[0.6rem] uppercase leading-tight tracking-widest text-black">
                Keller
                <br />
                Williams
                <br />
                <span className="text-kw-red">REALTOR&reg;</span>
              </span>
            </span>

            <div className="absolute bottom-0 left-0 max-w-[85%] bg-black px-8 py-7 sm:px-10 sm:py-8">
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-10 bg-kw-red" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-300">Meet</span>
              </div>
              <h2 className="font-nav mt-3 text-2xl uppercase tracking-wide text-white sm:text-3xl lg:text-4xl">
                {agent.name}
              </h2>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            {agent.title} &middot; {agent.brokerage}
          </motion.p>

          <motion.div variants={fadeInUp} className="relative mt-5">
            <span
              aria-hidden
              className="font-nav pointer-events-none absolute -left-3 -top-8 select-none text-8xl leading-none text-kw-red/10 sm:-top-10 sm:text-9xl"
            >
              &ldquo;
            </span>
            <div className="relative space-y-5 text-base text-gray-700 sm:text-lg">
              {bioParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Button href="/about" variant="secondary" className="group/cta mt-9 gap-4 rounded-full">
              Learn More About My Approach
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">
                &rarr;
              </span>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t-2 border-kw-red bg-white px-6 py-5 shadow-sm"
          >
            <div className="flex items-baseline gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
              License <span className="text-sm font-normal tracking-normal text-gray-700">#{agent.licenseNumber}</span>
            </div>
            <div className="flex gap-3">
              {socialLinks
                .filter((s) => !isPlaceholder(s.href))
                .map((s) => (
                  <a
                    key={s.platform}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-kw-red"
                  >
                    <SocialIcon platform={s.platform} className="h-4 w-4" />
                  </a>
                ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
