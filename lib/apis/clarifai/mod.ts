import { createApi } from '../create-api/mod.ts'
import { auth } from '../create-api/auth/mod.ts'

/**
 * SDK constructor function for the Clarifai API
 *
 * @param {string} datasetId - the dataset ID to construct the base URL
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const clarifai = ({
  datasetId = Deno.env.get('CLARIFAI_DATASET_ID') ?? '',
  apiKey = Deno.env.get('CLARIFAI_API_KEY') ?? '',
}) => {
  const api = createApi({
    baseURL: `https://api.clarifai.com/v2/users/datasets/${datasetId}`,
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({
        type: 'apiKey',
        in: 'header',
        name: 'X-Clarifai-REST-API-Key',
        value: apiKey,
      }, ctx)
    },
  })

  return { api }
}
