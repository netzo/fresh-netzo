import { dirname } from "../../../../deps/std/path/mod.ts";
import {
  prompt,
  runGenerators,
} from "../../../../deps/@featherscloud/pinion.ts";
import {
  camelCase,
  paramCase as kebabCase,
  pascalCase,
} from "../../../../deps/x/case/mod.ts";
import {
  checkPreconditions,
  initializeBaseContext,
  NetzoContext,
} from "../commons.ts";

// Set __dirname in es module
const __dirname = dirname(new URL(import.meta.url).pathname);

export interface RouteGeneratorContext extends NetzoContext {
  name: string;
  camelName: string;
  pascalName: string;
  kebabName: string;
  kind: "ui" | "api" | "layout" | "error";
  type: "ui:sync" | "ui:async" | "api:sync" | "api:async" | "layout:_app" | "layout:_layout" | "error:_404" | "error:_500";
}

export const generate = (ctx: RouteGeneratorContext) =>
  Promise.resolve(ctx)
    .then(initializeBaseContext())
    .then(checkPreconditions())
    .then(
      prompt<RouteGeneratorContext>(({ name, kind, type }) => [
        {
          type: "input",
          name: "name",
          message: 'What is the filepath (without extension) of the route?',
          when: !name,
        },
        {
          name: "kind",
          type: "list",
          when: !kind,
          message: "What kind of route is it?",
          choices: [
            { value: "ui", name: "UI page" },
            { value: "api", name: "API endpoint" },
            { value: "layout", name: "UI layout" },
            { value: "error", name: "Error page" },
          ],
        },
        {
          name: "type",
          type: "list",
          when: ({ type, kind }) => !type && kind === "ui",
          message: "What type of route is it?",
          choices: [
            { value: "ui:sync", name: "Sync" },
            { value: "ui:async", name: "Async" },
          ],
        },
        {
          name: "type",
          type: "list",
          when: ({ type, kind }) => !type && kind === "api",
          message: "What type of route is it?",
          choices: [
            { value: "api:sync", name: "Sync" },
            { value: "api:async", name: "Async" },
          ],
        },
        {
          name: "type",
          type: "list",
          when: ({ type, kind }) => !type && kind === "layout",
          message: "What type of route is it?",
          choices: [
            { value: "layout:_app", name: "App Wrapper" },
            { value: "layout:_layout", name: "Layout" },
          ],
        },
        {
          name: "type",
          type: "list",
          when: ({ type, kind }) => !type && kind === "error",
          message: "What type of route is it?",
          choices: [
            { value: "error:_404", name: "404" },
            { value: "error:_500", name: "500" },
          ],
        },
      ]),
    )
    .then((ctx) => {
      const { name } = ctx;
      return {
        ...ctx,
        pascalName: pascalCase(name),
        camelName: camelCase(name),
        kebabName: kebabCase(name),
      };
    })
    .then(runGenerators(__dirname, "templates"));
