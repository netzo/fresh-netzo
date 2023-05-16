import { createApi } from '../create-api/mod.ts'
import { auth } from '../create-api/auth/mod.ts'

export const jsonplaceholder = () => {
  const api = createApi({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
      'Content-Type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({ type: 'none' }, ctx)
    },
  })
  return api
}
