import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
export type {
  List,
  Lists,
  QueryAddTask,
  QueryLists,
  QueryTasks,
  QueryUpdateTask,
  Task,
  Tasks,
} from "./types.ts";

export interface ClickupOptions {
  personalApiKey: string;
}

/**
 * SDK constructor function for the Clickup API
 *
 * @see https://netzo.io/docs/netzo/apis/clickup
 *
 * @param {string} personalApiKey - the personal API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const clickup = ({
  personalApiKey = Deno.env.get("CLICKUP_PERSONAL_API_KEY")!,
}: ClickupOptions) => {
  const api = createApi({
    baseURL: `https://api.clickup.com/api/v2`,
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "Authorization",
        value: personalApiKey,
      }, ctx);
    },
  });

  return { api };
};
