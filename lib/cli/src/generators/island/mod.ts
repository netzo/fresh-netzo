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

export interface IslandGeneratorContext extends NetzoContext {
  name: string;
  camelName: string;
  pascalName: string;
  kebabName: string;
  type: "default";
}

export const generate = (ctx: IslandGeneratorContext) =>
  Promise.resolve(ctx)
    .then(initializeBaseContext())
    .then(checkPreconditions())
    .then(
      prompt<IslandGeneratorContext>(({ name, type }) => [
        {
          type: "input",
          name: "name",
          message: 'What is the filepath (without extension) of the island?',
          when: !name,
        },
        {
          name: "type",
          type: "list",
          when: !type,
          message: "What type of island is it?",
          choices: [
            { value: "default", name: "Default" },
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
