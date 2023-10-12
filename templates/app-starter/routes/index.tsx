import { defineRoute } from "$fresh/server.ts";

export default defineRoute(() => {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Netzo!</title>
        <link rel="icon" type="image/svg+xml" href="https://netzo.io/favicon.svg" />
      </head>
      <body>
      <main class="h-screen flex justify-center items-center bg-slate-950">
        <div class="grid gap-3 place-items-center text-white">
          <h1 class="text-4xl font-bold mb-4">Welcome to Netzo</h1>
          <p class="">The smartest way of building internal tools</p>
          <div class="p-6">
            <img src="https://netzo.io/images/netzo-symbol-dark.svg" class="h-48 w-48" />
          </div>
        </div>
      </main>
      </body>
    </html>
  );
});
