import { monotonicFactory } from "../deps/ulid.ts";

export const ulid = monotonicFactory();

export const isUlid = (str: string) => {
  // from https://regex101.com/library/ik6xZx
  const ULID = /[0-7][0-9A-HJKMNP-TV-Z]{25}/gm;
  return ULID.test(str);
};

export const ERRORS = {
  missingProperty: (property: string) =>
    `Missing "${property}" property in options.`,
  invalidProperty: (property: string) =>
    `Invalid "${property}" property in options.`,
};
