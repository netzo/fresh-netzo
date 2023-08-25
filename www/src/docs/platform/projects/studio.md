# Studio

**Netzo provides a full-featured code editor for your projects directly in your browser.** The file explorer to the left allows you to navigate, edit, add, and delete existing files. The editor supports syntax highlighting for a wide range of languages and file types. To edit the [project settings](/docs/platform/projects/settings), you can click on the gear icon beside the project name.

![Studio](/docs/images/projects/projects-studio.webp)

## File Explorer

The file explorer to the left of the editor allows you to navigate, edit, add, and delete existing files. Some special files which Netzo will use are:

- `entrypoint` - executed when an HTTP request is sent to the project's URL (e.g. `main.(ts|tsx|js|jsx)`)
- `import map` - used to map import paths to URLs (`deno.json` is recommended)
- `readme.md` - rendered in the project overview page


::: tip Creating directories
To create a directory, simply create a file with a trailing slash (e.g. `components/Table.tsx`). This will create a `Table.tsx` file inside a `components` directory.
:::

## Project Drawer

The project drawer to the right of the editor provides convenient access to certain features while editing projects.

### Testing

The testing drawer allows you to test your project by making HTTP requests to the project's URL. You can choose the HTTP method, add headers, and specify a request body. The response will be displayed below the request.

### Deployments

The deployments drawer allows you to view the project's deployments in real time and which of them are currently marked as the `production` and `preview` deployments.

### Requests

The requests drawer allows you to view the history of requests being made to the project in real time. These requests will count towards the project's request quota.

### Logs

The logs drawer allows you to view the project's logs in real time. You can toggle between regular runtime logs (output of using `console` methods in the project code) and crashes (system logs automatically sent by the runtime).

### Variables

The variables drawer allows you to view all variables in the current workspace. From here you can copy the variable's name to be used with the Netzo SDK. Note that you will need a valid API key to instantiate these variables with the SDK.

### Docs

A quick link to the Netzo documentation for projects.
