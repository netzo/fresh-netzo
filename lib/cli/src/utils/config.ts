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
        error(`Missing "${CONFIG}" at file://${Deno.cwd()}.`);
      } else {
        error(e.message);
      }
    }
  }
}

export async function assertExistsNetzoConfigMod(
  url: string,
): Promise<ProxifiedModule> {
  try {
    const mod = await loadFile(url);
    return mod;
  } catch {
    const message = `Check that the file is valid TypeScript or JavaScript.`;
    error(`Invalid "${CONFIG}" at file://${Deno.cwd()}. ${message}`);
  }
}

export function assertExistsNetzoConfig(
  mod: ProxifiedModule,
): Promise<NetzoConfig> {
  try {
    if (mod.exports.default?.$type === "function-call") {
      // force function wrapper (defineNetzoConfig)
      return mod.exports.default.$args[0];
    }
    // disallow bare object export (mod.exports.default)
    const message =
      `Make sure you default export the config object wrapped in "defineNetzoConfig".`;
    throw new Error(message);
  } catch {
    const message =
      `Make sure to default export config wrapped in "defineNetzoConfig({...})".`;
    error(`Invalid "${CONFIG}" at file://${Deno.cwd()}. ${message}`);
  }
}

export function assertValidNetzoConfig(config: NetzoConfig, args: Args) {
  // IMPORTANT: config is proxified, so assignments must be done key-by-key
  try {
    // 1) rebuild config: override and sort specific keys from config with args
    if (args.project) config.project = args.project;

    // 2) ensure required keys are present and valid
    const required = ["project"];
    required.forEach((key) => {
      const message = `Missing "${key}" property in ${CONFIG}`;
      if (!config[key]) throw new Error(message);
    });

    return config;
  } catch {
    error(`Invalid "${CONFIG}" at file://${Deno.cwd()}.`);
  }
}

export async function updateNetzoConfig(url: string, mod: ProxifiedModule) {
  try {
    const { code } = generateCode(mod);
    await Deno.writeTextFile(url, code);
    return code;
  } catch {
    error(`Failed to update "${CONFIG}" at file://${Deno.cwd()}.`);
  }
}
