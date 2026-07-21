"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CRM_CONSENT_TEXT } from "@/lib/crm";
import { fadeInUp, viewportOnce } from "@/lib/motion";

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "newsletter",
          name: String(form.get("email") ?? ""),
          email: String(form.get("email") ?? ""),
          consent: form.get("consent") === "on",
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-kw-red py-16 text-white sm:py-20">
      <div className="container-xl flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeInUp}>
          <h2 className="text-2xl font-bold sm:text-3xl">Be the First to See New Listings</h2>
          <p className="mt-2 max-w-md text-sm text-white/90">
            Get new Brownwood-area listings delivered to your inbox before they hit the market.
          </p>
        </motion.div>
        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          onSubmit={handleSubmit}
          className="w-full max-w-md"
        >
          {status === "success" ? (
            <p className="font-semibold">Thanks &mdash; you&apos;re on the list!</p>
          ) : (
            <>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Your email address"
                  className="flex-1 border border-white/40 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                />
                <Button type="submit" variant="secondary" disabled={status === "submitting"}>
                  {status === "submitting" ? "Submitting..." : "Sign Up"}
                </Button>
              </div>
              <label className="mt-3 flex items-start gap-2 text-left text-xs text-white/80">
                <input type="checkbox" name="consent" required className="mt-1" />
                <span>{CRM_CONSENT_TEXT}</span>
              </label>
              {status === "error" && <p className="mt-2 text-xs text-black">Something went wrong. Please try again.</p>}
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}
