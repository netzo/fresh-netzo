import { serve } from "https://deno.land/std@0.155.0/http/server.ts";
import { handlerGET } from "./get.handler.tsx";
import { handlerPOST } from "./post.handler.ts";

// simple heuristic to resolve the entrypoint URL depending on the environment
// FIXME: this is not a good solution and it only works for Netzo (when env variable
// NETZO_PROJECT_ENTRYPOINT_URL is set) and it Deno Deploy (when 'main.ts' is default)
const getEntrypointURL = (): string => {
  const entrypointURL = Deno.env.get("NETZO_PROJECT_ENTRYPOINT_URL")?.split("/").pop() // in Netzo
  return entrypointURL ?? 'main.ts' // in Deno Deploy
};

const createHandler = (main: Function) => {
  const entrypointURL = getEntrypointURL();
  return async (request: Request): Promise<Response> => {
    switch (request.method) {
      case "GET":
        return await handlerGET(request, entrypointURL);
      case "POST":
        return await handlerPOST(request, main);
      default:
        return new Response("Invalid method", { status: 405 });
    }
  };
};

export const serveFunction = (fn: Function) => {
  return serve(createHandler(fn));
};

// test:

// curl --location --request POST 'http://localhost:8000?name=miguel' --header 'Content-Type: application/json' --data-raw '{"age": 12, "male": true}'

function main(
  boolean: boolean,
  string: string,
  number: number,
  object: object,
  array: Array<any>,
  nullValue: null,
  undefinedValue: undefined,
): string {
  return `boolean: ${boolean}
string: ${string}
number: ${number}
object: ${JSON.stringify(object)}
array: ${JSON.stringify(array)}
nullValue: ${nullValue}
undefinedValue: ${undefinedValue}`;
}

if (import.meta.main) {
  serveFunction(main);
}
