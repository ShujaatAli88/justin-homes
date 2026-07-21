"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { isPlaceholder } from "@/lib/utils";

const HERO_VIDEO_SRC = "/video/hero.mp4";
const HERO_POSTER_SRC = "{{HERO_POSTER}}"; // TODO(client): static fallback frame for the hero video

const HEADLINE = "Brown County Real Estate, Elevated";
// TODO(client): confirm exact areas served list (mirrors the suggested, unconfirmed
// starter list in data/neighborhoods.ts) before this goes live.
const SUBLINE =
  "Justin Cadenhead is a Brown County, TX REALTOR® serving Brownwood, Early, Bangs, and surrounding areas with strategic guidance for buyers and sellers";

export function Hero() {
  const hasVideo = !isPlaceholder(HERO_VIDEO_SRC);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (query.matches) video.pause();
      else video.play().catch(() => {});
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        {hasVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={isPlaceholder(HERO_POSTER_SRC) ? undefined : HERO_POSTER_SRC}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <motion.div
            aria-hidden
            className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,#3a0000_0%,transparent_45%),radial-gradient(circle_at_80%_30%,#1a1a1a_0%,transparent_50%),radial-gradient(circle_at_50%_90%,#cc0000_0%,transparent_35%),#0a0a0a]"
            style={{ backgroundSize: "200% 200%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
      </div>

      <div className="container-xl relative py-24">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-extrabold uppercase leading-[1.15] tracking-wide sm:text-6xl lg:text-7xl"
          >
            {HEADLINE}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-sm font-medium uppercase tracking-wide text-gray-200 sm:text-base"
          >
            {SUBLINE}
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/home-search/listings" variant="pill" size="lg">
              Search Homes
            </Button>
            <Button href="/home-valuation" variant="pillOutline" size="lg">
              What&apos;s My Home Worth?
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
