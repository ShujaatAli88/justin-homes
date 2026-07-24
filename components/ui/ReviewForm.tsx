"use client";

import { useState, type ComponentPropsWithoutRef, type FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  fieldLabelClass,
  fieldInputClass,
  fieldTextareaClass,
  submitButtonClass,
  submitArrowClass,
} from "@/components/ui/form-styles";
import { REVIEW_CONSENT_TEXT } from "@/lib/reviews";

type Step = "rating" | "details" | "review" | "success";
type SubmitStatus = "idle" | "submitting" | "error";

const STEPS: { key: Step; label: string }[] = [
  { key: "rating", label: "Rating" },
  { key: "details", label: "About You" },
  { key: "review", label: "Your Story" },
];

const MOOD_COPY: Record<number, string> = {
  1: "We're sorry to hear that — tell us what happened.",
  2: "There's room to grow. We'd love the details.",
  3: "Good, but not quite a wow. What could be better?",
  4: "Great! What stood out to you?",
  5: "Outstanding! We'd love to hear the full story.",
};

const ROLE_OPTIONS = ["Buyer", "Seller", "Buyer & Seller", "Renter"] as const;

const backButtonClass =
  "shrink-0 rounded-full border-2 border-gray-200 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-gray-500 transition-colors hover:border-black hover:text-black";

