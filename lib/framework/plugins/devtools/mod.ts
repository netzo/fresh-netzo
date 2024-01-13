import type { Plugin } from "../../../deps/$fresh/server.ts";
import { bindSignal } from "./plugins/bindSignal/mod.ts";

export type DevtoolsConfig = {
  bindSignal?: Record<string | number | symbol, never>; // (empty object)
};

export const devtools = (_options: DevtoolsConfig): Plugin[] => [
  bindSignal(),
];
