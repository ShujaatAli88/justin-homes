"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/Card";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/motion";

const items = [
  {
    index: "01",
    title: "Buy with a Plan, Not Guesswork",
    blurb:
      "I guide buyers identify the right opportunities, compete effectively, and navigate inspections, financing, and negotiations with confidence.",
    image: "/images/approach/buying.png",
  },
  {
    index: "02",
    title: "Positioned to Sell, Not Just Listed",
    blurb:
      "Selling a home is about positioning and execution. I help sellers maximize value through strategic pricing, professional marketing, and high-quality presentation that creates demand and drives strong offers.",
    image: "/images/approach/selling.jpg",
  },
  {
    index: "03",
    title: "A Process That Delivers Results",
    blurb:
      "My business is built on structure, communication, and execution. Every client benefits from a defined process, proactive updates, and data-driven decision making ensuring a smooth, efficient experience from start to close.",
    image: "/images/approach/process.png",
  },
];

export function ApproachTrio() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-xl">
        <SectionHeading eyebrow="Your Next Chapter Awaits" title="A Strategic Approach" align="center" />
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-8 sm:grid-cols-3"
        >
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="group relative flex h-full flex-col bg-black shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(206,1,31,0.4)]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <SmartImage
                  src={item.image}
                  alt={item.title}
                  label={`${item.title} photo`}
                  className="grayscale-[60%] transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                />

                <span className="font-nav absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/30 text-sm text-white/70 backdrop-blur-sm transition-all duration-500 group-hover:border-kw-red group-hover:bg-kw-red/90 group-hover:text-white">
                  {item.index}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span
                    aria-hidden
                    className="mb-3 block h-px w-10 bg-kw-red transition-all duration-500 group-hover:w-16"
                  />
                  <h3 className="font-nav text-lg uppercase leading-snug tracking-wide text-white sm:text-xl">
                    {item.title}
                  </h3>
                </div>
              </div>
              <div className="flex flex-1 flex-col border-t-2 border-kw-red bg-white p-6 transition-colors duration-500 group-hover:bg-gray-50">
                <p className="text-sm leading-relaxed text-gray-600">{item.blurb}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="relative mt-16 overflow-hidden bg-black px-8 py-14 text-center sm:mt-20 sm:px-16"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(206,1,31,0.35)_0%,transparent_45%),radial-gradient(circle_at_85%_80%,rgba(206,1,31,0.35)_0%,transparent_45%)]"
          />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-kw-red">
              Curious What Your Home Is Worth?
            </p>
            <h3 className="mx-auto mt-3 max-w-xl text-2xl font-bold text-white sm:text-3xl">
              Find out in minutes &mdash; no obligation, no guesswork.
            </h3>
            <Button href="/home-valuation" variant="primary" size="lg" className="group/cta mt-8">
              Get Your Home Valuation
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">
                &rarr;
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
