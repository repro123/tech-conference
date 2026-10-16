export const tracks = [
  { label: "frontend", href: "frontend", description: "building modern interfaces for the web" },
  { label: "performance", href: "performance", description: "make every millisecond count" },
  { label: "accessibility", href: "a11y", description: "building inclusive experience for everyone" },
  { label: "tooling", href: "tooling", description: "level up your developer workflow" },
] as const;

export type Track = (typeof tracks)[number]["label"];
