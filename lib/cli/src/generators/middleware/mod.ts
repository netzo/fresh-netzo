import { dirname } from "../../../../deps/std/path/mod.ts";
import {
  prompt,
  runGenerators,
} from "../../../../deps/@featherscloud/pinion.ts";
import {
  checkPreconditions,
  initializeBaseContext,
  NetzoContext,
} from "../commons.ts";

// Set __dirname in es module
const __dirname = dirname(new URL(import.meta.url).pathname);

export interface MiddlewareGeneratorContext extends NetzoContext {
  type: "single" | "multiple";
  path: string;
}

export const generate = (ctx: MiddlewareGeneratorContext) =>
  Promise.resolve(ctx)
    .then(initializeBaseContext())
    .then(checkPreconditions())
    .then(
      prompt<MiddlewareGeneratorContext>((/* { type, path } */) => [
        {
          name: "type",
          type: "list",
          message: "Select middleware type:",
          choices: [
            { value: "single", name: "Single" },
            { value: "multiple", name: "Multiple" },
          ],
          when: ({ type }) => !type,
        },
        {
          type: "input",
          name: "path",
          message: ({ type }) => {
            return ({
              single:
                'Enter path to middleware at "routes/" (e.g. "index", "api/users"):',
              multiple:
                'Enter path to middleware at "routes/" (e.g. "index", "api/users"):',
            })[type as MiddlewareGeneratorContext["type"]];
          },
          when: ({ path }) => !path,
        },
      ]),
    )
    .then(runGenerators(__dirname, "templates"));
