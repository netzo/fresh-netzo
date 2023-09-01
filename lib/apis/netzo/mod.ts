import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
import type { Notification } from "./types.ts";

export interface NetzoOptions {
  apiKey: string;
  baseURL?: string;
}

/**
 * SDK constructor function for the Netzo API
 *
 * @see https://netzo.io/docs/netzo/apis/netzo
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const netzo = ({
  apiKey = Deno.env.get("NETZO_API_KEY")!,
  baseURL = "https://api.netzo.io",
}: NetzoOptions) => {
  const api = createApi({
    baseURL,
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        // heuristic to determine if apiKey (64) or envVarApiKey (128)
        name: apiKey.length === 64 ? "x-api-key" : "x-env-var-api-key",
        value: apiKey,
      }, ctx);
    },
  });

  const getVariable = async (uid: string): Promise<string> => {
    const result = await api.variables.get({ uid });
    return result?.data?.value;
  };

  const createNotification = (
    data: Notification["data"],
  ): Promise<Notification> => {
    return api.notifications.post({
      labels: [],
      readBy: [],
      data,
      denoDeploymentId: Deno.env.get("DENO_DEPLOYMENT_ID")!,
      denoRegion: Deno.env.get("DENO_REGION")!,
    });
  };

  return { api, getVariable, createNotification };
};
