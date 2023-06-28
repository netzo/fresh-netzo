import { createApi } from '../create-api/mod.ts'
import { auth } from '../create-api/auth/mod.ts'

/**
 * SDK constructor function for the Facturama API
 *
 * @param {string} username - the username to use for authentication
 * @param {string} password - the password to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const facturama = ({
  username = Deno.env.get('FACTURAMA_USERNAME'),
  password = Deno.env.get('FACTURAMA_PASSWORD'),
}) => {
  const api = createApi({
    baseURL: 'https://api.facturama.mx',
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({ type: 'basic', username, password }, ctx)
    },
  })

  return { api }
}
