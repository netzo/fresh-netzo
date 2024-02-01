import { toFile } from "../../../../deps/@featherscloud/pinion/mod.ts";
import { LayoutGeneratorContext } from "../mod.ts";
import { renderSource } from "../../commons.ts";

const defaultTemplate = ({}: LayoutGeneratorContext) =>
  /* tsx */ `// [netzo] generated via https://netzo.io/docs/cli
import { defineLayout } from "$fresh/server.ts";

export type State = {};

export default defineLayout<State>((req, ctx) => {
  return (
    <div class="w-full h-full flex flex-col">
      <ctx.Component />
    </div>
  );
});
`;

const sidebarTemplate = ({}: LayoutGeneratorContext) =>
  /* tsx */ `// [netzo] generated via https://netzo.io/docs/cli
import { defineLayout } from "$fresh/server.ts";

export type State = {};

export default defineLayout<State>((req, ctx) => {
  return (
    <div class="w-full h-full flex">
      <aside class="w-1/4 p-4">
        {/* Sidebar Content */}
      </aside>
      <main class="w-3/4 p-4">
        <ctx.Component />
      </main>
    </div>
  );
});
`;

const twoColumnTemplate = ({}: LayoutGeneratorContext) =>
  /* tsx */ `// [netzo] generated via https://netzo.io/docs/cli
import { defineLayout } from "$fresh/server.ts";

export type State = {};

export default defineLayout<State>((req, ctx) => {
  return (
    <div class="w-full h-full flex">
      <div class="w-1/2 p-4">
        {/* Column 1 Content */}
      </div>
      <div class="w-1/2 p-4">
        {/* Column 2 Content */}
      </div>
    </div>
  );
});
`;

const dashboardTemplate = ({}: LayoutGeneratorContext) =>
  /* tsx */ `// [netzo] generated via https://netzo.io/docs/cli
import { defineLayout } from "$fresh/server.ts";

export type State = {};

export default defineLayout<State>((req, ctx) => {
  return (
    <div class="w-full h-full flex flex-col">
      <div class="flex">
        <div class="w-1/4 p-4">
          {/* Card 1 Content */}
        </div>
        <div class="w-1/4 p-4">
          {/* Card 2 Content */}
        </div>
        <div class="w-1/4 p-4">
          {/* Card 3 Content */}
        </div>
        <div class="w-1/4 p-4">
          {/* Card 4 Content */}
        </div>
      </div>
      <div class="flex-1 p-4">
        <ctx.Component />
      </div>
    </div>
  );
});
`;

const gridTemplate = ({}: LayoutGeneratorContext) =>
  /* tsx */ `// [netzo] generated via https://netzo.io/docs/cli
import { defineLayout } from "$fresh/server.ts";

export type State = {};

export default defineLayout<State>((req, ctx) => {
  return (
    <div class="w-full h-full flex flex-wrap">
      {new Array(16).fill(0).map((_, i) => (
        <div class="w-1/4 p-4">
          Card {i + 1}
        </div>
      )}
    </div>
  );
});
`;

export const generate = (ctx: LayoutGeneratorContext) =>
  Promise.resolve(ctx).then((ctx) => {
    if (ctx.language.startsWith("ts")) ctx.language = "tsx";
    else if (ctx.language.startsWith("js")) ctx.language = "jsx";
    return ctx;
  }).then(
    renderSource(
      (ctx) =>
        ({
          "default": defaultTemplate(ctx),
          "sidebar": sidebarTemplate(ctx),
          "two-column": twoColumnTemplate(ctx),
          "dashboard": dashboardTemplate(ctx),
          "grid": gridTemplate(ctx),
        })[ctx.type],
      toFile<LayoutGeneratorContext>((
        { src, filepath },
      ) => [src, "routes", filepath]),
    ),
  );
