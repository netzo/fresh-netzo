# Netzo SDK

A JavaScript/TypeScript SDK for interacting with resources in
[Netzo](https://app.netzo.io) and with the
[Netzo API](https://netzo.io/docs/api/introduction).

## Features

- 🚀 Productive: flexible and easy to use
- 🪽 Lightweight (~36 loc)
- 🦾 Strongly typed
- 📚 Intuitive: chain/bracket syntax and methods
  - `api.users(1).get()`
  - `api.users["1"].post({...})`

The SDK uses [`ofetch`](https://github.com/unjs/ofetch) for data fetching under
the hood. Thus, every option available for ofetch is usable as well. This SDK
extends [`uncreate`](https://github.com/johannschopplich/uncreate) for Netzo.

## Documentation

Refer to the
[Netzo documentation](https://netzo.io/docs/getting-started/introduction) for
more details.

## Usage

```ts
import { Netzo } from 'https://deno.land/x/netzo@v0.1.59/mod.ts'

const netzo = Netzo(Deno.env.get('NETZO_API_KEY'))

// create client for existing resource:
const { client } = await netzo.getResource(RESOURCE_ID)
const users = await client.users.get()

// create client for a custom HTTP resource:
const { client } = netzo.getResource({
  baseURL: 'https://jsonplaceholder.typicode.com',
})
const users = await client.users.get()

// api: an authenticated client for the Netzo API
const projects = await netzo.api.projects.get()
```

## License

Copyright (c) 2023 [Netzo](https://netzo.io)

Licensed under the [MIT license](../../license).
