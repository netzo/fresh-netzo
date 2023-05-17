# Netzo SDK

A JavaScript/TypeScript SDK for interacting with resources in
[Netzo](https://app.netzo.io) and with the
[Netzo API](https://netzo.io/docs/api/introduction).

## Features

- 🚀 Productive: flexible and easy to use
- 🪽 Lightweight (~36 LOC for client implementation)
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

### Use existing API (e.g. Netzo API)

```ts
import * as apis from 'https://deno.land/x/netzo/mod.ts'

const { api } = apis.netzo({ apiKey: Deno.env.get('NETZO_API_KEY') })
const users = await api.users.get()
```

### Create a custom HTTP API

```ts
import { createApi } from 'https://deno.land/x/netzo/mod.ts'

const { api } = createApi({ baseURL: 'https://jsonplaceholder.typicode.com' })
const users = await client.users.get()
```

## License

Copyright (c) 2023 [Netzo](https://netzo.io)

Licensed under the [MIT license](../../license).
