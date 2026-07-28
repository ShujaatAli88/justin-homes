export interface AgentProfile {
  name: string;
  brokerage: string;
  title: string;
  tagline: string;
  bio: string;
  licenseNumber: string;
  headshot: string;
  email: string;
  phone: string;
  officeAddress: string;
  areasServed: string[];
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
    youtube: string;
  };
}

export const agent: AgentProfile = {
  name: "Justin Cadenhead",
  brokerage: "KW Synergy",
  title: "REALTOR®",
  tagline: "We have a passion for helping our clients achieve their real estate goals.",
  bio: "Welcome to the dynamic world of real estate, where dreams meet homes! We are Abby & Justin, a dedicated husband-and-wife real estate team serving the vibrant area of central Texas. With a passion for helping clients find their perfect property and a commitment to excellence, we are here to guide you through every step of your real estate journey.",
  licenseNumber: "0813676",
  headshot: "/images/agent/justin-v2.jpg",
  email: "justin.cadenhead@kw.com",
  phone: "(325) 642-7644",
  officeAddress: "208 E Anderson St, Brownwood, TX 76801",
  areasServed: ["Brownwood", "{{AREAS_SERVED_LIST}}"],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100090700603147",
    instagram: "https://www.instagram.com/cadenheadrealtygroup",
    tiktok: "https://www.tiktok.com/@justincadenhead3",
    youtube: "https://www.youtube.com/@BrownwoodTX-m5d",
  },
};
