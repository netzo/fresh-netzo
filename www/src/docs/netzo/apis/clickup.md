<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/clickup.svg" alt="netzo/apis/clickup" class="mb-5 w-75px">

# ClickUp

ClickUp is a cloud-based collaboration and project management tool suitable for businesses of all sizes and industries. Features include communication and collaboration tools, task assignments and statuses, alerts and a task toolbar.

- **labels:** `project-management`, `collaboration`, `task-management`, `productivity`
- **authentication:** `apiKey`

## Usage

```ts
import { clickup } from 'https://deno.land/x/netzo/apis/clickup/mod.ts'
const { api } = clickup({
  personalApiKey: Deno.env.get('CLICKUP_PERSONAL_API_KEY'),
})
```

## Configuration

The `clickup` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param            | Type   | Default                                    | Description                           |
|------------------|--------|--------------------------------------------|---------------------------------------|
| `personalApiKey` | string | `Deno.env.get('CLICKUP_PERSONAL_API_KEY')` | the api key to use for authentication |

::: tip Refer to the [API documentation](https://clickup.com/api/) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/clickup/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find lists

Find all lists that match the query.

```ts
import type { Lists, QueryLists } from 'netzo/apis/clickup/types.ts'

const query: QueryLists = {}
const result = await api.folder[FOLDER_ID].list.get<Lists>(query)
const resultData = result.lists
```

### Get list

Get a list by id.

```ts
import type { List } from 'netzo/apis/clickup/types.ts'

const resultData = await api.list[LIST_ID].get<List>()
```

### Find tasks

Find all tasks of a specific list that match the query.

```ts
import type { QueryTasks, Tasks } from 'netzo/apis/clickup/types.ts'

const query: QueryTasks = {}
const result = await api.list[LIST_ID].task.get<Tasks>(query)
const resultData = result.tasks
```

### Add task

Add a new task.

```ts
import type { QueryAddTask, Task } from 'netzo/apis/clickup/types.ts'

const data: QueryAddTask = { name: 'New Task' }
const resultData = await api.list[LIST_ID].task.post<Task>(data)
```

### Update task

Update a task by id.

```ts
import type { QueryUpdateTask, Task } from 'netzo/apis/clickup/types.ts'

const data: QueryAddTask = { name: 'Updated Task Name' }
const resultData = await api.task[TASK_ID].put<Task>(data)
```

### Delete task

Delete a task by id.

```ts
const resultData = await api.task[TASK_ID].delete<{}>()
```

## References

- [API Documentation](https://clickup.com/api)
- [Website](https://clickup.com)
