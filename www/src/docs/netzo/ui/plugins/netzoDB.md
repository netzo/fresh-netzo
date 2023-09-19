<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/netzoDB.svg" alt="netzo/ui/plugins/netzoDB" class="mb-5 w-75px">

# `netzoDB` (soon)

Adds routes to serve a flexible RESTful API for the [Deno KV](https://deno.com/deploy/docs/storage) datastore of the project. This API makes it possible to connect other applications to your KV store in any environment that can make HTTP requests.

- **labels:** `routes`, `database`, `netzo`

## Usage

### Adapters

#### Fresh

Register the plugin in `netzo.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: code-group
```ts [netzo.config.ts]
import { netzoDB } from 'netzo/ui/plugins/netzoDB/mod.ts'

await start(manifest, {
  plugins: [netzoDB()]
})
```
<<< src/main.ts
<<< src/dev.ts
:::

::: warning Fresh configuration [must](https://fresh.deno.dev/docs/concepts/ahead-of-time-builds#migrating-existing-projects-with-plugins) be defined in `netzo.config.ts`.
:::

#### Hono

Support for [Hono](https://hono.dev/) is coming soon.

### Auth

Authentication and authorization for your Deno KV data store is currently user's responsibility and can be used with existing authentication and authorization systems. This plugin might provide built-in support for this in future iterations.

## Configuration

```ts
interface NetzoDBOptions {}
```

## Operations

### REST

| Operation  | HTTP Method | Path                | Deno KV Operation |
|------------|-------------|---------------------|-------------------|
| **find**   | `GET`       | `/db/:resource`     | [list](#list)     |
| **get**    | `GET`       | `/db/:resource/:id` | [get](#get)       |
| **create** | `POST`      | `/db/:resource`     | [set](#set)       |
| **update** | `PUT`       | `/db/:resource/:id` | [set](#set)       |
| **patch**  | `PATCH`     | `/db/:resource/:id` | [set](#set)       |
| **remove** | `DELETE`    | `/db/:resource/:id` | [delete](#delete) |

#### find

Execute a find operation.

Example request:

```
GET /db/users?filter[username]=john&sort=-username&limit=10&offset=0
```

Example response (`application/json`):

```
[
  {
    "id": "123",
    "username": "john",
    "admin": true
  },
  {
    "id": "456",
    "username": "adam",
    "admin": false
  },
  {
    "id": "789",
    "username": "will",
    "admin": false
  }
]
```

#### get

Execute a get operation.

Example request:

```
GET /db/users/123
```

Example response (`application/json`):

```
{
  "id": "123",
  "username": "john",
  "admin": true
}
```

#### create

Execute a create operation.

Example request:

```
POST /db/users
Body:
{
  "username": "john",
  "admin": true
}
```

Example response (`application/json`):

```
{
  "id": "123",
  "username": "john",
  "admin": true
}
```

#### update

Execute an update operation.

Example request:

```
PUT /db/users/123
Body:
{
  "username": "john",
  "admin": true
}
```

Example response (`application/json`):

```
{
  "id": "123",
  "username": "john",
  "admin": true
}
```

#### patch

Execute a patch operation.

Example request:

```
PATCH /db/users/123
Body:
{
  "username": "john",
  "admin": true
}
```

Example response (`application/json`):

```
{
  "id": "123",
  "username": "john",
  "admin": true
}
```

#### remove

Execute a remove operation.

Example request:

```
DELETE /db/users/123
```

Successful response returns 200 OK with no body.

<!-- ### KV

| Operation  | HTTP Method | Path       | Deno KV Operation |
|------------|-------------|------------|-------------------|
| **list**   | `GET`       | `/kv/list` | [list](#list)     |
| **get**    | `GET`       | `/kv`      | [get](#get)       |
| **set**    | `POST`      | `/kv`      | [set](#set)       |
| **delete** | `DELETE`    | `/kv`      | [delete](#delete) |
| **sum**    | `POST`      | `/kv/sum`  | [sum](#sum)       |
| **min**    | `POST`      | `/kv/min`  | [min](#min)       |
| **max**    | `POST`      | `/kv/max`  | [max](#max)       |

#### list

Execute a [list operation](https://deno.com/manual/runtime/kv/operations#list).

Example request:

```
GET /kv/list?prefix=users&start=users,john
```

Example response (`application/json`):

```
[
  {
    "key": ["users", "john"],
    "value": {
      "username": "john",
      "admin": true
    },
    "versionstamp": "000001"
  }
]
```

#### get

Execute a [get operation](https://deno.com/manual/runtime/kv/operations#get).

Example request:

```
GET /kv?key=users,john
```

Example response (`application/json`):

```
{
  "key": ["users", "john"],
  "value": {
    "username": "john",
    "admin": true
  },
  "versionstamp": "000001"
}
```

#### set

Execute a [set operation](https://deno.com/manual/runtime/kv/operations#set).

Example request:

```
POST /kv?key=users,john
Body:
{
  "username": "john",
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

#### delete

Execute a [delete operation](https://deno.com/manual/runtime/kv/operations#delete).

Example request:

```
DELETE /kv?key=users,john
```

Successful response returns 200 OK with no body.

#### sum

Execute a [sum operation](https://deno.com/manual/runtime/kv/operations#sum).

TODO

#### min

Execute a [min operation](https://deno.com/manual/runtime/kv/operations#min).

TODO

#### max

Execute a [max operation](https://deno.com/manual/runtime/kv/operations#max).

TODO -->

## References

- [Deno KV](https://deno.com/kv)

