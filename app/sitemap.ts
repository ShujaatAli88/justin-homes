import type { MetadataRoute } from "next";
import { listings } from "@/data/listings";

const siteUrl = "https://cadenheadrealty.com";

/**
 * TODO: extend this list as each remaining page in the site map (§6 of the
 * build brief) is implemented — /home-search/listings, /neighborhoods
 * (+ [slug]), /testimonials, /vlog, /buyers, /sellers, /blog (+ [slug]).
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
    ...listings.map((listing) => ({
      url: `${siteUrl}/properties/${listing.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
