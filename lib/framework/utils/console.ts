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
  missingProjectId:
    "Missing project ID. Set via --project flag or NETZO_PROJECT_ID environment variable.",
  buildFailed: "Build failed. Fix issues or try running without --build.",
  skippingLoadingOfEnvVars:
    `Skipping loading of "development" environment variables.`,
  notFoundProject: "Project not found. Check the project ID and API key.",
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
