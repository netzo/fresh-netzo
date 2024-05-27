import { IS_BROWSER } from "fresh/runtime.ts";
import type { ComponentChildren } from "preact";

export const ClientOnly = ({ children }: { children: ComponentChildren }) => {
  return IS_BROWSER ? children : null;
};
