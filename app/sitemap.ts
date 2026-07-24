import type { MetadataRoute } from "next";

const siteUrl = "https://cadenheadrealty.com";

/**
 * TODO: extend this list as each remaining page in the site map (§6 of the
 * build brief) is implemented — /neighborhoods (+ [slug]), /testimonials,
 * /vlog, /buyers, /sellers, /blog (+ [slug]).
 *
 * Note: /properties and /home-search/listings both embed live NTREIS Matrix
 * IDX widgets (see components/IDXEmbed.tsx) — there are no individual
 * /properties/[slug] listing pages anymore since we don't have structured
 * per-listing MLS data, just the embed itself.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/properties`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/home-search/listings`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/home-valuation`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/reviews`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
