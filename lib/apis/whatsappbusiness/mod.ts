import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export type WhatsappBusinessOptions = {
  businessAccountId: string;
  permanentToken: string;
};

/**
 * SDK constructor function for the WhatsApp Business API
 *
 * @see https://netzo.io/docs/framework/apis/whatsappbusiness
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
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

  return { api };
};
