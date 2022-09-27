/// <reference types="https://raw.githubusercontent.com/netzoio/sdk/main/types.ts" />
import type { INetzoOptions } from "../types.ts";
import { jsonplaceholder } from './jsonplaceholder/mod.ts'
import { netzo } from './netzo/mod.ts'
import { sendinblue } from './sendinblue/mod.ts'

export const lib = (options: INetzoOptions) => ({
  jsonplaceholder: jsonplaceholder(options),
  netzo: netzo(options),
  sendinblue: sendinblue(options)
})