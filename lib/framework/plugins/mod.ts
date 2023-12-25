import type { Plugin } from "../../deps/$fresh/server.ts";
import { logInfo } from "../utils/console.ts";
import type { NetzoState } from "../mod.ts";

export const enabled = (obj: { [k: string]: unknown; enabled?: boolean }) =>
  obj?.enabled !== false;

/**
 * An internal utility to bundle plugins based on app configuration.
 * @param state {NetzoState} - the app configuration
 * @returns {Promise<Plugin[]>} - the bundled plugins
 */
export async function createPluginsForModules(
  state: NetzoState,
): Promise<Plugin[]> {
  // NOTE: async plugin initialization is parallelized for better performance
  const PLUGINS = ["auth", "ui", "api", "devtools"];
  const UI = ["head", "nav", "header", "footer", "theme"];
  let uiEnabled = false;
  const pluginsWithDuplicates = (await Promise.all(
    PLUGINS.map(async (name) => {
      if (["ui"].includes(name)) {
        const ui = state?.config?.ui;
        if (!ui) return; // skip if ui is not set at least to {}
        uiEnabled = !!UI.filter((key) => enabled(ui?.[key])).length;
        if (!uiEnabled) return; // skip if ui is set but no plugins are enabled
      } // skip disabled plugins (note that they are disabled only if set to false)
      else if (!enabled(state.config?.[name])) return;

      switch (name) {
        case "auth": {
          const mod = await import("./auth/mod.ts");
          return [mod.auth(state.config[name])];
        }
        case "ui": {
          const mod = await import("./ui/mod.ts");
          return [mod.ui(state.config[name])];
        }
        case "api": {
          const mod = await import("./api/mod.ts");
          return [mod.api(state.config[name])];
        }
        case "devtools": {
          const mod = await import("./devtools/mod.ts");
          return [mod.devtools(state.config[name])];
        }
      }
    }),
  )).flat().filter((plugin) => !!plugin?.name);

  // deduplicate plugins by name (uses includes(searchElement, fromIndex))
  const names = pluginsWithDuplicates.map(({ name }) => name);
  const plugins = pluginsWithDuplicates.filter(
    ({ name }, i) => !names.includes(name, i + 1),
  );
  logInfo(`Plugins: ${
    plugins.map(
      ({ name }) => {
        if (name === "ui") return `${uiEnabled ? "✅" : "❌"} ${name}`;
        return `${!!state.config[name]?.enabled ? "✅" : "❌"} ${name}`;
      },
    ).join(" | ")
  }`);

  return plugins;
}
