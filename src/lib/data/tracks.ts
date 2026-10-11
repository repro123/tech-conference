export const tracks = [
  { label: "frontend", href: "#", description: "building modern interfaces for the web" },
  { label: "performance", href: "#", description: "make every millisecond count" },
  { label: "accessibility", href: "#", description: "building inclusive experience for everyone" },
  { label: "tooling", href: "#", description: "level up your developer workflow" },
] as const;

export type Track = (typeof tracks)[number]["label"];
