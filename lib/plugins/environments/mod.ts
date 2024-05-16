// deno-lint-ignore-file no-explicit-any
import { netzo } from "../../apis/netzo.ts";
import type { Project } from "../types.ts";
import { logInfo, LOGS } from "../utils.ts";

export async function setEnvVarsIfRemoteProject() {
  const {
    NETZO_PROJECT_ID,
    NETZO_API_KEY,
    NETZO_API_URL = "https://api.netzo.io",
    NETZO_APP_URL = "https://app.netzo.io",
  } = Deno.env.toObject();

  if (NETZO_PROJECT_ID && NETZO_API_KEY) {
    // IMPORTANT: api used only during development for (optional) loading of env vars
    // since otherwise the framework becomes netzo-dependant and requires an NETZO_API_KEY
    // to run (which is undesired in order to have parity between development and production)
    const api = netzo({ apiKey: NETZO_API_KEY, baseURL: NETZO_API_URL });

    const project = await api.projects[NETZO_PROJECT_ID].get<Project>();

    if (!project) throw new Error(LOGS.notFoundProject());

    const envVars = project.envVars?.development ?? {};
    setEnvVars(envVars);
    logInfo(LOGS.envNoticeProduction(Object.keys(envVars).length));
    logInfo(LOGS.openInNetzo(NETZO_APP_URL, project));

    return;
  } else {
    return logInfo(LOGS.envNoticeDevelopment()); // [development] log notice for good DX
  }
}

export function setEnvVars(envVars: Record<string, any>) {
  for (const key in envVars) {
    Deno.env.set(key, envVars[key]);
  }
  return Deno.env.toObject();
}
