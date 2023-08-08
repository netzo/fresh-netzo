// A theme is how your UI looks. Style is the visual
// foundation: shapes, icons, animations & typography.
// see https://twitter.com/shadcn/status/1668350011594403842

export const styles = [
  {
    name: "base",
    label: "Base",
  },
  {
    name: "netzo",
    label: "Netzo",
  },
] as const;

export type Style = (typeof styles)[number];
