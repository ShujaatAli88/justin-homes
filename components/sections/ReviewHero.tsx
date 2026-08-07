"use client";

import { motion } from "framer-motion";
import { ReviewForm } from "@/components/ui/ReviewForm";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const FLOATING_STARS = [
  { top: "10%", left: "8%", size: 18, delay: 0, duration: 9 },
  { top: "22%", left: "82%", size: 26, delay: 1.2, duration: 11 },
  { top: "68%", left: "14%", size: 14, delay: 2.4, duration: 8 },
  { top: "78%", left: "88%", size: 20, delay: 0.6, duration: 10 },
  { top: "40%", left: "50%", size: 12, delay: 1.8, duration: 7 },
  { top: "15%", left: "45%", size: 16, delay: 3, duration: 12 },
  { top: "88%", left: "40%", size: 22, delay: 2, duration: 9 },
  { top: "55%", left: "92%", size: 15, delay: 0.9, duration: 8.5 },
  { top: "5%", left: "65%", size: 20, delay: 1.5, duration: 10.5 },
  { top: "60%", left: "5%", size: 18, delay: 2.8, duration: 9.5 },
];

const highlights = ["Takes 2 Minutes", "Published Instantly", "Helps Future Clients"];

function FloatingStar({
  top,
  left,
  size,
  delay,
  duration,
}: {
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
}) {
  return (
    <span
      aria-hidden
      className="absolute text-kw-red/25"
      style={{
        top,
        left,
        width: size,
        height: size,
        animation: `float-star ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path d="M12 2.5l3.09 6.26 6.91.99-5 4.87 1.18 6.88L12 17.77l-6.18 3.73L7 14.62l-5-4.87 6.91-.99L12 2.5z" />
      </svg>
    </span>
  );
}

export function ReviewHero() {
  return (
    <div className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-black pb-10 pt-28 sm:pb-14 sm:pt-32">
      <div aria-hidden className="absolute inset-0">
        {FLOATING_STARS.map((s, i) => (
          <FloatingStar key={i} {...s} />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(206,1,31,0.25)_0%,transparent_45%),radial-gradient(circle_at_80%_80%,rgba(206,1,31,0.18)_0%,transparent_45%)]" />
      </div>

      <div className="container-xl relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="text-center text-white lg:text-left"
        >
          <motion.p variants={fadeInUp} className="font-nav text-sm tracking-wide text-kw-red">
            Your Voice Matters
          </motion.p>
          <motion.h1 variants={fadeInUp} className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">
            Share Your Experience
          </motion.h1>
          <motion.p variants={fadeInUp} className="mx-auto mt-3 max-w-md text-sm text-gray-300 lg:mx-0">
            Loved working with Justin &amp; Abby? Tell future clients about it &mdash; your review publishes
            straight to our homepage, no waiting required.
          </motion.p>
          <motion.ul
            variants={fadeInUp}
            className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold backdrop-blur-sm"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-kw-red">
                  <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" />
                </svg>
                {h}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative flex justify-center lg:justify-end"
        >
          <div aria-hidden className="absolute -inset-8 -z-10 bg-kw-red/20 opacity-70 blur-[80px]" />
          <div className="w-fit border-t-4 border-kw-red">
            <ReviewForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
