import { auth } from "../create-api/auth/mod.ts";
import { createApi } from "../create-api/mod.ts";
export type FacturamaOptions = {
  username: string;
  password: string;
};

/**
 * Factory function for the Facturama API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/facturama
 *
 * @param {string} username - the username to use for authentication
 * @param {string} password - the password to use for authentication
 * @returns {object} - an API client instance
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

  return api;
};
