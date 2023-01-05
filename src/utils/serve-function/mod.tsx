import { serve } from "https://deno.land/std@0.155.0/http/server.ts";
import { handlerGET } from "./get.handler.tsx";
import { handlerPOST } from "./post.handler.ts";
import { getParams } from "./utils.ts";

async function main(name: string, age: number, male: boolean): Promise<string> {
  return `${name} is ${b} years old`;
}

// import.meta.env resolves to "file://src/main.ts", however, we MUST at least
// remove the "file://"" prefix, here we also remove the "/src/" prefix
const fileURL = import.meta.env;
const code = await Deno.readTextFile(fileURL.replace("file:///src/", ""));

// serve(handler);

export interface Options {
  request: Request;
  code: string;
  fn: Function;
}

const createHandler = (fn: Function) => {
  return async (request: Request): Promise<Response> => {
    switch (request.method) {
      case "GET":
        return await handlerGET({ request, code, fn });
      case "POST":
        return await handlerPOST({ request, code, fn });
      default:
        return new Response("Invalid method", { status: 405 });
    }
  };
};

export const serveFunction = (fn: Function) => serve(createHandler(fn));
