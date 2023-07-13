import { createApi } from '../_create-api/mod.ts'
import { auth } from '../_create-api/auth/mod.ts'

/**
 * SDK constructor function for the WhatsApp Business API
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const whatsappbusiness = ({
  businessAccountId = Deno.env.get('WHATSAPPBUSINESS_BUSINESS_ACCOUNT_ID') ||
    '',
  permanentToken = Deno.env.get('WHATSAPPBUSINESS_PERMANENT_TOKEN')!,
}) => {
  const api = createApi({
    baseURL: `https://graph.facebook.com/v15.0/${businessAccountId}`,
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({ type: 'bearer', token: permanentToken }, ctx)
    },
  })

  return { api }
}
