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
  skippingLoadingOfEnvVars:
    `Skipping loading of "development" environment variables.`,
  notFoundProject: "Project not found. Check the project UID and API key.",
} as const;

export function log(message: string, prefix = true) {
  console.log(white(prefix ? `${bold("[netzo]")} ${message}` : message));
}

export function logInfo(message: string, prefix = true) {
  console.info(blue(prefix ? `${bold("[netzo]")} ${message}` : message));
}

export function logSuccess(message: string, prefix = true) {
  console.log(green(prefix ? `${bold("[netzo]")} ${message}` : message));
}

export function logWarning(message: string, prefix = true) {
  console.warn(yellow(prefix ? `${bold("[netzo]")} ${message}` : message));
}

export function logError(message: string, prefix = true) {
  console.error(red(prefix ? `${bold("[netzo]")} ${message}` : message));
}

export function error(message: string, prefix = true): never {
  logError(message, prefix);
  Deno.exit(1);
}
