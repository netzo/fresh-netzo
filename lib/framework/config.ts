import { deepMerge } from "../deps/std/collections/deep_merge.ts";
import { replace } from "../deps/object-replace-mustache.ts";
import { CONFIG } from "./config.defaults.ts";
import type { NetzoConfig, Project } from "netzo/framework/mod.ts";

const mergeOptions = {
  arrays: "replace",
  maps: "replace",
  sets: "replace",
} as const;

export const resolveConfig = (
  config: Partial<NetzoConfig> = {},
  project: Project,
): NetzoConfig => {
  // 1) merge defaults and remote config
  config = deepMerge(CONFIG as Partial<NetzoConfig>, config, mergeOptions);
  // 2) render values with mustache placeholders
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

  return config as NetzoConfig;
};
