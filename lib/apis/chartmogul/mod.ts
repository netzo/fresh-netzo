import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
export type {
  AddOrUpdateCustomerResponse,
  Customer,
  CustomerInvoices,
  Customers,
  CustomerSubscriptions,
  Invoice,
  Invoices,
  QueryAddCustomer,
  QueryCustomerInvoices,
  QueryCustomers,
  QueryCustomerSubscriptions,
  QueryInvoice,
  QueryInvoices,
  QueryUpdateCustomer,
} from "./types.ts";
export interface ChartmogulOptions {
  apiKey: string;
}

/**
 * SDK constructor function for the ChartMogul API
 *
 * @see https://netzo.io/docs/netzo/apis/chartmogul
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const chartmogul = ({
  apiKey = Deno.env.get("CHARTMOGUL_API_KEY")!,
}: ChartmogulOptions) => {
  const api = createApi({
    baseURL: "https://api.chartmogul.com/v1",
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "basic",
        value: apiKey,
      }, ctx);
    },
  });

  return { api };
};
