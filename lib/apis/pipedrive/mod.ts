import { createApi } from '../_create-api/mod.ts'
import { auth } from '../_create-api/auth/mod.ts'
import type {
  Deal,
  Person,
  QueryAddOrUpdateDeal,
  QueryAddOrUpdatePerson,
  QueryGetDeals,
  QueryGetPersons,
  QuerySearchDeals,
  QuerySearchPersons,
  SearchDealsResult,
  SearchPersonsResult,
} from './types.ts'

export interface PipeDriveOptions {
  apiToken: string;
  companyDomain: string;
}

/**
 * SDK constructor function for the Pipedrive API
 *
 * @see https://netzo.io/docs/netzo/apis/pipedrive
 *
 * @param {string} apiToken - the API token to use for authentication
 * @param {string} companyDomain - the company domain to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const pipedrive = ({
  apiToken = Deno.env.get("PIPEDRIVE_API_TOKEN")!,
  companyDomain = Deno.env.get("PIPEDRIVE_COMPANY_DOMAIN")!,
}: PipeDriveOptions) => {
  const api = createApi({
    baseURL: `https://${companyDomain}.pipedrive.com/v1`,
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "query",
        name: "api_token",
        value: apiToken,
      }, ctx);
    },
  });

  /**
   * Get deals from Pipedrive
   */
  const getDeals = async (query: QueryGetDeals = {}): Promise<Deal[]> => {
    const result = await api.deals.get(query)
    const deals = result.map((item: any) => item.data)
    return deals
  }

  /**
   * Search deals on Pipedrive
   */
  const searchDeals = async (
    query: QuerySearchDeals,
  ): Promise<SearchDealsResult[]> => {
    const result = await api.deals.search.get(query)
    const deals = result.data.items.map((item: any) => item.item)
    return deals
  }

  /**
   * Add a deal to Pipedrive
   */
  const addDeal = async (data: QueryAddOrUpdateDeal): Promise<Deal> => {
    const result = await api.deals.post(data)
    return result.data
  }

  /**
   * Update a deal to Pipedrive by id
   */
  const updateDeal = async (
    id: number,
    data: QueryAddOrUpdateDeal,
  ): Promise<Deal> => {
    const result = await api.deals[`${id}`].put(data)
    return result.data
  }

  /**
   * Delete a deal from Pipedrive by id
   */
  const deleteDeal = async (id: number): Promise<number> => {
    const result = await api.deals[`${id}`].delete()
    return result.data.id
  }

  /**
   * Get persons from Pipedrive
   */
  const getPersons = async (query: QueryGetPersons = {}): Promise<Person[]> => {
    const result = await api.persons.get(query)
    const persons = result.map((item: any) => item.data)
    return persons
  }

  /**
   * Search persons on Pipedrive
   */
  const searchPersons = async (
    query: QuerySearchPersons,
  ): Promise<SearchPersonsResult[]> => {
    const result = await api.persons.search.get(query)
    const persons = result.data.items.map((item: any) => item.item)
    return persons
  }

  /**
   * Add a person to Pipedrive
   */
  const addPerson = async (data: QueryAddOrUpdatePerson): Promise<Person> => {
    const result = await api.persons.post(data)
    return result.data
  }

  /**
   * Update a person to Pipedrive by id
   */

  const updatePerson = async (
    id: number,
    data: QueryAddOrUpdatePerson,
  ): Promise<Person> => {
    const result = await api.persons[`${id}`].put(data)
    return result.data
  }

  /**
   * Delete a person from Pipedrive by id
   */
  const deletePerson = async (id: number): Promise<number> => {
    const result = await api.persons[`${id}`].delete()
    return result.data.id
  }

  return {
    api,
    getDeals,
    searchDeals,
    addDeal,
    updateDeal,
    deleteDeal,
    getPersons,
    searchPersons,
    addPerson,
    updatePerson,
    deletePerson,
  }
}
