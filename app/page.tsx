import { Hero } from "@/components/sections/Hero";
import { ApproachTrio } from "@/components/sections/ApproachTrio";
import { MeetAgent } from "@/components/sections/MeetAgent";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { ActiveListings } from "@/components/sections/ActiveListings";
import { Newsletter } from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <ApproachTrio />
      <MeetAgent />
      <TrustStrip />
      <Testimonials />
      <ActiveListings />
      <Newsletter />
    </>
  );
}
