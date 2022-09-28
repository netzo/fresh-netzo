import { deepMerge } from "https://deno.land/std/collections/deep_merge.ts";
import type { INetzoOptions, IClientOptions } from "../../../types.ts";
import { createClient as createClientHTTP } from '../../_utils/http/mod.ts';

interface IServiceOptions {
  apiKey: string
}

export const sendinblue = (_options: INetzoOptions) => {
  return (serviceOptions: IServiceOptions) => {
    const clientOptions = deepMerge<IClientOptions>({
      baseURL: 'https://api.sendinblue.com/v3',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': serviceOptions.apiKey
      }
    },
      serviceOptions as IClientOptions
    )

    return createClientHTTP(clientOptions)
  }
}