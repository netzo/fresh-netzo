import { auth } from "./create-api/auth/mod.ts";
import { createApi } from "./create-api/mod.ts";

export type NotionOptions = {
  internalIntegrationToken: string;
  notionVersion: string;
};

/**
 * Factory function for the Notion API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/notion
 *
 * @param {string} internalIntegrationToken - the token to use for authentication
 * @param {string} notionVersion - the Notion API version to use (a date string)
 * @returns {object} - an API client instance
 */
export const notion = ({
  internalIntegrationToken = Deno.env.get("NOTION_INTERNAL_INTEGRATION_TOKEN")!,
  notionVersion = Deno.env.get("NOTION_VERSION")!,
}: NotionOptions) => {
  const api = createApi({
    baseURL: `https://api.notion.com/v1`,
    headers: {
      "content-type": "application/json",
      "Notion-Version": notionVersion,
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "bearer",
        token: internalIntegrationToken,
      }, ctx);
    },
  });

  return api;
};
