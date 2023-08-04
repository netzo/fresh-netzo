import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
export type {
  AddContactResponse,
  AddDealResponse,
  Contacts,
  Deals,
  Form,
  FormSubmissions,
  QueryAddContact,
  QueryAddDeal,
  QueryContacts,
  QueryDeals,
  QueryForms,
  QuerySubmissions,
} from "./types.ts";

export interface HubspotOptions {
  privateAppAccessToken: string;
}

/**
 * SDK constructor function for the Hubspot API
 *
 * @see https://netzo.io/docs/netzo/apis/hubspot
 *
 * @param {string} privateAppAccessToken - the token to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const hubspot = ({
  privateAppAccessToken = Deno.env.get("HUBSPOT_PRIVATE_APP_ACCESS_TOKEN")!,
}: HubspotOptions) => {
  const api = createApi({
    baseURL: "https://api.hubapi.com",
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "bearer",
        token: privateAppAccessToken,
      }, ctx);
    },
  });

  return { api };
};
