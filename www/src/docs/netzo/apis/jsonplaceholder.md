<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/jsonplaceholder.svg" alt="netzo/apis/jsonplaceholder" class="mb-5 w-75px">

# JSONPlaceholder

JSONPlaceholder is a free online REST API that you can use whenever you need some fake data.

- **labels:** `development`, `testing`, `mocking`, `fake-data`
- **authentication:** `none`

## Usage

```ts
import { jsonplaceholder } from 'https://deno.land/x/netzo/apis/jsonplaceholder/mod.ts'
const { api } = jsonplaceholder()
```

## Configuration

The `jsonplaceholder` factory function returns an object with an HTTP client `api`.

::: tip Refer to the [API documentation](https://jsonplaceholder.typicode.com/guide/) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/jsonplaceholder/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find todos

Find all todos.

```ts
import type { Todo } from 'netzo/apis/jsonplaceholder/types.ts'

const resultData = await api.todos.get<Todo[]>()
```

### Get todo

Get todo by id.

```ts
import type { Todo } from 'netzo/apis/jsonplaceholder/types.ts'

const resultData = await api.todos[TODO_ID].get<Todo>()
```

### Add todo

Add a new todo.

```ts
import type { QueryAddTodo, Todo } from 'netzo/apis/jsonplaceholder/types.ts'

const data: QueryAddTodo = {
  userId: 1,
  title: 'New task'
}
const resultData = await api.todos.post<Todo>(data)
```

### Update todo

Update a todo by id.

```ts
import type { Todo } from 'netzo/apis/jsonplaceholder/types.ts'

const data: Todo = {
  userId: 1,
  title: 'Updated task',
  id: TODO_ID,
  completed: true
}
const resultData = await api.todos[TODO_ID].put<Todo>(data)
```

### Delete todo

Delete a todo by id.

```ts
const resultData = await api.todos[TODO_ID].delete<{}>()
```

## References

- [API documentation & reference](https://jsonplaceholder.typicode.com/guide/)

