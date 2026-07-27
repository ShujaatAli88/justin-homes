"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { useContactModal } from "@/components/layout/ContactModalProvider";
import { SectionHeading } from "@/components/ui/Card";

type IconType = "roots" | "globe" | "collab" | "heart";

function StoryIcon({ type }: { type: IconType }) {
  const common = { viewBox: "0 0 24 24", className: "h-8 w-8", fill: "none", stroke: "currentColor", strokeWidth: 1.6 } as const;
  if (type === "roots") {
    return (
      <svg {...common}>
        <path d="M12 3v9" />
        <path d="M12 21c0-4 4-6 4-10" />
        <path d="M12 21c0-4-4-6-4-10" />
        <circle cx="12" cy="3" r="2" />
      </svg>
    );
  }
  if (type === "globe") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a15 15 0 0 1 0 18" />
        <path d="M12 3a15 15 0 0 0 0 18" />
      </svg>
    );
  }
  if (type === "collab") {
    return (
      <svg {...common}>
        <circle cx="9" cy="10" r="4" />
        <circle cx="16" cy="12" r="4" />
        <path d="M4 20c0-3 2.5-5 5.5-5" />
        <path d="M20 20c0-3-2.2-5-4.8-5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 20.5S3 15 3 8.8A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 9 2.8C21 15 12 20.5 12 20.5Z" />
    </svg>
  );
}

const story: { index: string; icon: IconType; title: string; body: string }[] = [
  {
    index: "01",
    icon: "roots",
    title: "Why Choose Us?",
    body: "As proud generational members of the Brownwood community, we bring a deep understanding of the local real estate market. Our roots in the area give us a unique advantage in providing insights that go beyond just property features. Whether you're buying or selling, our goal is to make the process as seamless and stress-free as possible.",
  },
  {
    index: "02",
    icon: "globe",
    title: "Local Expertise, Global Reach",
    body: "Backed by a solid network and the latest technological tools, we leverage both traditional and modern methods to ensure your property gets the attention it deserves. From stunning lakefront homes to cozy downtown dwellings, we specialize in connecting buyers with their ideal homes and helping sellers get the best value for their properties.",
  },
  {
    index: "03",
    icon: "collab",
    title: "Collaborative Approach",
    body: "As a husband-and-wife team, we understand the importance of collaboration. With complementary skills and a shared dedication to client success, we provide a unique and comprehensive approach to real estate. When you work with us, you benefit from two experienced agents working together to achieve your goals.",
  },
  {
    index: "04",
    icon: "heart",
    title: "Community Involvement",
    body: "Beyond buying and selling homes, we are passionate about giving back to the community that has given us so much. We are actively involved in local initiatives and events, supporting the growth and well-being of Brown County. When you work with us, you're not just getting real estate agents; you're gaining a partnership dedicated to the success of our community.",
  },
];

export function AboutStory() {
  const { openContactModal } = useContactModal();

  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-6 sm:pb-28 sm:pt-8">
      <div className="container-xl">
        <SectionHeading eyebrow="Our Philosophy" title="The Cadenhead Difference" align="center" />

        <div className="relative mt-20">
          <span
            aria-hidden
            className="absolute left-9 top-2 bottom-2 hidden w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent sm:left-1/2 sm:block sm:-translate-x-1/2"
          />

          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-14 sm:space-y-6"
          >
            {story.map((item, i) => (
              <motion.div
                key={item.index}
                variants={fadeInUp}
                className={`group relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-12 sm:py-8 ${
                  i % 2 === 1 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="relative z-10 flex shrink-0 items-center justify-center">
                  <span
                    aria-hidden
                    className="font-nav pointer-events-none absolute select-none whitespace-nowrap text-7xl font-bold leading-none text-gray-50 transition-colors duration-500 group-hover:text-rose-50 sm:text-8xl"
                  >
                    {item.index}
                  </span>
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neutral-900 to-black text-kw-red shadow-[0_8px_24px_rgba(0,0,0,0.25)] ring-4 ring-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_12px_32px_rgba(206,1,31,0.45)] sm:h-20 sm:w-20">
                    <StoryIcon type={item.icon} />
                  </span>
                </div>

                <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:border-kw-red/15 group-hover:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.15)] sm:p-10">
                  <span
                    aria-hidden
                    className="mb-4 block h-1 w-10 rounded-full bg-kw-red transition-all duration-500 group-hover:w-16"
                  />
                  <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">{item.title}</h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-600">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="relative mt-20 overflow-hidden bg-black px-8 py-16 text-center sm:px-16"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(206,1,31,0.3)_0%,transparent_45%),radial-gradient(circle_at_80%_70%,rgba(206,1,31,0.3)_0%,transparent_45%)]"
          />
          <div className="relative">
            <h3 className="font-nav text-3xl uppercase tracking-widest text-white sm:text-4xl">
              Let&apos;s Start Your Real Estate Journey
            </h3>
            <button
              type="button"
              onClick={openContactModal}
              className="group/cta mt-8 inline-flex items-center gap-3 rounded-full bg-kw-red px-8 py-4 font-nav text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-kw-red-dark hover:shadow-[0_10px_30px_rgba(206,1,31,0.4)]"
            >
              Let&apos;s Connect
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">
                &rarr;
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
