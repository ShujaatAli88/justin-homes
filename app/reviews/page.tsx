import type { Metadata } from "next";
import { ReviewHero } from "@/components/sections/ReviewHero";

export const metadata: Metadata = {
  title: "Share Your Experience",
  description:
    "Leave a review for Cadenhead Realty Group and share your home buying or selling experience — published instantly.",
};

export default function ReviewsPage() {
  return <ReviewHero />;
}
