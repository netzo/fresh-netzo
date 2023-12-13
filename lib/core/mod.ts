import { netzo as createApi } from "../apis/netzo/mod.ts";
import { createCron } from "./cron.ts";

export type NetzoOptions = {
  apiKey: string;
  baseURL?: string;
};

/**
 * SDK constructor function for Netzo
 *
 * @param {string} apiKey - the API key to use for authentication
 * @param {string} baseURL - (internal) the base URL to use for the API
 * @returns {object} - an object of multiple utilities for the API
 */
export const Netzo = ({
  apiKey = Deno.env.get("NETZO_API_KEY")!,
  baseURL = Deno.env.get("NETZO_API_URL") || "https://api.netzo.io",
}: NetzoOptions = {} as NetzoOptions) => {
  const { api, createNotification } = createApi({ apiKey, baseURL });

  const cron = createCron(api);

  return { api, cron, createNotification };
};
