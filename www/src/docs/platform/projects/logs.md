# Logs

**Logs are events that happen when deploying and invoking projects.** This includes both the output of `console` methods in your code as well as system logs sent automatically by Netzo. Logs are especially useful during development and for debugging. You can filter logs by project, deployment, and event type and search by text (case-insensitive).

![Logs](/docs/images/projects/projects-logs.webp)

<!-- ## Log Types

### `boot`

This event is created when an isolate successfully boots. Not every request
results in a boot event, because isolates can be re-used for multiple requests.

```ts
interface BootEventPayload {
  boot_time: number
}
```

### `bootFailure`

This event is created when an isolate fails to boot.

```ts
interface BootFailureEventPayload {
  msg: string
}
```

### `log`

This event is created when a log message is written from the isolate using the console API. The log severity level is included in the event payload and is determined by which log function is used to write the message.

```ts
interface LogEventPayload {
  msg: string
  level: 'debug' | 'info' | 'warning' | 'error'
}
```

An example `log` event:

```json
{
  "deployment_id": "deployment_id",
  "timestamp": "2021-03-01T00:00:00.000Z",
  "event_type": "log",
  "event": {
    "message": "Hello, world!"
  },
  "isolate_id": "isolate_id",
  "region": "us"
}
```

### `uncaughtException`

This event is created when an uncaught exception occurs in the isolate.

```ts
interface UncaughtExceptionEventPayload {
  exception: string
}
```

### `memoryLimit`

This event is created when the isolate's memory usage exceeds the configured memory limit.

```ts
interface MemoryLimitEventPayload {}
```

### `timeLimit`

This event is created when the isolate's CPU execution time exceeds the configured time limit.

```ts
interface TimeLimitEventPayload {}
``` -->


## Debugging Errors

When an error occurs in your project, the first thing to do is to check the logs. If you see an error in the logs, you can open in to check the `event_type` and inspect the `event` itself more information.

To debug common errors, you must first its identify the error type, which in most cases is enough to find the cause of the error. For example, if you see a `bootFailure` event, you can check the `event` field to see the error message.

```json
{
  "deployment_id": "deployment_id",
  "timestamp": "2021-03-01T00:00:00.000Z",
  "event_type": "bootFailure",
  "event": {
    "message": "Uncaught Error: Cannot find module \"https://example.com/mod.ts\""
  },
  "isolate_id": "isolate_id",
  "region": "us"
}
```

In this case, the error is caused by a missing module. You can fix this by adding the module to your project.

## Error Types

There are a few common errors that you may encounter:

### Syntax Errors

Syntax errors are the most common type of error. They are caused by a mistake in your code. For example, if you forget to close a bracket, or if you misspell a keyword, you will get a syntax error.

::: warning Syntax Errors will lead to a `bootFailure` log
Invoking the project will not work since it failed to boot successfully. You will need to fix the syntax error and re-deploy.
:::

### Runtime Errors

Runtime errors are caused by a mistake in your code that is not caught by the compiler. For example, if you try to access a property that does not exist, you will get a runtime error.

::: warning Runtime Errors might lead to a `uncaughtException` log
Invoking the project should be possible since it was booted successfully, but the error might be thrown at runtime.
:::

### Type Errors

Type errors are caused by a mistake in your code that is not caught by the compiler. For example, if you try to access a property that does not exist, you will get a type error.

::: warning Runtime Errors might lead to a `uncaughtException` log
Invoking the project should be possible since it was booted successfully, but the error might be thrown at runtime.
:::
