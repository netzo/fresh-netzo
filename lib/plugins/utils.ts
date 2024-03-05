import {
  bgBlue,
  black,
  blue,
  bold,
  green,
  red,
  white,
  yellow,
} from "jsr:@std/fmt/colors";
import type { Project } from "./types.ts";

/**
 * Silence globalThis.console for selected messages by substrings
 *
 * @param substringsToSkip {string[]} - substrings to skip
 * @returns {Proxy} - a proxied console object
 */
export const proxyConsole = (...substringsToSkip: string[]) => {
  return new Proxy(console, {
    get(target, prop, _receiver) {
      const method = target[prop as keyof typeof console]; // intercept method calls
      // deno-lint-ignore no-explicit-any
      return (...args: any[]) => {
        const message = args.join(" ");
        if (message.includes("🍋 Fresh ready")) {
          return console.log(bgBlue(black(" Netzo ready ")));
        }
        const skip = substringsToSkip.some((s) => message.includes(s));
        if (!skip) method.apply(target, args);
      };
    },
  });
};

export function log(message: string) {
  console.log(white(message));
}

export function logInfo(message: string) {
  console.info(blue(`${bold("info")}: ${message}`));
}

export function logSuccess(message: string) {
  console.log(green(`${bold("success")}: ${message}`));
}

export function logWarning(message: string) {
  console.warn(yellow(`${bold("warning")}: ${message}`));
}

export function logError(message: string) {
  console.error(red(`${bold("error")}: ${message}`));
}

export function error(message: string): never {
  // IMPORTANT: cannot use at runtime because Deno.exit is not allowed in Deploy/Subhosting
  if (Deno.env.get("DENO_REGION")) throw new Error(message);
  logError(message);
  Deno.exit(1);
}

export const LOGS = {
  missingApiKey: () => {
    return "Missing API Key. Set NETZO_API_KEY environment variable or --api-key flag.";
  },
  buildFailed: () => {
    return "Build failed. Check the project logs for details.";
  },
  envNoticeDevelopment: () => {
    return "Running locally... Set NETZO_PROJECT_ID and NETZO_API_KEY to connect to remote project.";
  },
  envNoticeProduction: (count: number) => {
    return `Connected to remote Netzo project. Loaded ${count} environment variables.`;
  },
  notFoundProject: () => {
    return "Project not found. Check the project ID and API key.";
  },
  notFoundEntrypoint: (entrypoint: string) => {
    return `Entrypoint file "${entrypoint}" not found. Check the file path.`;
  },
  openInNetzo: (appUrl: string, { _id, workspaceId }: Project) => {
    const url = `${appUrl}/workspaces/${workspaceId}/projects/${_id}`;
    return `Open at ${url}`;
  },
} as const;
