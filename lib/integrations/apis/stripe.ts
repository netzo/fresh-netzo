import { auth } from "../../create-api/auth/mod.ts";
import { createApi } from "../../create-api/mod.ts";

export type StripeOptions = {
  apiKey: string;
};

/**
 * Factory function for the Stripe API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/stripe
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an API client instance
 */
export const stripe = ({
  apiKey = Deno.env.get("STRIPE_API_KEY")!,
}: StripeOptions) => {
  const api = createApi({
    baseURL: "https://api.stripe.com/v1",
    // NOTE: use new URLSearchParams() for body with []
    // syntax for nested fields, for example:
    // const body = new URLSearchParams({
    //   amount: "1999", // in cents not euros
    //   currency: "eur",
    //   "automatic_payment_methods[enabled]": "true",
    // })
    headers: {
      "accept": "application/json",
      "content-type": "application/x-www-form-urlencoded",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "bearer",
        token: apiKey,
      }, ctx);
    },
  });

  return api;
};
