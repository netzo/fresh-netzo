import { toFile } from "../../../../../deps/@featherscloud/pinion/mod.ts";
import { RouteGeneratorContext } from "../mod.ts";
import { renderSource } from "../../commons.ts";

const uiTemplate = ({ }: RouteGeneratorContext) =>
  /* tsx */ `// [netzo] generated via https://netzo.io/docs/cli
import { defineRoute } from "$fresh/server.ts";

export type State = {};

export default defineRoute<State>(async (req, ctx) => {
  return (
    <main>
      <h1>About</h1>
      <p>This is the about page.</p>
    </main>
  );
});
`;

const apiTemplate = ({ }: RouteGeneratorContext) =>
  /* tsx */ `// [netzo] generated via https://netzo.io/docs/cli
TODO
`;

const mixedTemplate = ({ }: RouteGeneratorContext) =>
  /* tsx */ `// [netzo] generated via https://netzo.io/docs/cli
TODO
`;

export const generate = (ctx: RouteGeneratorContext) =>
  Promise.resolve(ctx).then((ctx) => {
    if (ctx.language.startsWith("ts")) ctx.language = "tsx";
    else if (ctx.language.startsWith("js")) ctx.language = "jsx";
    return ctx;
  }).then(
    renderSource(
      (ctx) =>
        ({
          "ui": uiTemplate(ctx),
          "api": apiTemplate(ctx),
          "mixed": mixedTemplate(ctx),
        })[ctx.type],
      toFile<RouteGeneratorContext>((
        { src, filepath },
      ) => [src, "routes", filepath]),
    ),
  );
