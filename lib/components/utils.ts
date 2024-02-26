// unocss might have twMerge alternative soon
// see https://github.com/unocss/unocss/issues/2748
import { type ClassValue, clsx } from "../deps/clsx.ts";
import { createTwc } from "../deps/react-twc.ts";
import { twMerge } from "../deps/tailwind-merge.ts";
import type { ZodObject } from "../deps/zod/mod.ts";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const twx = createTwc({ compose: cn });

export function zodSelect(schema: ZodObject, propertyPath: string) {
  const properties = propertyPath.split(".");

  if (properties.length === 0) return schema;

  const currentProperty = properties[0];
  if (properties.length === 1) return schema.pick({ [currentProperty]: true });

  const nextPropertyPath = properties.slice(1, properties.length).join(".");
  const nextSchema = schema.shape[currentProperty];
  if (!nextSchema) return schema;

  return zodSelect(nextSchema, nextPropertyPath);
}
