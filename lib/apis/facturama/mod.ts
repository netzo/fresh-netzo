import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
export type FacturamaOptions = {
  username: string;
  password: string;
};

/**
 * SDK constructor function for the Facturama API
 *
 * @see https://netzo.io/docs/framework/apis/facturama
 *
 * @param {string} username - the username to use for authentication
 * @param {string} password - the password to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const facturama = ({
  username = Deno.env.get("FACTURAMA_USERNAME")!,
  password = Deno.env.get("FACTURAMA_PASSWORD")!,
}: FacturamaOptions) => {
  const api = createApi({
    baseURL: "https://api.facturama.mx",
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({ type: "basic", username, password }, ctx);
    },
  });

  return { api };
};
