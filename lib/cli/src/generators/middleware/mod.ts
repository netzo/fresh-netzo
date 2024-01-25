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

export interface MiddlewareGeneratorContext extends NetzoContext {
  name: string;
  camelName: string;
  pascalName: string;
  kebabName: string;
  type: "sync" | "async";
}

export const generate = (ctx: MiddlewareGeneratorContext) =>
  Promise.resolve(ctx)
    .then(initializeBaseContext())
    .then(checkPreconditions())
    .then(
      prompt<MiddlewareGeneratorContext>(({ name, type }) => [
        {
          type: "input",
          name: "name",
          message:
            "What is the filepath (without extension) of the middleware?",
          when: !name,
        },
        {
          name: "type",
          type: "list",
          when: !type,
          message: "What type of middleware is it?",
          choices: [
            { value: "sync", name: "Sync" },
            { value: "async", name: "Async" },
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
