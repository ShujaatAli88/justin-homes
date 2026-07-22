"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav, ctaLink } from "@/components/layout/nav-links";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useContactModal } from "@/components/layout/ContactModalProvider";
import { agent } from "@/data/agent";
import { cn, telHref } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { openContactModal } = useContactModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-gray-100 bg-white/90 text-black shadow-sm backdrop-blur-md"
          : "border-b border-white/0 bg-transparent text-white"
      )}
    >
      <div className="container-xl flex h-24 items-center justify-between">
        <Link href="/" className="flex items-center bg-black p-2" aria-label="Cadenhead Realty Group home">
          <Image
            src="/logo.png"
            alt="Cadenhead Realty Group"
            width={96}
            height={96}
            priority
            unoptimized
            className="h-10 w-10 sm:h-12 sm:w-12"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "font-nav relative py-2 text-sm font-semibold uppercase tracking-widest transition-colors",
                  active ? "text-kw-red" : "animated-underline hover:text-kw-red"
                )}
              >
                {item.label}
                {active && (
                  <span aria-hidden className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-kw-red" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <div className="relative flex h-11 w-11 items-center justify-center">
            <span aria-hidden className="absolute h-full w-full animate-ping rounded-full bg-kw-red/40" />
            <a
              href={telHref(agent.phone)}
              aria-label={`Call ${agent.name}`}
              title={agent.phone}
              className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-kw-red/40 bg-kw-red/10 text-kw-red transition-all duration-300 hover:scale-110 hover:bg-kw-red hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z" />
              </svg>
            </a>
          </div>

          <button
            type="button"
            onClick={openContactModal}
            className="group/cta relative flex items-center gap-2 overflow-hidden rounded-full bg-kw-red px-7 py-3 font-nav text-sm font-semibold uppercase tracking-widest text-white shadow-[0_8px_24px_rgba(206,1,31,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_rgba(206,1,31,0.5)]"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full -skew-x-12 bg-white/25 transition-transform duration-700 ease-out group-hover/cta:translate-x-full"
            />
            <span className="relative">{ctaLink.label}</span>
            <span aria-hidden className="relative inline-block transition-transform duration-300 group-hover/cta:translate-x-1">
              &rarr;
            </span>
          </button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
