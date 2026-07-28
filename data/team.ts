export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  headshot: string;
  brokerage: string;
  location: string;
  phone: string;
  email: string;
  website?: string;
}

export const team: TeamMember[] = [
  {
    slug: "justin",
    name: "Justin Cadenhead",
    role: "REALTOR®, Keller Williams",
    headshot: "/images/agent/justin-v2.jpg",
    brokerage: "KW Synergy",
    location: "Brownwood, TX, USA",
    phone: "(325) 642-7644",
    email: "justin.cadenhead@kw.com",
    website: "www.cadenheadrealty.kw.com",
  },
  {
    slug: "abby",
    name: "Abby Cadenhead",
    role: "REALTOR®, Keller Williams",
    headshot: "/images/agent/abby-v2.jpg",
    brokerage: "KW Synergy",
    location: "Abilene, TX",
    phone: "(325) 642-1944",
    email: "abby.cadenhead@kw.com",
    website: "www.cadenheadrealty.kw.com",
  },
];
