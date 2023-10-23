import { blue, bold, green, red, yellow } from "../deps.ts";

export const LOGS = {
  missingApiKey:
    "Missing API key. Set via --api-key flag or NETZO_API_KEY environment variable to avoid passing it each time.",
  notFoundProject:
    "Project not found. Check the project UID and make sure your API key has access to the project.",
} as const;

export function printSuccess(message: string) {
  console.log(green(`${bold("success")}: ${message}`));
}

export function printInfo(message: string) {
  console.info(blue(`${bold("info")}: ${message}`));
}

export function printWarning(message: string) {
  console.warn(yellow(`${bold("warning")}: ${message}`));
}

export function printError(message: string) {
  console.error(red(`${bold("error")}: ${message}`));
}

export function error(message: string): never {
  printError(message);
  Deno.exit(1);
}
