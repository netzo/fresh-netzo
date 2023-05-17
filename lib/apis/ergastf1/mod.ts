import { createApi } from '../create-api/mod.ts'
import { auth } from '../create-api/auth/mod.ts'

/**
 * SDK constructor function for the ErgastF1 API
 *
 * @returns {object} - an object of multiple utilities for the API
 */
export const ergastf1 = () => {
  const api = createApi({
    baseURL: 'https://ergast.com/api',
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({ type: 'none' }, ctx)
    },
  })

  return { api }
}
