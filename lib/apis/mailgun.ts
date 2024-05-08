import { auth } from "./create-api/auth/mod.ts";
import { createApi } from "./create-api/mod.ts";

export type MailgunOptions = {
  apiKey: string;
};

/**
 * Factory function for the Mailgun API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/mailgun
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an API client instance
 */
export const mailgun = ({
  apiKey = Deno.env.get("MAILGUN_API_KEY")!,
}: MailgunOptions) => {
  const api = createApi({
    baseURL: `https://api.mailgun.net`,
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "api",
        value: `${apiKey}`,
      }, ctx);
    },
  });

  return api;
};
