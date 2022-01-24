// cannot use 'import' in global type declaration file
// see https://stackoverflow.com/questions/42233987/how-to-configure-custom-global-interfaces-d-ts-files-for-typescript

interface Netzo {
  rest: NetzoRest
  realtime: NetzoRealtime
}

interface NetzoOptions {
  key: string
  rest?: Record<string, unknown>
  realtime?: Record<string, unknown>
}

interface NetzoRestClient {
  fetchDoc: (string) => Promise<Api.OpenAPI | Api.AsyncAPI>
  consumeApi: (string) => Promise<Api.ConsumedApi>
  [k: string]: unknown // ...client.__proto__
}

interface NetzoRealtimeClient {
  fetchTD: (string) => Promise<WoT.ThingDescription>
  consumeThing: (string) => Promise<WoT.ConsumedThing>
  [k: string]: unknown // ...servient.__proto__
}

declare namespace Api {
  interface OpenApi {
    [k: string]: unknown
  }

  interface AsyncApi {
    [k: string]: unknown
  }

  interface ConsumedApi {
    [k: string]: unknown
  }
}

// utils:

type getApiUrl = () => string

type getToken = () => string | null
