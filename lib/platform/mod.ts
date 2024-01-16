import { netzo as createApi } from "../apis/netzo/mod.ts";
// import { createCron } from "./cron.ts";
import { createDatabase } from "./database.ts";
import { createNotification } from "./notification.ts";

export type NetzoOptions = {
  projectId: string;
  apiKey: string;
  baseURL?: string;
};

/**
 * Factory function for core Netzo modules
 *
 * @param {string} apiKey - the API key to use for authentication
 * @param {string} baseURL - (internal) the base URL to use for the API
 * @returns {object} - an object of multiple utilities core to Netzo
 */
export const Netzo = async ({
  projectId = Deno.env.get("NETZO_PROJECT_ID")!,
  apiKey = Deno.env.get("NETZO_API_KEY")!,
  baseURL = Deno.env.get("NETZO_API_URL") || "https://api.netzo.io",
}: NetzoOptions = {} as NetzoOptions) => {
  Deno.env.set("NETZO_PROJECT_ID", projectId);
  Deno.env.set("NETZO_API_KEY", apiKey);
  Deno.env.set("NETZO_API_URL", baseURL);

  const { api } = createApi({ apiKey, baseURL });

  // DISABLED: cannot pass DENO_KV_PATH for now since Subhosting
  // throws "TypeError: Non-default databases are not supported", note
  // that DENO_KV_ACCESS_TOKEN is required if DENO_KV_PATH is remote URL
  const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH")); // undefined in production

  const db = createDatabase(kv);

  // const cron = createCron(db);

  const notification = createNotification(db);

  // TODO: implement messaging system built on KV Queues once these are supported in Subhosting

  // type Message<T = unknown> = {
  //   type: "cron" | "email" | "notification" | "sms";
  //   templateId?: string; // [optional] used to render template from body e.g. mustache.render(body, template)
  //   data: T;
  //   env: "production" | "development";
  //   projectId: string;
  //   createdAt: string;
  //   updatedAt: string;
  // };

  // // messaging:
  // kv.listenQueue(async (msg) => {
  //   // create new messasge in database
  //   if (!("type" in msg)) return;
  //   const message = await api.messages.post<Message>({
  //     ...msg,
  //     env: Deno.env.get("NETZO_ENV")!,
  //     projectId: Deno.env.get("NETZO_PROJECT_ID")!,
  //   });
  //   switch (msg?.type) {
  //     // case "cron":
  //     //   return await cron(message.data);
  //     // case "email":
  //     //   return await email(message.data);
  //     case "notification":
  //       return await notification(message.data);
  //       // case "sms": return sms(message.data);
  //   }
  // });

  return { api, /* cron, */ kv, db, notification };
};
