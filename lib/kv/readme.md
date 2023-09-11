<!-- deno-fmt-ignore-file -->

> **NOTE:** This module is still under active development, and not suitable for production use.

# Deno KV REST API

This module provides utilities to attach a flexible RESTful API to a [Deno KV](https://deno.com/kv) data store. This API makes it possible to connect other applications to your KV store in any environment that can make HTTP requests.

## Usage with Fresh

This module provides a helper function to generate a Fresh [Handlers object](https://fresh.deno.dev/docs/getting-started/custom-handlers). In the `routes` folder of your Fresh project, create a new `kv` folder. In that folder, create a file called `[...path].ts`, and include the following code:

```typescript
import { Handlers } from "$fresh/server.ts";
import { generateFreshHandlers } from "https://deno.land/x/kv_api@0.0.3/mod.ts";

export const handler: Handlers = generateFreshHandlers({
  prefix: "/kv",
});
```

This will add the REST API documented below to your Fresh project, under `/kv`.

## Usage with Oak

Support for [Oak](https://deno.land/x/oak) is coming soon!

## Authentication and authorization

How you authenticate and authorize access to your Deno KV data store is currently the responsibility of the user. Our assumption is that these routes will be used alongside whatever authentication and authorization system is in place for your existing web application.

We may provide more help for this in future iterations of this module.

## REST API Usage

Once the API is attached to your server of choice, the following routes and HTTP methods are supported - this assumes you have attached the API to the default `/kv` path in your routing scheme. Each KV operation is mapped to a route and HTTP verb. For example, to [get a specific key](https://deno.com/manual/runtime/kv/operations#get) with a key value of `["users", "kevin"]`, you would make an HTTP `GET` request to:

```
/kv?key=users,kevin
```

Which would return a JSON representation of the same method call in Deno KV like the following:

```
{
  "key": ["users", "kevin"],
  "value": {
    "username": "kevin",
    "admin": true
  },
  "versionstamp": "000001"
}
```

### Route overview

| HTTP Method | Path                    | Deno KV operation |
| ----------- | ----------------------- | ----------------- |
| GET         | `/kv`                   | [get](#get)       |
| GET         | `/kv/list`              | [list](#list)     |
| DELETE      | `/kv`                   | [delete](#delete) |
| POST        | `/kv`                   | [set](#set)       |
| POST        | `/kv/sum`               | [sum](#sum)       |
| POST        | `/kv/min`               | [min](#min)       |
| POST        | `/kv/max`               | [max](#max)       |

### get

Execute a [get operation](https://deno.com/manual/runtime/kv/operations#get).

Example request:

```
GET /kv?key=users,kevin
```

Example response (`application/json`):

```
{
  "key": ["users", "kevin"],
  "value": {
    "username": "kevin",
    "admin": true
  },
  "versionstamp": "000001"
}
```

### list

Execute a [list operation](https://deno.com/manual/runtime/kv/operations#list).

Example request:

```
GET /kv/list?prefix=users&start=users,kevin
```

Example response (`application/json`):

```
[
  {
    "key": ["users", "kevin"],
    "value": {
      "username": "kevin",
      "admin": true
    },
    "versionstamp": "000001"
  }
]
```

### delete

Execute a [delete operation](https://deno.com/manual/runtime/kv/operations#delete).

Example request:

```
DELETE /kv?key=users,kevin
```

Successful response returns 200 OK with no body.

### set

Execute a [set operation](https://deno.com/manual/runtime/kv/operations#set).

Example request:

```
POST /kv?key=users,kevin
Body:
{
  "username": "kevin",
  "admin": true
}
```

Example response (`application/json`):

```
{
	"ok": true,
	"versionstamp": "00000000000000010000"
}
```

### sum

Execute a [sum operation](https://deno.com/manual/runtime/kv/operations#sum).

TODO

### min

Execute a [min operation](https://deno.com/manual/runtime/kv/operations#min).

TODO

### max

Execute a [max operation](https://deno.com/manual/runtime/kv/operations#max).

TODO

## License

MIT