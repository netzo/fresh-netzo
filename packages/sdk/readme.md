# Netzo SDK

A JavaScript/TypeScript SDK for interacting with resources in [Netzo](https://app.netzo.io) and with the [Netzo API](https://netzo.io/docs/api/introduction).

## Documentation

Refer to the [Netzo documentation](https://netzo.io/docs/getting-started/introduction) for more details.

## Usage

```ts
import { Netzo } from "https://deno.land/x/netzo/mod.ts";

const netzo = Netzo({ apiKey: NETZO_API_KEY });

// create client for existing resource:
const { client } = await netzo.resource(RESOURCE_ID);
const users = await client.users.get();

// create client for a custom HTTP resource:
const { client } = netzo.resource({
  baseURL: "https://jsonplaceholder.typicode.com",
});
const users = await client.users.get();

// api: an authenticated client for the Netzo API
const projects = await netzo.api.projects.get();
```

## License

Copyright (c) 2023 [Netzo](https://netzo.io)

Licensed under the [MIT license](../../license).