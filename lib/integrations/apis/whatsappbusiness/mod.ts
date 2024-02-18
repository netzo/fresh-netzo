import { auth } from "../../create-api/auth/mod.ts";
import { createApi } from "../../create-api/mod.ts";

export type WhatsappBusinessOptions = {
  businessAccountId: string;
  permanentToken: string;
};

/**
 * Factory function for the WhatsApp Business API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/whatsappbusiness
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an API client instance
 */
export const whatsappbusiness = ({
  businessAccountId = Deno.env.get("WHATSAPPBUSINESS_BUSINESS_ACCOUNT_ID") ||
    "",
  permanentToken = Deno.env.get("WHATSAPPBUSINESS_PERMANENT_TOKEN")!,
}: WhatsappBusinessOptions) => {
  const api = createApi({
    baseURL: `https://graph.facebook.com/v17.0/${businessAccountId}`,
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({ type: "bearer", token: permanentToken }, ctx);
    },
  });

  return api;
};
