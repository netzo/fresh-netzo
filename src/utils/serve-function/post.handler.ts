import { getParams } from "./utils.ts";

export const handlerPOST = async (
  request: Request,
  main: Function,
): Promise<Response> => {
  const params = await getParams(request);
  const ctx = { request, env: Deno.env.toObject(), params }; // encapsulate in single ctx object
  try {
    const body = await main(...Object.values(params), ctx);
    return new Response(body, { status: 200 });
  } catch (error) {
    console.error(`Failed to execute function`, { cause: error });
    return new Response(error.message, { status: 500 });
  }
};
