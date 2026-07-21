"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";
import { SocialIcon, type SocialPlatform } from "@/components/ui/SocialIcons";
import { CRM_CONSENT_TEXT } from "@/lib/crm";
import { agent } from "@/data/agent";
import { cn, isPlaceholder, telHref } from "@/lib/utils";

const socialLinks: { platform: SocialPlatform; href: string }[] = [
  { platform: "facebook", href: agent.social.facebook },
  { platform: "instagram", href: agent.social.instagram },
  { platform: "tiktok", href: agent.social.tiktok },
  { platform: "youtube", href: agent.social.youtube },
];

type Status = "idle" | "submitting" | "success" | "error";

export function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setError(null);
    }
  }, [isOpen]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      type: "contact",
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      message: String(form.get("message") ?? ""),
      consent: form.get("consent") === "on",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-black"
        >
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block">
            <SmartImage
              src="/images/approach/process.png"
              alt=""
              label=""
              className="opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact form"
            className="fixed right-5 top-5 z-20 flex h-11 w-11 items-center justify-center text-3xl leading-none text-white transition-colors hover:text-kw-red sm:right-8 sm:top-8"
          >
            &times;
          </button>

          <div className="relative z-10 mx-auto flex min-h-full max-w-6xl flex-col justify-center gap-12 px-6 py-24 lg:flex-row lg:items-center lg:gap-16 lg:px-10">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 text-white"
            >
              <p className="font-nav text-xs uppercase tracking-[0.4em] text-kw-red">Let&apos;s Connect</p>
              <h2 className="font-nav mt-3 text-4xl uppercase tracking-widest sm:text-5xl">Get In Touch</h2>

              <div className="mt-8 space-y-1.5 text-sm text-gray-300">
                <p className="text-base font-semibold text-white">{agent.name}</p>
                <p>{agent.brokerage}</p>
                <a href={telHref(agent.phone)} className="block underline-offset-4 hover:text-kw-red hover:underline">
                  M: {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} className="block underline-offset-4 hover:text-kw-red hover:underline">
                  {agent.email}
                </a>
                {!isPlaceholder(agent.officeAddress) && <p>{agent.officeAddress}</p>}
              </div>

              <div className="mt-8 flex gap-3">
                {socialLinks
                  .filter((s) => !isPlaceholder(s.href))
                  .map((s) => (
                    <a
                      key={s.platform}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-kw-red hover:text-white"
                    >
                      <SocialIcon platform={s.platform} className="h-4 w-4" />
                    </a>
                  ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-lg bg-white p-8 shadow-2xl sm:p-10"
            >
              {status === "success" ? (
                <div className="py-10 text-center">
                  <p className="font-nav text-2xl uppercase tracking-widest text-black">Message Sent</p>
                  <p className="mt-3 text-sm text-gray-600">
                    Thanks for reaching out &mdash; {agent.name} will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Name
                      </label>
                      <input
                        name="name"
                        required
                        placeholder="Enter your full name"
                        className="w-full rounded-full bg-gray-100 px-5 py-3 text-sm text-black placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-kw-red"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Phone
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="Your phone"
                        className="w-full rounded-full bg-gray-100 px-5 py-3 text-sm text-black placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-kw-red"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      className="w-full rounded-full bg-gray-100 px-5 py-3 text-sm text-black placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-kw-red"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Type your message"
                      className="w-full rounded-3xl bg-gray-100 px-5 py-3 text-sm text-black placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-kw-red"
                    />
                  </div>
                  <label className="flex items-start gap-3 text-xs text-gray-500">
                    <input type="checkbox" name="consent" required className="mt-1" />
                    <span>{CRM_CONSENT_TEXT}</span>
                  </label>
                  {error && <p className="text-sm text-kw-red">{error}</p>}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={cn(
                      "group/send inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 font-nav text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-kw-red disabled:opacity-60"
                    )}
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                    <span aria-hidden className="inline-block h-px w-8 bg-white transition-transform duration-300 group-hover/send:translate-x-1" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
