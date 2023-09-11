import { defineRoute } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import { signal } from "@preact/signals";
import Form from "../islands/Form.tsx";

const meta = {
  title: "File Upload Portal",
  description:
    "A file upload tool to ease data processing and syncing from files.",
};

// see https://creatomate.com/blog/the-best-video-generation-apis

export const handler: Handlers = {
  GET: async (_req, ctx) => {
    return await ctx.render();
  },
  POST: async (req, _ctx) => {
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const files = form.get("files")?.toString();
    console.log({ email, files });
    // redirect to home page
    const headers = new Headers();
    headers.set("Location", "/");
    return new Response(undefined, { status: 303, headers }); // 303: See Other
  },
};

const isLoading = signal(false);

export default defineRoute((props: PageProps) => {
  return (
    <html>
      <head>
        <title>{`${meta.title} | Netzo`}</title>
        <meta name="description" content={meta.description} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>

      <body class="flex flex-col">
        <header class="flex justify-between items-center py-6 px-10">
          <div>
            <h1 class="text-2xl mb-1 font-semibold dark:text-white">
              {meta.title}
            </h1>
            <p class="text-sm dark:text-gray-300">{meta.description}</p>
          </div>
          <a href="https://netzo.io" target="_blank">
            <img
              src="https://netzo.io/images/built-with-netzo-light.svg"
              class="h-10"
            />
          </a>
        </header>

        <main class="flex-1">
          <Form />
        </main>
      </body>
    </html>
  );
});
