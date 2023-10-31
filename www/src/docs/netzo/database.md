# `netzo/database`

> [`https://deno.land/x/netzo/database`](https://deno.land/x/netzo/database)

**The `netzo/database` module exports a set of utility functions to interact with the project's Deno KV datastore in a RESTful or resource-oriented manner.** In essence, the module exports the functions `find`, `get`, `create`, `update`, `patch` and `remove` to make it easier to perform CRUD operations on resources (much like database tables), abstracting away the simple but lower-level Deno KV API.

## Usage

```ts
import { createDatabase } from 'https://deno.land/x/netzo/database/mod.ts'

const kv = await Deno.openKv()
const db = createDatabase(kv)
```

### Auth

Authentication and authorization for your Deno KV data store is currently user's responsibility and can be used with existing authentication and authorization systems. This module might provide built-in support for this in future iterations.

## Configuration

```ts
interface DatabaseOptions {}
```

Register the module in `netzo.config.ts` and ensure `main.ts` and `dev.ts` are receive the `config` object as shown below.

::: code-group
```ts [netzo.config.ts]
import { defineNetzoConfig } from 'netzo/config/mod.ts'

export default defineNetzoConfig({
  database: { /* ... */ }
})
```
<<< ./plugins/src/main.ts
<<< ./plugins/src/dev.ts
:::

::: warning Fresh configuration [must](https://fresh.deno.dev/docs/concepts/ahead-of-time-builds#migrating-existing-projects-with-plugins) be defined in `netzo.config.ts`.
:::

## Operations

| Operation  | HTTP Method | Path                | Deno KV Operation |
|------------|-------------|---------------------|-------------------|
| **find**   | `GET`       | `/db/:resource`     | [list](#list)     |
| **get**    | `GET`       | `/db/:resource/:id` | [get](#get)       |
| **create** | `POST`      | `/db/:resource`     | [set](#set)       |
| **update** | `PUT`       | `/db/:resource/:id` | [set](#set)       |
| **patch**  | `PATCH`     | `/db/:resource/:id` | [set](#set)       |
| **remove** | `DELETE`    | `/db/:resource/:id` | [delete](#delete) |

### `find`

Retrieves a list of all matching resources from the service.

```ts
// [find] GET /todos
const todos = await db.find<Todo>('todos')
```

### `get`

Retrieve a single resource from the service.

```ts
// [get] GET /todos/:id
const todo = await db.get<Todo>('todos', ID)
```

### `create`

Create a new resource with data or multiple resources by passing in an array as data.

::: tip `idField` defaults to `"id"` with a value of `monotonicFactory()` (from the [`ulid`](https://deno.land/x/ulid) module). If `idField` is not provided as third argument, the default `"id"` will be used. Each data item can specify a value at that `idField` (or the default one), and if not provided, a random ULID will be generated for it via `monotonicFactory()` of the Web Crypto API.
:::

```ts
// [create] POST /todos
const todo = await db.create<Todo>('todos', {
  userId: '1',
  title: 'delectus aut autem',
  completed: false,
})

// [create] POST /todos (multiple at once)
const todos = await db.create<Todo>('todos', [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false
  },
  // ...
], 'id') // defaults to "id" with value of monotonicFactory()
```

### `update`

Completely replace a single resource.

```ts
// [udpate] PUT /todos/:id
const todo = await db.update<Todo>('todos', ID, {
  userId: '2',
  title: 'delectus aut autem',
  completed: true,
})
```

### `patch`

Merge the existing data of a single resource with the new data.

```ts
// [patch] PATCH /todos/:id
const todo = await db.patch<Todo>('todos', ID, {
  completed: true,
})
```

### `remove`

Remove a single resource.

```ts
// [remove] DELETE /todos/:id
const { id } = await db.remove<Todo>('todos', ID)
```
