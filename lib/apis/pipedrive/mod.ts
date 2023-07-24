import { createApi } from '../_create-api/mod.ts'
import { auth } from '../_create-api/auth/mod.ts'
import type {DealId, DealData, QueryGetDeals, QueryAddOrUpdateDeal } from './types.ts'

/**
 * SDK constructor function for the Pipedrive API
 *
 * @see https://netzo.io/docs/netzo/apis/pipedrive
 *
 * @param {string} apiToken - the API token to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const pipedrive = ({
  apiToken = Deno.env.get('PIPEDRIVE_API_TOKEN')!,
  companyDomain = Deno.env.get('PIPEDRIVE_COMPANY_DOMAIN'),
}) => {
  const api = createApi({
    baseURL: `https://${companyDomain}.pipedrive.com/v1`,
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({
        type: 'apiKey',
        in: 'query',
        name: 'api_token',
        value: apiToken,
      }, ctx)
    },
  })

  /**
   * Get deals from Pipedrive
   */

    const getDeals = async (query: QueryGetDeals = {}): Promise<DealData[]> => {
    const result = await api.deals.get(query)
    return result.data  //not correct - must map first!
  }

  /**
   * Add a deal to Pipedrive
   */
  const addDeal = async (data: QueryAddOrUpdateDeal): Promise<DealData> => {
    const result = await api.deals.post(data)
    return result.data
  }

    /**
   * Update a deal to Pipedrive by id
   */
  const updateDeal = async(id: DealId, data: QueryAddOrUpdateDeal): Promise<DealData> => {
    const result = await api.deals[`${id}`].put(data)
    return result.data
  }

    /**
   * Delete a deal from Pipedrive by id
   */
  const deleteDeal = async(id: DealId): Promise<DealId> => {
    const result = await api.deals[`${id}`].delete()
    return result.data.id
  }
  
  return { api, getDeals, addDeal, updateDeal, deleteDeal }
}




