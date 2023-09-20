import { StartOptions } from "$fresh/server.ts";

export interface NetzoConfig extends StartOptions {
  project: string;
}

export function defineNetzoConfig(config: NetzoConfig): NetzoConfig {
  return config;
}