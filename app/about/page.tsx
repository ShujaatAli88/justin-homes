import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutStory } from "@/components/sections/AboutStory";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Abby & Justin Cadenhead — your Central Texas real estate team serving Brownwood, Early, and the surrounding Brown County area.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
    </>
  );
}
