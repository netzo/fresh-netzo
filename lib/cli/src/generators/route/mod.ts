import {
  prompt,
  runGenerators,
} from "../../../../deps/@featherscloud/pinion.ts";
import {
  checkPreconditions,
  initializeBaseContext,
  NetzoContext,
} from "../commons.ts";

export interface RouteGeneratorContext extends NetzoContext {
  // NOTE: sync/async variants left for user to adapt
  // NOTE: "_404"/"_500" not included to avoid conflicts with netzo/ui module
  type: "ui" | "api" | "mixed";
  filepath: string;
}

export const generate = (ctx: RouteGeneratorContext) =>
  Promise.resolve(ctx)
    .then(initializeBaseContext())
    .then(checkPreconditions())
    .then(
      prompt<RouteGeneratorContext>((/* { type, filepath } */) => [
        {
          name: "type",
          type: "list",
          message: "Select route type:",
          choices: [
            { value: "ui", name: "UI page" },
            { value: "api", name: "API endpoint" },
            { value: "mixed", name: "UI page and API endpoint" },
          ],
          when: ({ type }) => !type,
        },
        {
          type: "input",
          name: "filepath",
          message: ({ type }) => {
            return ({
              ui:
                'Enter route filepath at "routes/" (e.g. "index", "users/[id]"):',
              api:
                'Enter route filepath at "routes/" (e.g. "api/index", "api/users/[id]"):',
              mixed:
                'Enter route filepath at "routes/" (e.g. "index", "users/[id]"):',
            })[type as RouteGeneratorContext["type"]];
          },
          when: ({ filepath }) => !filepath,
        },
      ]),
    )
    .then(runGenerators(import.meta.dirname!, "templates"));
