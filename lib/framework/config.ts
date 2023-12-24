import { deepMerge } from "../deps/std/collections/deep_merge.ts";
import { replace } from "../deps/object-replace-mustache.ts";
import type { Project } from "../deps/@netzo/api/mod.ts";
import { CONFIG } from "./config.defaults.ts";
import { NetzoConfig } from "netzo/framework/mod.ts";

const mergeOptions = {
  arrays: "replace",
  maps: "replace",
  sets: "replace",
} as const;

export const resolveConfig = (
  project: Project,
  partialConfig: Partial<NetzoConfig> = {},
): NetzoConfig => {
  // 1) merge defaults and remote config
  let config = deepMerge(CONFIG, project.config, mergeOptions);
  // 2) merge local config (local config takes precedence for better DX)
  config = deepMerge(config, partialConfig, mergeOptions);
  // 3) render values with mustache placeholders
  config = replace(config, {
    project: {
      uid: project.uid,
      name: project.name,
      description: project.description,
      labels: project.labels,
      avatar: project.avatar,
    }, // minimize passed in values for security
    ...Deno.env.toObject(), // make al runtime environment variables available
  });

  return config;
};
