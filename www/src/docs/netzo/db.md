# `netzo/db`

> [`https://deno.land/x/netzo/db`](https://deno.land/x/netzo/db)

**The `netzo/db` module exports a set of utility functions to interact with the project's Deno KV datastore in a RESTful or resource-oriented manner.** In essence, the module exports the functions `find`, `get`, `create`, `update`, `patch` and `remove` to make it easier to perform CRUD operations on resources (much like database tables), abstracting away the simple but lower-level Deno KV API.

## Usage

```ts
import * as db from 'https://deno.land/x/netzo/db/mod.ts'

interface Todo {
  id: string
  userId: string
  title: string
  completed: boolean
}

const todos = await db.find<Todo>('todos')
const todo = await db.get<Todo>('todos', ID)
const todo = await db.create<Todo>('todos', {
  userId: '1',
  title: 'delectus aut autem',
  completed: false,
})
const todo = await db.update<Todo>('todos', ID, {
  userId: '2',
  title: 'delectus aut autem',
  completed: true,
})
const todo = await db.patch<Todo>('todos', ID, {
  completed: true,
})
const { id } = await db.remove<Todo>('todos', ID)
```

::: tip Use `import * as db from "netzo/db/mod.ts"` for `db.<METHOD>(...)` syntax.
Note that you can always use named imports to import functions invidiually.
:::

## Functions

The `netzo/db` module exports the following utility functions.

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

::: tip `idField` defaults to `"id"` and value to `crypto.randomUUID()`
If `idField` is not provided as third argument, the default `"id"` will be used. Each data item can specify a value at that `idField` (or the default one), and if not provided, a random UUID will be generated for it via `crypto.randomUUID()` of the Web Crypto API.
:::

```ts
// [create] POST /todos
const todo = await db.create<Todo>('todos', {
  userId: '1',
  title: 'delectus aut autem',
  completed: false,
})

// [create] POST /todos (multiple at once)
const todo = await db.create<Todo>('todos', [
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
], 'id') // NOTE: idField defaults to "id" and value to crypto.randomUUID()
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