"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { primaryNav, ctaLink } from "@/components/layout/nav-links";
import { useContactModal } from "@/components/layout/ContactModalProvider";
import { agent } from "@/data/agent";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn, telHref } from "@/lib/utils";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { openContactModal } = useContactModal();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-11 w-11 flex-col items-center justify-center gap-1.5"
      >
        <span className="h-0.5 w-6 bg-current" />
        <span className="h-0.5 w-6 bg-current" />
        <span className="h-0.5 w-6 bg-current" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-black text-white"
          >
            <div className="container-xl flex items-center justify-between py-6">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center bg-white p-1.5"
                aria-label="Cadenhead Realty Group home"
              >
                <Image src="/logo.png" alt="Cadenhead Realty Group" width={80} height={80} unoptimized className="h-9 w-9" />
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center text-3xl leading-none"
              >
                &times;
              </button>
            </div>

            <motion.nav
              variants={staggerContainer(0.06, 0.1)}
              initial="hidden"
              animate="visible"
              className="container-xl flex flex-1 flex-col justify-center gap-5 pb-16"
            >
              {primaryNav.map((item, i) => {
                const active = pathname === item.href;
                return (
                  <motion.div key={item.href} variants={fadeInUp} className="flex items-baseline gap-4">
                    <span className="font-nav text-sm text-white/30">{String(i + 1).padStart(2, "0")}</span>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "font-nav text-3xl font-semibold uppercase tracking-wide transition-colors hover:text-kw-red",
                        active && "text-kw-red"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div variants={fadeInUp} className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openContactModal();
                  }}
                  className="inline-block bg-kw-red px-8 py-4 font-nav text-sm font-semibold uppercase tracking-widest text-white hover:bg-kw-red-dark"
                >
                  {ctaLink.label}
                </button>
              </motion.div>
              <motion.div variants={fadeInUp} className="pt-6">
                <a href={telHref(agent.phone)} className="font-nav text-sm font-semibold tracking-widest text-kw-red">
                  {agent.phone}
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
