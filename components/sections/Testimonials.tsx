"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/Card";
import { SmartImage } from "@/components/ui/SmartImage";
import { fadeInUp, viewportOnce } from "@/lib/motion";
import { testimonials } from "@/data/testimonials";
import { agent } from "@/data/agent";

const AUTO_ADVANCE_MS = 7000;
const LONG_QUOTE_THRESHOLD = 320;

function StarRow({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={`flex gap-0.5 text-kw-red ${className ?? ""}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.79L10 14.9l-5.21 2.61 1-5.79-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const total = testimonials.length;
  const current = testimonials[index];
  const avgRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / total;
  const isLong = current.quote.length > LONG_QUOTE_THRESHOLD;

  useEffect(() => {
    setExpanded(false);
  }, [index]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [index, total]);

  function goTo(next: number) {
    setIndex((next + total) % total);
  }

  return (
    <section className="bg-black py-20 sm:py-28">
      <div className="container-xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="mx-auto max-w-2xl text-center"
        >
          <SectionEyebrow>What Clients Say</SectionEyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Real Reviews From Real Clients
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <span className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/20">
            <SmartImage src={agent.headshot} alt={agent.name} label="Agent" />
          </span>
          <span className="text-lg font-bold text-white">{avgRating.toFixed(1)}</span>
          <StarRow rating={avgRating} />
          <span className="text-sm text-gray-400">
            {total} review{total === 1 ? "" : "s"}
          </span>
        </motion.div>

        <div className="relative mx-auto mt-12 max-w-2xl">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center text-2xl text-gray-500 transition-colors hover:text-kw-red sm:-translate-x-12"
          >
            &#8249;
          </button>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                layout
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-gray-50 px-8 py-12 text-center sm:px-14"
              >
                <p className="text-sm font-semibold text-black">
                  {current.author} <span className="font-normal text-gray-400">| {current.role}</span>
                </p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="text-sm font-bold text-black">{current.rating.toFixed(1)}</span>
                  <StarRow rating={current.rating} />
                </div>
                <div className="mt-6 min-h-[130px]">
                  <p
                    className={`whitespace-pre-line text-base leading-relaxed text-gray-700 ${
                      isLong && !expanded ? "line-clamp-5" : ""
                    }`}
                  >
                    {current.quote}
                  </p>
                  {isLong && (
                    <button
                      type="button"
                      onClick={() => setExpanded((e) => !e)}
                      className="mt-3 text-xs font-semibold uppercase tracking-widest text-kw-red hover:underline"
                    >
                      {expanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
                <p className="mt-8 text-xs uppercase tracking-widest text-gray-400">{current.date}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 translate-x-4 items-center justify-center text-2xl text-gray-500 transition-colors hover:text-kw-red sm:translate-x-12"
          >
            &#8250;
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-colors ${i === index ? "bg-kw-red" : "bg-gray-700"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
