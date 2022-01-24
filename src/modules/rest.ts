// FIXME: build failing due to @apidevtools/json-schema-ref-parser
// dependency of openapi-client-axios dependency

import axios from 'axios'
import OpenApiClientAxios from 'openapi-client-axios'
import { getApiUrl, getToken } from './utils'

// for clever fetch + proxy usage see https://github.com/justjavac/proxy-www
// and https://css-tricks.com/proxying-third-party-javascript-as-first-party-javascript-and-the-potential-effect-on-analytics/
// e.g. const thing = await api.netzo.io/things/13123123123 (translates to fetch('https://api.netzo.io/things/13123123123'))

export const api: NetzoRest = async (options = {}) => {
  const api = { options }
  const fetchDoc = async (_id: string): Promise<Api.OpenApi | Api.AsyncApi> => {
    const res = await fetch(`${getApiUrl()}/wot/apis/${_id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    return (await res.json()) as Api.OpenApi | Api.AsyncApi
  }

  const consumeApi = async (_id: string): Promise<Api.ConsumedApi> => {
    const { doc: definition }: any = await fetchDoc(_id)
    return new OpenApiClientAxios({ definition }).init()
  }

  // NOTE: Object.assign() since spread (...) loose prototype properties (under __proto__)
  return Object.assign(api, { fetchDoc, consumeApi })
}

// usage:
// const res = await client.createPet(null, { name: 'Garfield' })
// console.log('Pet created', res.data)
