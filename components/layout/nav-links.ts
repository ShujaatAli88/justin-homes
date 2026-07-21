export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  children: NavLink[];
}

export type NavItem = NavLink | NavGroup;

export function isNavGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

export const primaryNav: NavLink[] = [
  { label: "Portfolio", href: "/properties" },
  { label: "Neighborhoods", href: "/neighborhoods" },
  { label: "Home Search", href: "/home-search/listings" },
  { label: "Home Valuation", href: "/home-valuation" },
];

export const ctaLink: NavLink = { label: "Let's Connect", href: "/contact" };
