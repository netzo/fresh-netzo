// deno-lint-ignore-file no-explicit-any
import { _get } from "../../deps/lodash.get.ts";
import { netzo } from "../../apis/netzo/mod.ts";
import type { Project } from "../types.ts";
import { logInfo, log, LOGS } from "./console.ts";

export async function setEnvVarsIfRemoteProject() {
  const {
    NETZO_PROJECT_ID,
    NETZO_API_KEY,
    NETZO_API_URL = "https://api.netzo.io",
    NETZO_APP_URL = "https://app.netzo.io",
  } = Deno.env.toObject();

  if (!NETZO_PROJECT_ID || !NETZO_API_KEY) {
    return logInfo(LOGS.localEnvNotice); // [development] log notice for good DX
  }

  // IMPORTANT: api used only during development for (optional) loading of env vars
  // since otherwise the framework becomes netzo-dependant and requires an NETZO_API_KEY
  // to run (which is undesired in order to have parity between development and production)
  const api = netzo({ apiKey: NETZO_API_KEY, baseURL: NETZO_API_URL });

  const project = await api.projects[NETZO_PROJECT_ID].get<Project>();

  if (!project) throw new Error(LOGS.notFoundProject);

  const envVars = project.envVars?.development ?? {};
  setEnvVars(envVars);
  logInfo(LOGS.remoteEnvNotice(Object.keys(envVars).length));

  const appUrl = `${NETZO_APP_URL}/workspaces/${project.workspaceId}/projects/${project._id}`;
  log(`\nOpen in netzo at ${appUrl}`);
}

export function setEnvVars(envVars: Record<string, any>) {
  for (const key in envVars) {
    Deno.env.set(key, envVars[key]);
  }
  return Deno.env.toObject();
}

export function filterObjectsByKeyValues<T = Record<string, any>>(
  data: T[],
  filters: Record<string, any> = {},
) {
  // filter item out if any of the filters fail, otherwise keep it
  return !Object.keys(filters).length ? data : data.filter((item) => {
    return !Object.entries(filters).some(([key, value]) => {
      const itemValue = _get(item, key, "").toString();
      return itemValue?.toLowerCase() !== value?.toLowerCase(); // case insensitive
    });
  });
}

export async function parseRequestBody(req: Request) {
  const contentType = req.headers.get("content-type"); // case insensitive
  if (contentType?.includes("application/json")) {
    return req.json();
  } else if (
    contentType?.includes("application/x-www-form-urlencoded") ||
    contentType?.includes("multipart/form-data")
  ) {
    const formData = await req.formData();
    return Object.fromEntries([...formData.entries()]);
  } else if (contentType?.includes("text/plain")) {
    return JSON.parse(await req.text());
  } else {
    try {
      return req.json();
    } catch (_jsonError) {
      try {
        return Object.fromEntries((await req.formData()).entries());
      } catch (_formDataError) {
        try {
          return Object.fromEntries(req.searchParams);
        } catch (_formDataError) {
          return JSON.parse(await req.text());
        }
      }
    }
  }
}
