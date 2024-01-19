import type { Plugin } from "../../../deps/$fresh/server.ts";
import { bindSignal } from "./plugins/bindSignal/mod.ts";

export const devtools = (): Plugin[] => [
  bindSignal(),
];
