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
  brokerage: "Keller Williams",
  title: "REALTOR®",
  tagline: "We have a passion for helping our clients achieve their real estate goals.",
  // TODO(client): demo copy for preview purposes only — replace with Justin's real bio.
  bio: "Justin Cadenhead is a REALTOR® with Keller Williams, proud to call Brownwood, Texas home. He works with buyers and sellers throughout Brown County, bringing a hands-on, straightforward approach to every transaction from the first showing to closing day.\n\nJustin believes real estate is about more than transactions it's about listening closely, communicating clearly, and guiding clients through one of the biggest decisions they'll make. Whether you're buying your first home, selling a family property, or investing in land, he's committed to making the process feel simple, informed, and personal.",
  licenseNumber: "0813676",
  headshot: "/images/agent/justin.jpg",
  email: "Justincadenhead@gmail.com", // TODO(client): personal Gmail in use — replace with a business email when available
  phone: "(325) 642-7644",
  officeAddress: "{{OFFICE_ADDRESS}}",
  areasServed: ["Brownwood", "{{AREAS_SERVED_LIST}}"],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100090700603147",
    instagram: "https://www.instagram.com/cadenheadrealtygroup",
    tiktok: "https://www.tiktok.com/@justincadenhead3",
    youtube: "https://www.youtube.com/@BrownwoodTX-m5d",
  },
};
