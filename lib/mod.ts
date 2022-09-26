import type { INetzoOptions } from "../types.ts";
import { jsonplaceholder } from './jsonplaceholder/mod.ts'
import { netzo } from './netzo/mod.ts'

export const createLib = (options: INetzoOptions) => ({
  jsonplaceholder: jsonplaceholder(options),
  netzo: netzo(options),
})
