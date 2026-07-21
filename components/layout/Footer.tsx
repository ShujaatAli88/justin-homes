"use client";

import Link from "next/link";
import Image from "next/image";
import { agent } from "@/data/agent";
import { primaryNav, isNavGroup } from "@/components/layout/nav-links";
import { SocialIcon, type SocialPlatform } from "@/components/ui/SocialIcons";
import { useContactModal } from "@/components/layout/ContactModalProvider";
import { isPlaceholder, telHref } from "@/lib/utils";

const socialLinks: { platform: SocialPlatform; href: string }[] = [
  { platform: "facebook", href: agent.social.facebook },
  { platform: "instagram", href: agent.social.instagram },
  { platform: "tiktok", href: agent.social.tiktok },
  { platform: "youtube", href: agent.social.youtube },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { openContactModal } = useContactModal();

  return (
    <footer className="bg-black text-white">
      <div className="container-xl grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="inline-flex" aria-label="Cadenhead Realty Group home">
            <Image src="/logo.png" alt="Cadenhead Realty Group" width={128} height={128} unoptimized className="h-24 w-24" />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-gray-400">{agent.tagline}</p>
          <div className="mt-6 flex gap-4">
            {socialLinks
              .filter((s) => !isPlaceholder(s.href))
              .map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="flex h-9 w-9 items-center justify-center border border-gray-700 text-gray-300 transition-colors hover:border-kw-red hover:text-kw-red"
                >
                  <SocialIcon platform={s.platform} className="h-4 w-4" />
                </a>
              ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm">
            {primaryNav.map((item) =>
              isNavGroup(item) ? (
                item.children.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href} className="hover:text-kw-red">
                      {child.label}
                    </Link>
                  </li>
                ))
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-kw-red">
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">Resources</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/home-valuation" className="hover:text-kw-red">
                What&apos;s My Home Worth?
              </Link>
            </li>
            <li>
              <button type="button" onClick={openContactModal} className="hover:text-kw-red">
                Contact
              </button>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            <li>{agent.name}, {agent.title}</li>
            <li>{agent.brokerage}</li>
            <li>{agent.officeAddress}</li>
            <li>
              <a href={telHref(agent.phone)} className="hover:text-kw-red">
                {agent.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${agent.email}`} className="hover:text-kw-red">
                {agent.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-xl flex flex-col gap-6 py-8 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center bg-white px-3 py-2">
              <Image
                src="/images/kw-logo.png"
                alt="Keller Williams"
                width={400}
                height={264}
                unoptimized
                className="h-6 w-auto"
              />
            </span>
            <span className="flex items-center bg-white px-3 py-2">
              <Image
                src="/images/badges/realtor-eho-logo.png"
                alt="REALTOR / Equal Housing Opportunity"
                width={355}
                height={184}
                unoptimized
                className="h-8 w-auto"
              />
            </span>
          </div>
          <p className="max-w-2xl">
            Each Keller Williams office is independently owned and operated. Information deemed
            reliable but not guaranteed. License #{agent.licenseNumber}
          </p>
        </div>
        <div className="container-xl pb-8 text-xs text-gray-500">
          &copy; {year} Cadenhead Realty Group. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
