export const navlinks = [
  { label: "home", href: "/" },
  { label: "schedule", href: "/schedule" },
  { label: "speakers", href: "/speakers" },
] as const;

export type Navlink = (typeof navlinks)[number]["label"];
