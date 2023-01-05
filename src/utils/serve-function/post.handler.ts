import { Options } from "./mod.tsx";
import { getParams } from "./utils.ts";

export const handlerPOST = async (
  { request, code, fn }: Options,
): Promise<Response> => {
  const params = await getParams(request);
  const ctx = { request, env: Deno.env.toObject(), params }; // encapsulate in single ctx object
  const body = await fn([...Object.values(params), ctx]);
  try {
    // supports dynamic 'method' invocation defaulting to 'main(...params)'
    const fn = new Function("params", `${code};return main(...params);`);
    const body = await fn([...Object.values(params), ctx]);
    console.debug({ src, params, code, body });
    return new Response(body, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
};
