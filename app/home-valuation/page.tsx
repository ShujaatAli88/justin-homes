import type { Metadata } from "next";
import { SmartImage } from "@/components/ui/SmartImage";
import { ValuationForm } from "@/components/ui/ValuationForm";
import { agent } from "@/data/agent";

export const metadata: Metadata = {
  title: "What's My Home Worth?",
  description:
    "Get an instant estimated value for your Brownwood-area home, backed up by a personal market analysis from Justin Cadenhead.",
};

const features = ["Instant Property Valuation", "Expert Advice", "Sell For More"];

export default function HomeValuationPage() {
  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black py-32">
      <div aria-hidden className="absolute inset-0">
        <SmartImage src="/images/approach/selling.jpg" alt="" label="" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
      </div>

      <div className="container-xl relative flex flex-col items-center text-center text-white">
        <p className="font-nav text-xs uppercase tracking-[0.4em] text-kw-red">Thinking About Selling?</p>
        <span aria-hidden className="mt-3 h-px w-14 bg-white/40" />
        <h1 className="font-nav mt-5 max-w-3xl text-3xl uppercase tracking-widest sm:text-5xl">
          How Much Is Your Home Worth?
        </h1>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest sm:text-sm">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-kw-red">
                <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        <p className="mt-4 max-w-xl text-sm text-gray-300">
          Get a free, no-obligation estimate for your Brownwood-area home, backed up by a personal
          market analysis from {agent.name}.
        </p>

        <div className="mt-10 flex w-full justify-center">
          <ValuationForm />
        </div>
      </div>
    </div>
  );
}
