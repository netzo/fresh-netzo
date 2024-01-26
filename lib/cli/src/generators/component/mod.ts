import { prompt, runGenerators } from "../../../../deps/@featherscloud/pinion/mod.ts";
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

export interface ComponentGeneratorContext extends NetzoContext {
  type: "component" | "island";
  filepath: string;
  name: string; // set from filepath
  camelName: string;
  pascalName: string;
  kebabName: string;
}

export const generate = (ctx: ComponentGeneratorContext) =>
  Promise.resolve(ctx)
    .then(initializeBaseContext())
    .then(checkPreconditions())
    .then(
      prompt<ComponentGeneratorContext>((/* { type, name } */) => [
        {
          name: "type",
          type: "list",
          message: "Select component type:",
          choices: [
            {
              value: "component",
              name: "Component: server component (static)",
            },
            {
              value: "island",
              name: "Island: server+client component (interactive)",
            },
          ],
          when: ({ type }) => !type,
        },
        {
          type: "input",
          name: "filepath",
          message: ({ type }) => {
            return ({
              component:
                'Enter component filepath at "components/" (without extension e.g. "foo", "nested/foo"):',
              island:
                'Enter island filepath at "islands/" (without extension e.g. "foo", "nested/foo"):',
            })[type as ComponentGeneratorContext["type"]];
          },
          when: ({ filepath }) => !filepath,
        },
      ]),
    )
    .then((ctx) => {
      const { filepath } = ctx;
      const name = filepath.split("/").pop() || "";
      return {
        ...ctx,
        pascalName: pascalCase(name),
        camelName: camelCase(name),
        kebabName: kebabCase(name),
      };
    })
    // FIXME: the runGenerators() function must be vendored and adapted to work
    // also for https:// URLs (in production). Note that import.meta.dirname is
    // undefined when running under https:// URLs (in production), so we should
    // crawl the files in the directory in another way (maybe via GitHub API?)
    .then(runGenerators(import.meta.dirname!, "templates"));
