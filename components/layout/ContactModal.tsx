"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";
import { SocialIcon, type SocialPlatform } from "@/components/ui/SocialIcons";
import { CRM_CONSENT_TEXT } from "@/lib/crm";
import { agent } from "@/data/agent";
import { isPlaceholder, telHref } from "@/lib/utils";
import { fieldLabelClass, fieldInputClass, fieldTextareaClass, submitButtonClass, submitArrowClass } from "@/components/ui/form-styles";

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
              <div className="flex items-center gap-4">
                <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-kw-red ring-offset-4 ring-offset-black sm:h-20 sm:w-20">
                  <SmartImage src={agent.headshot} alt={agent.name} label="Agent" />
                </span>
                <div>
                  <p className="font-nav text-xs uppercase tracking-[0.4em] text-kw-red">Let&apos;s Connect</p>
                  <h2 className="font-nav mt-1 text-3xl uppercase tracking-widest sm:text-4xl">Get In Touch</h2>
                </div>
              </div>

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
                    <div className="group">
                      <label className={fieldLabelClass}>Name</label>
                      <input name="name" required placeholder="Enter your full name" className={fieldInputClass} />
                    </div>
                    <div className="group">
                      <label className={fieldLabelClass}>Phone</label>
                      <input name="phone" type="tel" placeholder="Your phone" className={fieldInputClass} />
                    </div>
                  </div>
                  <div className="group">
                    <label className={fieldLabelClass}>Email</label>
                    <input name="email" type="email" required placeholder="you@email.com" className={fieldInputClass} />
                  </div>
                  <div className="group">
                    <label className={fieldLabelClass}>Your Message</label>
                    <textarea name="message" rows={4} placeholder="Type your message" className={fieldTextareaClass} />
                  </div>
                  <label className="flex cursor-pointer items-start gap-3 text-xs text-gray-500">
                    <input type="checkbox" name="consent" required className="mt-1 accent-kw-red" />
                    <span>{CRM_CONSENT_TEXT}</span>
                  </label>
                  {error && <p className="text-sm text-kw-red">{error}</p>}
                  <button type="submit" disabled={status === "submitting"} className={submitButtonClass}>
                    {status === "submitting" ? "Sending..." : "Send Message"}
                    <span aria-hidden className={submitArrowClass} />
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
