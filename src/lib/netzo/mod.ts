import { deepMerge } from "https://deno.land/std/collections/deep_merge.ts";
import type { INetzoOptions, IClientOptions } from "../../../types.ts";
import { createClient as createClientHTTP } from '../../_utils/http/mod.ts';

interface IServiceOptions {
  apiKey?: string
}

export const netzo = (options: INetzoOptions) => {
  return (serviceOptions: IServiceOptions = {}) => {
    const clientOptions = deepMerge<IClientOptions>({
      baseURL: 'https://api.netzo.io',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'x-api-key': serviceOptions.apiKey ?? options.apiKey
      }
    },
      serviceOptions as IClientOptions
    )

    return createClientHTTP(clientOptions)
  }
}