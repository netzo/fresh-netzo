import { defineConfig } from "../plugin.ts";
import { presetNetzo, type PresetNetzoOptions } from "../preset-netzo.ts";

// TODO: import this factory from the client (during CSR hydration) and
// use it to create a config object from state.options (which does not
// include functions so there is no issue with serialization losing functions)
// the only issue is that createUnoConfig MUST be imported from a javascript
// module since the browser does not support typescript, so we would need to
// bundle it along  with all its dependencies using std/bundle and an importMap
export const createUnoConfig = (options: PresetNetzoOptions) => {
  const { color = "blue", radius = 0.5 } = options ?? {};
  return defineConfig({
    presets: [presetNetzo({ color, radius })],
  });
};
