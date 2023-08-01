import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
import {
  AddContactResponse,
  AddDealResponse,
  Contact,
  Deal,
  Form,
  FormSubmission,
  QueryAddContact,
  QueryAddDeal,
  QueryContacts,
  QueryDeals,
  QueryForms,
  QuerySubmissions,
} from "@/lib/apis/hubspot/types.ts";

export interface HubspotOptions {
  privateAppAccessToken: string;
}

/**
 * SDK constructor function for the Hubspot API
 *
 * @see https://netzo.io/docs/netzo/apis/hubspot
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const hubspot = ({
  privateAppAccessToken = Deno.env.get("HUBSPOT_PRIVATE_APP_ACCESS_TOKEN")!,
}: HubspotOptions) => {
  const api = createApi({
    baseURL: 'https://api.hubapi.com',
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

  /**
   * Get contacts from Hubspot CRM (v3)
   */
  const getContacts = async (query: QueryContacts = {}): Promise<Contact[]> => {
    const result = await api.crm.v3.objects.contacts.get(query);
    return result.results;
  };

  /**
   * Add a contact in Hubspot CRM(v3)
   */
  const addContact = async (
    data: QueryAddContact,
  ): Promise<AddContactResponse> => {
    const result = await api.crm.v3.objects.contacts.post(data);
    return result;
  };

  /**
   * Update a contact in Hubspot CRM (v3)
   */
  const updateContact = async (
    contactId: string,
    data: QueryAddContact,
  ): Promise<AddContactResponse> => {
    const result = await api.crm.v3.objects.contacts[`${contactId}`].patch(
      data,
    );
    return result;
  };

  /**
   * Delete a contact in Hubspot CRM (v3)
   */
  const deleteContact = async (contactId: string): Promise<void> => {
    await api.crm.v3.objects.contacts[`${contactId}`].delete();
  };

  /**
   * Get forms from Hubspot (v2 - stable version).
   * V3 is still in beta
   */
  const getForms = async (query: QueryForms = {}): Promise<Form[]> => {
    const result = await api.forms.v2.forms.get(query);
    return result;
  };

  /**
   * Get submissions for a specific form in Hubspot (v1)
   * V3 is still in beta
   */
  const getSubmissions = async (
    formId: string,
    query: QuerySubmissions = {},
  ): Promise<FormSubmission[]> => {
    const result = await api["form-integrations"].v1.submissions
      .forms[`${formId}`].get(query);
    return result.results;
  };

  /**
   * Get deals - Api v3
   */
  const getDeals = async (query: QueryDeals = {}): Promise<Deal[]> => {
    const result = await api.crm.v3.objects.deals.get(query);
    return result.results;
  };

  /**
   * Add a deal - Api v3
   */
  const addDeal = async (data: QueryAddDeal): Promise<AddDealResponse> => {
    const result = await api.crm.v3.objects.deals.post(data);
    return result;
  };

  return {
    api,
    getContacts,
    addContact,
    updateContact,
    deleteContact,
    getForms,
    getSubmissions,
    getDeals,
    addDeal,
  };
};