function StepDot({ index, active, done, label }: { index: number; active: boolean; done: boolean; label: string }) {
  return (
    <div className="flex w-16 flex-col items-center gap-1.5 sm:w-20">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
          done
            ? "border-kw-red bg-kw-red text-white"
            : active
              ? "border-kw-red bg-black text-kw-red"
              : "border-gray-200 bg-white text-gray-300"
        }`}
      >
        {done ? "✓" : index + 1}
      </span>
      <span
        className={`text-center text-[0.6rem] font-semibold uppercase tracking-widest ${
          active || done ? "text-black" : "text-gray-300"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function BigStar({ filled, ...props }: { filled: boolean } & ComponentPropsWithoutRef<"button">) {
  return (
    <button type="button" {...props} className="group/star p-1">
      <motion.svg
        viewBox="0 0 24 24"
        className={`h-9 w-9 transition-colors duration-200 sm:h-11 sm:w-11 ${filled ? "text-kw-red" : "text-gray-200"}`}
        fill="currentColor"
        whileHover={{ scale: 1.15, rotate: -6 }}
        whileTap={{ scale: 0.9 }}
      >
        <path d="M12 2.5l3.09 6.26 6.91.99-5 4.87 1.18 6.88L12 17.77l-6.18 3.73L7 14.62l-5-4.87 6.91-.99L12 2.5z" />
      </motion.svg>
    </button>
  );
}

export function ReviewForm() {
  const [step, setStep] = useState<Step>("rating");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState<string>("Buyer");
  const [location, setLocation] = useState("");
  const [quote, setQuote] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const displayRating = hoverRating || rating;
  const stepIndex = STEPS.findIndex((s) => s.key === step);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, role, location, rating, quote, consent }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStep("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  if (step === "success") {
    return (
      <div className="relative max-h-[85svh] w-full max-w-xl overflow-y-auto bg-white p-8 text-center shadow-2xl sm:p-10">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
              style={{ backgroundColor: i % 2 === 0 ? "var(--kw-red)" : "#0a0a0a" }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{
                x: Math.cos((i / 18) * Math.PI * 2) * (120 + (i % 3) * 30),
                y: Math.sin((i / 18) * Math.PI * 2) * (120 + (i % 3) * 30),
                opacity: 0,
                scale: 1,
              }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-kw-red"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="relative mt-5 text-xl font-bold text-black sm:text-2xl">
          Thank You, {author.split(" ")[0]}!
        </h3>
        <p className="relative mt-3 text-sm text-gray-600">
          Your review is live on our website right now &mdash; thank you for taking the time to share your
          experience.
        </p>
        <Link href="/" className={`relative mt-6 inline-flex ${submitButtonClass}`}>
          Back to Home
          <span aria-hidden className={submitArrowClass} />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex max-h-[88svh] w-full max-w-xl flex-col bg-white shadow-2xl">
      <div className="shrink-0 px-6 pb-4 pt-6 sm:px-8 sm:pt-8">
        <div className="flex items-start">
          {STEPS.map((s, i) => (
            <div key={s.key} className="contents">
              <StepDot index={i} active={i === stepIndex} done={i < stepIndex} label={s.label} />
              {i < STEPS.length - 1 && (
                <span
                  className={`mt-[16px] h-0.5 flex-1 self-start transition-colors duration-300 ${
                    i < stepIndex ? "bg-kw-red" : "bg-gray-100"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-2 sm:px-8">
        <AnimatePresence mode="wait">
          {step === "rating" && (
            <motion.div
              key="rating"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-nav text-xs uppercase tracking-[0.3em] text-kw-red">Step 1 of 3</p>
              <h3 className="mt-1 text-xl font-bold text-black sm:text-2xl">How was your experience?</h3>
              <div className="mt-6 flex justify-center gap-1" onMouseLeave={() => setHoverRating(0)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <BigStar
                    key={n}
                    filled={n <= displayRating}
                    onMouseEnter={() => setHoverRating(n)}
                    onClick={() => setRating(n)}
                  />
                ))}
              </div>
              <p className="mt-3 min-h-[1.5rem] text-center text-sm font-medium text-gray-600">
                {displayRating ? MOOD_COPY[displayRating] : "Tap a star to get started"}
              </p>
            </motion.div>
          )}

          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <p className="font-nav text-xs uppercase tracking-[0.3em] text-kw-red">Step 2 of 3</p>
              <h3 className="text-xl font-bold text-black sm:text-2xl">A little about you</h3>

              <div className="group">
                <label className={fieldLabelClass}>Full Name</label>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  placeholder="Your name"
                  className={fieldInputClass}
                />
              </div>

              <div className="group">
                <label className={fieldLabelClass}>Location (optional)</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Brownwood, TX"
                  className={fieldInputClass}
                />
              </div>

              <fieldset>
                <legend className={fieldLabelClass}>You were a...</legend>
                <div className="flex flex-wrap gap-2">
                  {ROLE_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setRole(option)}
                      className={`rounded-full border-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                        role === option
                          ? "border-kw-red bg-kw-red text-white"
                          : "border-gray-200 bg-white text-gray-500 hover:border-kw-red hover:text-kw-red"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>
            </motion.div>
          )}

          {step === "review" && (
            <motion.form
              id="review-form"
              key="review"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <p className="font-nav text-xs uppercase tracking-[0.3em] text-kw-red">Step 3 of 3</p>
              <h3 className="text-xl font-bold text-black sm:text-2xl">Tell us your story</h3>

              <div className="group">
                <label className={fieldLabelClass}>Your Review</label>
                <textarea
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  required
                  rows={3}
                  placeholder="What was it like working with us?"
                  className={fieldTextareaClass}
                />
                <p className="mt-1 text-right text-xs text-gray-400">{quote.length} characters</p>
              </div>

              <div className="border-t-4 border-kw-red bg-gray-50 p-4 text-center">
                <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-gray-400">
                  Live Preview
                </p>
                <div className="mx-auto mt-2 flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                  {(author.trim().charAt(0) || "?").toUpperCase()}
                </div>
                <p className="mt-1.5 text-sm font-semibold text-black">
                  {author || "Your Name"} <span className="font-normal text-gray-400">| {role}</span>
                </p>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-700">
                  {quote || "Your review will appear here..."}
                </p>
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-xs text-gray-500">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-1 accent-kw-red"
                />
                <span>{REVIEW_CONSENT_TEXT}</span>
              </label>

              {error && <p className="text-sm text-kw-red">{error}</p>}
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <div className="flex shrink-0 gap-3 border-t border-gray-100 px-6 py-4 sm:px-8">
        {step === "rating" && (
          <button
            type="button"
            disabled={!rating}
            onClick={() => setStep("details")}
            className={`w-full justify-center ${submitButtonClass}`}
          >
            Continue
            <span aria-hidden className={submitArrowClass} />
          </button>
        )}

        {step === "details" && (
          <>
            <button type="button" onClick={() => setStep("rating")} className={backButtonClass}>
              Back
            </button>
            <button
              type="button"
              disabled={!author.trim()}
              onClick={() => setStep("review")}
              className={`flex-1 justify-center ${submitButtonClass}`}
            >
              Continue
              <span aria-hidden className={submitArrowClass} />
            </button>
          </>
        )}

        {step === "review" && (
          <>
            <button type="button" onClick={() => setStep("details")} className={backButtonClass}>
              Back
            </button>
            <button
              type="submit"
              form="review-form"
              disabled={status === "submitting" || !quote.trim() || !consent}
              className={`flex-1 justify-center ${submitButtonClass}`}
            >
              {status === "submitting" ? "Publishing..." : "Publish My Review"}
              <span aria-hidden className={submitArrowClass} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
