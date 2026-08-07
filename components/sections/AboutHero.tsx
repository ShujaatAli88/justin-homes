"use client";

import { motion } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { team } from "@/data/team";

export function AboutHero() {
  const [justin, abby] = team;

  return (
    <section className="relative overflow-hidden bg-black py-28 pt-36 text-white sm:pt-40">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(206,1,31,0.22)_0%,transparent_45%),radial-gradient(circle_at_85%_75%,rgba(206,1,31,0.16)_0%,transparent_45%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="container-xl relative grid gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.p variants={fadeInUp} className="font-nav text-sm tracking-wide text-kw-red">
            Meet the Team
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-nav mt-4 text-4xl leading-[1.1] sm:text-5xl lg:text-6xl"
          >
            Abby &amp; Justin
            <br />
            Cadenhead
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-4 text-sm font-semibold text-gray-400">
            Your Central Texas Real Estate Team
          </motion.p>
          <motion.p variants={fadeInUp} className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-gray-300 lg:mx-0">
            Welcome to the dynamic world of real estate, where dreams meet homes! We are Abby &amp;
            Justin, a dedicated husband-and-wife real estate team serving the vibrant area of
            central Texas. With a passion for helping clients find their perfect property and a
            commitment to excellence, we are here to guide you through every step of your real
            estate journey.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex w-full max-w-md items-center justify-center py-6 lg:mx-0"
        >
          <div className="relative -rotate-3 border-4 border-black bg-black shadow-2xl transition-transform duration-500 hover:rotate-0">
            <div className="relative aspect-[4/5] w-48 overflow-hidden sm:w-56">
              <SmartImage src={justin.headshot} alt={justin.name} label="Justin headshot" />
            </div>
            <p className="font-nav bg-white px-3 py-2 text-center text-sm text-black">
              {justin.name.split(" ")[0]}
            </p>
          </div>

          <div className="relative z-10 -ml-10 rotate-3 border-4 border-kw-red bg-black shadow-2xl transition-transform duration-500 hover:rotate-0 sm:-ml-14">
            <div className="relative aspect-[4/5] w-48 overflow-hidden sm:w-56">
              <SmartImage src={abby.headshot} alt={abby.name} label="Abby headshot" />
            </div>
            <p className="font-nav bg-kw-red px-3 py-2 text-center text-sm text-white">
              {abby.name.split(" ")[0]}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
