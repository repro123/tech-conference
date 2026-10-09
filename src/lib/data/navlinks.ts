export const navlinks = ["home", "schedule", "speakers"] as const;

export type Navlink = (typeof navlinks)[number];
