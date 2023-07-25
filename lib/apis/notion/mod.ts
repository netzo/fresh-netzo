import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

/**
 * SDK constructor function for the Notion API
 *
 * @see https://netzo.io/docs/netzo/apis/notion
 *
 * @param {string} internalIntegrationToken - the Internal Integration Token to use for authentication
 * @param {string} notionVersion - the Notion API version to use
 * @returns {object} - an object of multiple utilities for the API
 */
export const notion = ({
  internalIntegrationToken = Deno.env.get("NOTION_INTERNAL_INTEGRATION_TOKEN")!,
  notionVersion = Deno.env.get("NOTION_VERSION")!,
}) => {
  const api = createApi({
    baseURL: `https://api.notion.com`,
    headers: {
      "content-type": "application/json",
      "Notion-Version": notionVersion,
    },
    async onRequest(ctx) {
      await auth({
        type: "bearer",
        token: internalIntegrationToken,
      }, ctx);
    },
  });

  return { api };
};
