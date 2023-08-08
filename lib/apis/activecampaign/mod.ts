import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
export type {
  Accounts,
  AddOrUpdateContactResponse,
  AddUserResponse,
  Contact,
  Contacts,
  Deals,
  FilterDeals,
  QueryAccounts,
  QueryAddContact,
  QueryAddUser,
  QueryContacts,
  QueryUpdateContact,
  Users,
} from "./types.ts";

export interface ActiveCampaignOptions {
  accountName: string;
  apiKey: string;
}

/**
 * SDK constructor function for the ActiveCampaign API
 *
 * @see https://netzo.io/docs/netzo/apis/activecampaign
 *
 * @param {string} accountName - the account name to construct the base URL
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const activecampaign = ({
  accountName = Deno.env.get("ACTIVECAMPAIGN_ACCOUNT_NAME")!,
  apiKey = Deno.env.get("ACTIVECAMPAIGN_API_KEY")!,
}: ActiveCampaignOptions) => {
  const api = createApi({
    baseURL: `https://${accountName}.api-us1.com/api/3`,
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "Api-Token",
        value: apiKey,
      }, ctx);
    },
  });

  return { api };
};
