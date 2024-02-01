import {
  prompt,
  runGenerators,
} from "../../../deps/@featherscloud/pinion/mod.ts";
import {
  checkPreconditions,
  initializeBaseContext,
  NetzoContext,
} from "../commons.ts";

export interface LayoutGeneratorContext extends NetzoContext {
  // NOTE: sync/async variants left for user to adapt
  // NOTE: "_app" not included to avoid conflicts with netzo/ui module
  type: "default" | "sidebar" | "two-column" | "dashboard" | "grid";
  filepath: string;
}

export const generate = (ctx: LayoutGeneratorContext) =>
  Promise.resolve(ctx)
    .then(initializeBaseContext())
    .then(checkPreconditions())
    .then(
      prompt<LayoutGeneratorContext>((/* { type, filepath } */) => [
        {
          name: "type",
          type: "list",
          message: "Select layout type:",
          choices: [
            { value: "default", name: "Default" },
            { value: "sidebar", name: "Sidebar" },
            { value: "two-column", name: "Two-column" },
            { value: "dashboard", name: "Dashboard" },
            { value: "grid", name: "Grid" },
          ],
          when: ({ type }) => !type,
        },
        {
          type: "input",
          name: "filepath",
          message:
            'Enter layout filepath at "routes/" (e.g. "index", "users/[id]"):',
          when: ({ filepath }) => !filepath,
        },
      ]),
    )
    // FIXME: the runGenerators() function must be vendored and adapted to work
    // also for https:// URLs (in production). Note that import.meta.dirname is
    // undefined when running under https:// URLs (in production), so we should
    // crawl the files in the directory in another way (maybe via GitHub API?)
    .then(runGenerators(import.meta.dirname!, "templates"));
