"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/Card";
import { SmartImage } from "@/components/ui/SmartImage";
import { fadeInUp, viewportOnce } from "@/lib/motion";
import { testimonials as seedTestimonials, type Testimonial } from "@/data/testimonials";
import { agent } from "@/data/agent";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

const AUTO_ADVANCE_MS = 7000;
const LONG_QUOTE_THRESHOLD = 320;

interface ReviewRow {
  id: string;
  author: string;
  role: string | null;
  location: string | null;
  rating: number;
  quote: string;
  created_at: string;
}

function mapReviewRow(row: ReviewRow): Testimonial {
  return {
    id: `db-${row.id}`,
    quote: row.quote,
    author: row.author,
    role: row.role ?? "Verified Client",
    location: row.location ?? "",
    date: new Date(row.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    rating: row.rating,
  };
}

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

function ArrowButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}
      className={`absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 hover:border-kw-red hover:bg-kw-red hover:text-white ${
        direction === "prev" ? "left-0 -translate-x-4 sm:-translate-x-14" : "right-0 translate-x-4 sm:translate-x-14"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d={direction === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [liveReviews, setLiveReviews] = useState<Testimonial[]>([]);
  const [justArrivedId, setJustArrivedId] = useState<string | null>(null);

  const all = useMemo(() => [...liveReviews, ...seedTestimonials], [liveReviews]);
  const total = all.length;
  const current = all[index];
  const avgRating = all.reduce((sum, t) => sum + t.rating, 0) / total;
  const isLong = current.quote.length > LONG_QUOTE_THRESHOLD;
  const initial = current.author.trim().charAt(0).toUpperCase();

  useEffect(() => {
    setExpanded(false);
  }, [index]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [index, total]);

  // Live reviews: fetch existing approved reviews once, then subscribe so
  // any review submitted via /reviews appears here instantly — no refresh,
  // no redeploy — for anyone already viewing the page.
  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    let active = true;

    supabase
      .from("reviews")
      .select("id, author, role, location, rating, quote, created_at")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (active && data) setLiveReviews((data as ReviewRow[]).map(mapReviewRow));
      });

    const channel = supabase
      .channel("public:reviews")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "reviews", filter: "is_approved=eq.true" },
        (payload) => {
          const incoming = mapReviewRow(payload.new as ReviewRow);
          setLiveReviews((prev) => [incoming, ...prev]);
          setIndex(0);
          setJustArrivedId(incoming.id);
          window.setTimeout(() => {
            setJustArrivedId((id) => (id === incoming.id ? null : id));
          }, 6000);
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  function goTo(next: number) {
    setIndex((next + total) % total);
  }

  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(206,1,31,0.18)_0%,transparent_45%),radial-gradient(circle_at_85%_85%,rgba(206,1,31,0.12)_0%,transparent_45%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="container-xl relative">
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
          <span className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-kw-red ring-offset-4 ring-offset-black">
            <SmartImage src={agent.headshot} alt={agent.name} label="Agent" />
          </span>
          <span className="text-lg font-bold text-white">{avgRating.toFixed(1)}</span>
          <StarRow rating={avgRating} />
          <span className="border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gray-300">
            {total} review{total === 1 ? "" : "s"}
          </span>
        </motion.div>

        <div className="relative mx-auto mt-14 max-w-2xl">
          <motion.div
            aria-hidden
            className="absolute -inset-10 -z-10 bg-kw-red/15 blur-[100px]"
            animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <ArrowButton direction="prev" onClick={() => goTo(index - 1)} />

          <div className="relative overflow-hidden">
            <AnimatePresence>
              <motion.div
                key={current.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, position: "absolute", y: -16, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden border-t-4 border-kw-red bg-white px-8 pb-0 pt-12 text-center shadow-[0_25px_80px_rgba(0,0,0,0.5)] sm:px-14"
              >
                {current.id === justArrivedId && (
                  <motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-kw-red px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-white shadow-lg"
                  >
                    <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white" />
                    Just In
                  </motion.span>
                )}
                <span
                  aria-hidden
                  className="font-nav pointer-events-none absolute left-4 top-2 select-none text-8xl leading-none text-kw-red/10 sm:text-9xl"
                >
                  &ldquo;
                </span>

                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                  {initial}
                </div>

                <p className="relative mt-4 text-sm font-semibold text-black">
                  {current.author} <span className="font-normal text-gray-400">| {current.role}</span>
                </p>
                <div className="relative mt-3 flex items-center justify-center gap-2">
                  <span className="text-sm font-bold text-black">{current.rating.toFixed(1)}</span>
                  <StarRow rating={current.rating} />
                </div>
                <div className="relative mt-6 min-h-[130px]">
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
                <p className="relative mt-8 pb-8 text-xs uppercase tracking-widest text-gray-400">
                  {current.date}
                </p>

                <div className="relative h-1 w-full bg-gray-100">
                  <motion.div
                    key={`${current.id}-progress`}
                    className="h-full bg-kw-red"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <ArrowButton direction="next" onClick={() => goTo(index + 1)} />
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {all.map((t, i) => (
            <button
              key={t.id}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-kw-red" : "w-2 bg-gray-700 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="mt-14 flex justify-center"
        >
          <Link href="/reviews" className="group relative inline-flex items-center justify-center">
            <span
              aria-hidden
              className="animate-spin-slow absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,transparent_0%,var(--kw-red)_20%,transparent_40%)] opacity-80 blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
            />
            <span className="relative inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 font-nav text-sm font-semibold uppercase tracking-widest text-white ring-1 ring-white/10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_15px_40px_rgba(206,1,31,0.4)]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-kw-red" fill="currentColor">
                <path d="M12 2.5l3.09 6.26 6.91.99-5 4.87 1.18 6.88L12 17.77l-6.18 3.73L7 14.62l-5-4.87 6.91-.99L12 2.5z" />
              </svg>
              Share Your Experience
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
