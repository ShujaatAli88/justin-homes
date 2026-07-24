"use client";

import { useState, type CSSProperties } from "react";

interface IDXEmbedProps {
  /** The NTREIS Matrix `idx` query param identifying which saved widget to render. */
  idx: string;
  /** Descriptive iframe title for accessibility — not visible on the page. */
  title: string;
  /** Floor height in px at desktop widths. Mobile gets +200px since the IDX UI stacks vertically there. */
  minHeight?: number;
}

type HeightVars = CSSProperties & { [key: `--${string}`]: string };

/**
 * Wraps a live NTREIS Matrix IDX widget (cross-domain iframe served by the
 * client's MLS — Active Listings and Map Search both use this).
 *
 * The embed cannot self-resize (no postMessage resize handshake from NTREIS),
 * so height is pinned via `minHeight` rather than a fixed aspect-ratio box —
 * an aspect-ratio would clip the search/listing UI, whereas a floor height
 * lets the iframe's own internal scrollbar take over for any overflow.
 *
 * IMPORTANT: NTREIS Matrix locks these embeds to the approved production
 * domain (cadenheadrealty.com). On localhost / preview domains the iframe
 * will render blank — that's expected, not a bug. Final visual verification
 * must happen on the live domain once it's the one pointed at this deploy.
 */
export function IDXEmbed({ idx, title, minHeight = 800 }: IDXEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  const heightVars: HeightVars = {
    "--idx-min-h": `${minHeight}px`,
    "--idx-min-h-mobile": `${minHeight + 200}px`,
  };

  return (
    <div
      className="relative w-full min-h-[var(--idx-min-h-mobile)] overflow-hidden sm:min-h-[var(--idx-min-h)]"
      style={heightVars}
    >
      {!loaded && (
        <div
          aria-hidden
          className="absolute inset-0 flex animate-pulse flex-col gap-4 bg-gray-50 p-6 sm:p-8"
        >
          <div className="h-9 w-1/2 rounded bg-gray-200" />
          <div className="h-56 w-full rounded bg-gray-200 sm:h-72" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="h-28 rounded bg-gray-200" />
            <div className="h-28 rounded bg-gray-200" />
            <div className="hidden h-28 rounded bg-gray-200 sm:block" />
          </div>
        </div>
      )}

      <iframe
        src={`https://ntrdd.mlsmatrix.com/Matrix/public/IDX.aspx?idx=${idx}`}
        title={title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="relative z-10 block min-h-[var(--idx-min-h-mobile)] w-full border-0 sm:min-h-[var(--idx-min-h)]"
        style={heightVars}
      />
    </div>
  );
}
