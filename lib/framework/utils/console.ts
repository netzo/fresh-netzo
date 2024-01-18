import {
  blue,
  bold,
  green,
  red,
  white,
  yellow,
} from "https://deno.land/std@0.205.0/fmt/colors.ts";

export const LOGS = {
  missingApiKey:
    "Missing API key. Set via --api-key flag or NETZO_API_KEY environment variable.",
  buildFailed: "Build failed. Fix issues or try running without --build.",
  skippingLoadingOfEnvVars:
    `Skipping loading of "development" environment variables.`,
  notFoundProject: "Project not found. Check the project ID and API key.",
  // framework:
  localEnvNotice:
    "Running in development environment (NETZO_PROJECT_ID and/or NETZO_API_KEY not provided).",
  remoteEnvNotice: (count: number) => `Running in production environment (loaded ${count} environment variables).`,
} as const;

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

// WORKAROUND: until resolution of https://github.com/denoland/fresh/issues/1773#issuecomment-1763502518
const origConsoleWarn = console.warn;
console.warn = (msg) => {
  if (typeof msg === "string") {
    if (
      msg.includes(`Comparison using the "!==" operator here is always true`)
    ) return;
  }
  origConsoleWarn(msg);
};
const origConsoleError = console.error;
console.error = (msg) => {
  if (typeof msg === "string") {
    if (msg.includes("Improper nesting of table")) return;
    if (
      msg.includes(
        `Not implemented: ClientRequest.options.createConnection`,
      )
    ) return;
  }
  origConsoleError(msg);
};
