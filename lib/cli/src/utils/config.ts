import { generateCode, loadFile, type ProxifiedModule } from "npm:magicast";
import type { NetzoConfig } from "../../deps.ts";
import { error } from "../console.ts";
import { Args } from "../subcommands/deploy.ts";

const CONFIG = "netzo.config.(ts|js)";

export async function getNetzoConfigUrl() {
  try {
    const urlTs = `${Deno.cwd()}/netzo.config.ts`;
    await Deno.stat(urlTs); // throws if not found
    return urlTs;
  } catch {
    try {
      const urlJs = `${Deno.cwd()}/netzo.config.js`;
      await Deno.stat(urlJs); // throws if not found
      return urlJs;
    } catch (e) {
      if (e instanceof Deno.errors.NotFound) {
        error(`Missing ${CONFIG} at ${Deno.cwd()}.`);
      } else {
        error(e.message);
      }
    }
  }
};

export async function assertExistsNetzoConfigMod(
  url: string,
): Promise<ProxifiedModule> {
  try {
    const mod = await loadFile(url);
    return mod.exports.default?.$type === "function-call"
      ? mod.exports.default.$args[0] // function wrapper (defineNetzoConfig)
      : mod.exports.default; // bare object export
  } catch {
    const message =
      `Make sure you default export the config object wrapped in "defineNetzoConfig" or as a bare object.`;
    error(`Invalid ${CONFIG} at ${Deno.cwd()}. ${message}`);
  }
}

export function assertExistsNetzoConfig(
  mod: ProxifiedModule,
): Promise<NetzoConfig> {
  try {
    return mod.exports.default?.$type === "function-call"
      ? mod.exports.default.$args[0] // function wrapper (defineNetzoConfig)
      : mod.exports.default; // bare object export
  } catch {
    const message =
      `Make sure you default export the config object wrapped in "defineNetzoConfig" or as a bare object.`;
    error(`Invalid ${CONFIG} at ${Deno.cwd()}. ${message}`);
  }
}

export function assertValidNetzoConfig({
  project,
  modules,
  ...netzoConfig
}: NetzoConfig, args: Args) {
  // 1) rebuild config: override and sort specific keys from config with args
  const config: NetzoConfig = {
    project: args.project || project,
    modules,
    ...netzoConfig,
  };
  try {
    // 2) ensure required keys are present and valid
    const required = ["project"];
    required.forEach((key) => {
      const message = `Missing "${key}" property in ${CONFIG}`;
      if (!config[key]) throw new Error(message);
    });

    return config;
  } catch {
    error(`Invalid ${CONFIG} at ${Deno.cwd()}.`);
  }
}

export async function updateNetzoConfig(url: string, mod: ProxifiedModule) {
  try {
    const { code } = generateCode(mod);
    await Deno.writeTextFile(url, code);
    return code;
  } catch {
    error(`Failed to update ${CONFIG} at ${Deno.cwd()}.`);
  }
}
