import { deepMerge } from "https://deno.land/std/collections/deep_merge.ts";
import type { INetzoOptions, IClientOptions } from "../../../types.ts";
import { createClient as createClientHTTP } from '../../utils/http/mod.ts';

interface IServiceOptions { }

export const jsonplaceholder = (_options: INetzoOptions) => {
  return (serviceOptions: IServiceOptions = {}) => {
    const clientOptions = deepMerge<IClientOptions>({
      baseURL: 'https://jsonplaceholder.typicode.com',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    },
      serviceOptions as IClientOptions
    )

    return createClientHTTP(clientOptions)
  }
}