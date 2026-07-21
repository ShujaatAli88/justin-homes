import type { Metadata } from "next";
import { ValuationHero } from "@/components/sections/ValuationHero";

export const metadata: Metadata = {
  title: "What's My Home Worth?",
  description:
    "Get an instant estimated value for your Brownwood-area home, backed up by a personal market analysis from Justin Cadenhead.",
};

export default function HomeValuationPage() {
  return <ValuationHero />;
}
