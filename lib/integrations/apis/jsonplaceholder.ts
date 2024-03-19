import { auth } from "./create-api/auth/mod.ts";
import { createApi } from "./create-api/mod.ts";
/**
 * Factory function for the JSONPlaceholder API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/jsonplaceholder
 *
 * @returns {object} - an API client instance
 */
export const jsonplaceholder = () => {
  const api = createApi({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({ type: "none" }, ctx);
    },
  });

  return api;
};
