import { UnknownPageProps } from "../deps.ts";

export default ({ data, url }: UnknownPageProps) => {
  return (
    <>
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">
              404
            </h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Not Found
            </p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              No matching route for{" "}
              <code class="font-mono">{url.pathname}</code>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
