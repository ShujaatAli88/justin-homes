export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  headshot: string;
}

// TODO(client): Abby's headshot is pending — swap the placeholder path below
// once it's supplied.
export const team: TeamMember[] = [
  {
    slug: "justin",
    name: "Justin Cadenhead",
    role: "REALTOR®, Keller Williams",
    headshot: "/images/agent/justin.jpg",
  },
  {
    slug: "abby",
    name: "Abby Cadenhead",
    role: "REALTOR®, Keller Williams",
    headshot: "{{ABBY_HEADSHOT}}",
  },
];
