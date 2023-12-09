import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export type ContpaqiComercialOptions = {
  apiKey: string;
  companyRfc: string;
};

/**
 * SDK constructor function for the ContpaqiComercial API
 *
 * @see https://netzo.io/docs/framework/apis/contpaqicomercial
 *
 * @param {string} apiKey - the API key to use for authentication
 * @param {string} companyRfc - the company RFC to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const ContpaqiComercial = ({
  apiKey = Deno.env.get("CONTPAQICOMERCIAL_API_KEY")!,
  companyRfc = Deno.env.get("CONTPAQICOMERCIAL_COMPANY_RFC")!,
}: ContpaqiComercialOptions) => {
  const api = createApi({
    baseURL: `https://contpaqiapim.azure-api.net/comercial`,
    headers: {
      "x-Empresa-Rfc": companyRfc,
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "Ocp-Apim-Subscription-Key",
        value: apiKey,
      }, ctx);
    },
  });

  return { api };
};
