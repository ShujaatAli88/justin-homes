import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Cinzel } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { ContactModalProvider } from "@/components/layout/ContactModalProvider";
import { agent } from "@/data/agent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-nav",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://cadenheadrealty.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cadenhead Realty Group | Brownwood, TX REALTOR®",
    template: "%s | Cadenhead Realty Group",
  },
  description: agent.tagline,
  openGraph: {
    title: "Cadenhead Realty Group",
    description: agent.tagline,
    url: siteUrl,
    siteName: "Cadenhead Realty Group",
    locale: "en_US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: agent.name,
  jobTitle: agent.title,
  worksFor: {
    "@type": "Organization",
    name: agent.brokerage,
  },
  areaServed: agent.areasServed,
  telephone: agent.phone,
  email: agent.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: agent.officeAddress,
  },
  url: siteUrl,
  sameAs: [agent.social.facebook, agent.social.instagram, agent.social.tiktok, agent.social.youtube],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${cinzel.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScrollProvider>
          <ContactModalProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ContactModalProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
