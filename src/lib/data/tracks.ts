export const tracks = [
  { label: "frontend", href: "#" },
  { label: "performance", href: "#" },
  { label: "accessibility", href: "#" },
  { label: "tooling", href: "#" },
] as const;

export type Track = (typeof tracks)[number]["label"];
