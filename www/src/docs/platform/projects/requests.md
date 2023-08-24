# Requests

**Requests are HTTP requests made to invoke any of a project's deployments.** As such, requests consist of an HTTP method, URL, query string, headers, and body. These attempts will count towards the Requests quota of the Workspace.

![Requests](/docs/images/projects/projects-requests.webp)

Requests have the following properties:

- **Method**: The HTTP method used to make the request. For example, `GET`, `POST`, `PUT`, `DELETE`, etc.
- **URL**: The URL of the project.
- **Query**: The HTTP query string sent with the request.
- **Headers**: The HTTP headers sent with the request.
- **Body**: The HTTP body sent with the request.

:::tip Real-time event handling via WebHooks
Projects can also be triggered in response to real-time event from applications which support WebHooks such as GitHub, WhatsApp, etc.
:::

## HTTP Requests

HTTP requests are the most common type of request. They are triggered
by making an HTTP request to the project's URL. For example:

```sh
curl https://637504a176d87075f990aac4.netzo.io
```

## Invocations

Invocations, not to be confused with requests, are the actual running of a project. The following example scenarios help illustrate the difference between requests and invocations:

- If an unauthorized HTTP request is made to a private endpoint, the project will not be executed, but it will still be counted as a request.
- If an authorized HTTP request is made, the project will be executed once.
- If a real-time event is received, the project will be executed once per event.
