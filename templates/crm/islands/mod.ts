// NOTE: re-export specific components from islands/ for reactivity
export * from "netzo/components/layout/mod.ts";

export const toDateTime = (dateTime: string) =>
  new Date(dateTime).toLocaleString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
