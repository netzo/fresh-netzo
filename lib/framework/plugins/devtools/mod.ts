import type { Project } from "../../../framework/mod.ts";
import { bindSignal } from "./plugins/bindSignal/mod.ts";

export type DevtoolsOptions = Project["config"]["devtools"];

// deno-lint-ignore ban-types
export type DevtoolsState = {};

export const devtools = (_options: DevtoolsOptions = {}): Plugin => {
  return {
    ...bindSignal(),
    name: "devtools",
  };
};
