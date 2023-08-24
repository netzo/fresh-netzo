# Fetch

The following basic examples demonstrate common use cases of using the `fetch` API.

## GET request

A HTTP client that fetches a resource from a remote server.

```ts
const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
const data = await response.json()
```

## POST request with JSON

A HTTP client that sends a `POST` request to a remote server with a JSON body.

```ts
const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: new URLSearchParams({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
})
const data = await response.json()
```

## POST request with form data

A HTTP client that sends a `POST` request to a remote server with form data.

```ts
const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: new URLSearchParams({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
})
const data = await response.json()
```

## POST request with file upload

A HTTP client that sends a `POST` request to a remote server with a file upload.

```ts
const file = new File(['Hello World!'], 'hello.txt', {
  type: 'text/plain',
})

const formData = new FormData()
formData.append('file', file)

const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: formData,
})
const data = await response.json()
```
