import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export type StripeOptions = {
  apiKey: string;
};

/**
 * SDK constructor function for the Stripe API
 *
 * @see https://netzo.io/docs/netzo/apis/stripe
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
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

  return { api };
};
