import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export interface MailgunOptions {
  apiKey: string;
  domainName: string;
}

/**
 * SDK constructor function for the Mailgun API
 *
 * @see https://netzo.io/docs/netzo/apis/mailgun
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const mailgun = ({
  apiKey = Deno.env.get("MAILGUN_API_KEY")!,
  domainName = Deno.env.get("MAILGUN_DOMAIN_NAME")!,
}: MailgunOptions) => {
  const api = createApi({
    baseURL: `https://api.mailgun.net/v3/${domainName}`,
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "api",
        value: `${apiKey}`,
      }, ctx);
    },
  });

  return { api };
};
