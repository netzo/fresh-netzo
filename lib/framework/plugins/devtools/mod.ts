import { JSX, options as preactOptions, VNode } from "../../../deps/preact.ts";
import type { Project } from "../../../framework/mod.ts";
import { bindSignal } from "./plugins/bindSignal/mod.ts";

export type DevtoolsOptions = Project["config"]["devtools"];

export type DevtoolsState = {};

export const theme = (_options: DevtoolsOptions = {}): Plugin => {
  return {
    ...bindSignal(),
    name: "devtools",
  };
};
