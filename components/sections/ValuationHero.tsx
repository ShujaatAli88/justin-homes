"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";
import { ValuationForm } from "@/components/ui/ValuationForm";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { agent } from "@/data/agent";

const features = ["Instant Property Valuation", "Expert Advice", "Sell For More"];
const headline = "How Much Is Your Home Worth?".split(" ");

export function ValuationHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <div ref={sectionRef} className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-black py-32">
      <motion.div aria-hidden className="absolute inset-0" style={{ y: bgY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.18 }}
          transition={{ duration: 26, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <SmartImage src="/images/listings/listing-2.jpg" alt="" label="" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(206,1,31,0.32)_0%,transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_88%,rgba(255,170,60,0.16)_0%,transparent_50%)]" />
        <div className="absolute inset-0 shadow-[inset_0_0_180px_70px_rgba(0,0,0,0.7)]" />
      </motion.div>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className="container-xl relative grid gap-12 text-white lg:grid-cols-2 lg:items-center lg:gap-16"
      >
        <div className="text-center lg:text-left">
          <motion.p variants={fadeInUp} className="font-nav text-xs uppercase tracking-[0.4em] text-kw-red">
            Thinking About Selling?
          </motion.p>
          <motion.span
            variants={fadeInUp}
            aria-hidden
            className="mx-auto mt-3 block h-px w-14 bg-white/40 lg:mx-0"
          />
          <motion.h1
            variants={staggerContainer(0.07)}
            className="font-nav mt-5 flex flex-wrap justify-center gap-x-3 text-3xl uppercase tracking-widest sm:text-5xl lg:justify-start"
          >
            {headline.map((word, i) => (
              <motion.span key={i} variants={fadeInUp} className="inline-block">
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.ul
            variants={fadeInUp}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            {features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm transition-colors hover:border-kw-red/50 hover:bg-white/10 sm:text-sm"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-kw-red">
                  <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" />
                </svg>
                {f}
              </li>
            ))}
          </motion.ul>

          <motion.p variants={fadeInUp} className="mx-auto mt-5 max-w-md text-sm text-gray-300 lg:mx-0">
            Get a free, no-obligation estimate for your Brownwood-area home, backed up by a personal
            market analysis from {agent.name}.
          </motion.p>
        </div>

        <motion.div variants={fadeInUp} className="relative flex justify-center lg:justify-end">
          <div aria-hidden className="absolute -inset-8 -z-10 bg-kw-red/25 opacity-70 blur-[80px]" />
          <div className="w-fit border-t-4 border-kw-red">
            <ValuationForm />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1, duration: 0.6 }, y: { delay: 1, duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.div>
    </div>
  );
}
