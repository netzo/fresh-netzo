import { blue, bold, green, red, white, yellow } from "../deps.ts";

export const LOGS = {
  missingApiKey:
    "Missing API key. Set via --api-key flag or NETZO_API_KEY environment variable.",
  skippingLoadingOfEnvVars: `Skipping loading of "development" environment variables.`,
  notFoundProject:
    "Project not found. Check the project UID and make sure your API key has access to the project.",
} as const;

export function log(message: string) {
  console.log(white(`${bold("[netzo]")} ${message}`));
}

export function logInfo(message: string) {
  console.info(blue(`${bold("[netzo]")} ${message}`));
}

export function logSuccess(message: string) {
  console.log(green(`${bold("[netzo]")} ${message}`));
}

export function logWarning(message: string) {
  console.warn(yellow(`${bold("[netzo]")} ${message}`));
}

export function logError(message: string) {
  console.error(red(`${bold("[netzo]")} ${message}`));
}

export function error(message: string): never {
  logError(message);
  Deno.exit(1);
}
