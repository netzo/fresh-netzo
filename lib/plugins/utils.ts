// adapted from https://github.com/oaarnikoivu/shadcn-virtualized-combobox
// @deno-types="npm:@types/react@18.2.60"

import { blue, bold, green, red, white, yellow } from "https://deno.land/std@0.208.0/fmt/colors.ts";
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
  loadedEnvsNotice: (
    countLocal: number,
    countRemote: number,
    countTotal: number,
  ) => {
    return `Loaded ${countTotal} environment variables from ${countLocal} local and ${
      countTotal - countLocal
    } remote (overwrote ${(countLocal + countRemote) - countTotal}).`;
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
  localEnvVarSet: (key: string) => {
    return `Overwrote remote environment variable "${key}" with local.`;
  },
  deploymentError: (message: string) => {
    return `DeploymentError: ${message}`;
  },
} as const;

export const RESPONSES = {
  missingApiKey: () => new Response("Missing API key", { status: 401 }),
  invalidApiKey: () => new Response("Invalid API key", { status: 401 }),
  notAllowed: () => new Response("Method not allowed", { status: 405 }),
  notImplemented: () => new Response("Method not implemented", { status: 501 }),
  badRequest: (message: string) => new Response(message, { status: 400 }),
};

// deno-lint-ignore no-explicit-any
export async function parseRequestBody<T = any>(req: Request) {
  const contentType = req.headers.get("content-type"); // case insensitive
  if (contentType?.includes("application/json")) {
    return (await req.json()) as T;
  } else if (
    contentType?.includes("application/x-www-form-urlencoded") ||
    contentType?.includes("multipart/form-data")
  ) {
    const formData = await req.formData();
    return Object.fromEntries([...formData.entries()]) as T;
  } else if (contentType?.includes("text/plain")) {
    return JSON.parse(await req.text()) as T;
  } else {
    try {
      return (await req.json()) as T;
    } catch (_jsonError) {
      try {
        return Object.fromEntries((await req.formData()).entries()) as T;
      } catch (_formDataError) {
        try {
          const url = new URL(req.url);
          return Object.fromEntries(url.searchParams.entries()) as T;
        } catch (_formDataError) {
          return JSON.parse(await req.text()) as T;
        }
      }
    }
  }
}
