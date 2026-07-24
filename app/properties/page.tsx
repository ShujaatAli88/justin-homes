import type { Metadata } from "next";
import { PortfolioHero } from "@/components/sections/PortfolioHero";

export const metadata: Metadata = {
  title: "Portfolio | Active Listings",
  description:
    "Browse active Brownwood & Early, TX area listings from Cadenhead Realty Group, updated live from the MLS.",
};

export default function PropertiesPage() {
  return <PortfolioHero />;
}
