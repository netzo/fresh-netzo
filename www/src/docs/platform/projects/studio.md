# Studio

**Netzo provides a full-featured code editor for your projects directly in your browser.** The file explorer to the left allows you to navigate, edit, add, and delete existing files. The editor supports syntax highlighting for a wide range of languages and file types. To edit the project settings, you can click on the gear icon beside the project name.

![Studio](/docs/images/projects/projects-studio.webp)

## File Explorer

The file explorer to the left of the editor allows you to navigate, edit, add, and delete existing files. Some special files which Netzo will use are:

- `entrypoint` - executed when an HTTP request is sent to the project's URL (e.g. `main.(ts|tsx|js|jsx)`)
- `import map` - used to map import paths to URLs (`deno.json` is recommended)
- `readme.md` - rendered in the project overview page

::: tip Creating directories
To create a directory, simply create a file with a trailing slash (e.g. `components/Table.tsx`). This will create a `Table.tsx` file inside a `components` directory.
:::