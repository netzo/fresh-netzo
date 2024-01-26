import { toFile } from "../../../../../deps/@featherscloud/pinion/mod.ts";
import { MiddlewareGeneratorContext } from "../mod.ts";
import { renderSource } from "../../commons.ts";

const singleTemplate = ({}: MiddlewareGeneratorContext) =>
  /* ts */ `// [netzo] generated via https://netzo.io/docs/cli
import { FreshContext } from "$fresh/server.ts";

type State = {};

export async function handler(req: Request, ctx: FreshContext<State>) {
  // [before] do something
  const response = await ctx.next();
  // [after] do something
  return response;
}
`;

const multipleTemplate = ({}: MiddlewareGeneratorContext) =>
  /* ts */ `// [netzo] generated via https://netzo.io/docs/cli
export const handler = [
  async function middleware1(req, ctx) {
    // [before] do something
    const response = await ctx.next();
    // [after] do something
    return response;
  },
  async function middleware2(req, ctx) {
    // [before] do something
    const response = await ctx.next();
    // [after] do something
    return response;
  },
];
`;

export const generate = (ctx: MiddlewareGeneratorContext) =>
  Promise.resolve(ctx).then(
    renderSource(
      (ctx) =>
        ({
          single: singleTemplate(ctx),
          multiple: multipleTemplate(ctx),
        })[ctx.type],
      toFile<MiddlewareGeneratorContext>((
        { src, path },
      ) => [src, `routes/${path}`, "_middleware"]),
    ),
  );
