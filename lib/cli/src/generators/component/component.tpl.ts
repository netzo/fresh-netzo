import { dirname } from "node:path";
import {
  prompt,
  runGenerators,
} from "../../../../deps/@featherscloud/pinion.ts";
import _kebabCase from "../../../../deps/lodash.kebabcase.ts";
import _camelCase from "../../../../deps/lodash.camelcase.ts";
import {
  checkPreconditions,
  initializeBaseContext,
  NetzoBaseContext,
} from "../commons.js";

// Set __dirname in es module
const __dirname = dirname(new URL(import.meta.url).pathname);

export interface HookGeneratorContext extends NetzoBaseContext {
  name: string;
  camelName: string;
  kebabName: string;
  type: "regular" | "around";
}

export const generate = (ctx: HookGeneratorContext) =>
  Promise.resolve(ctx)
    .then(initializeBaseContext())
    .then(checkPreconditions())
    .then(
      prompt<HookGeneratorContext>(({ type, name }) => [
        {
          type: "input",
          name: "name",
          message: "What is the name of the hook?",
          when: !name,
        },
        {
          name: "type",
          type: "list",
          when: !type,
          message: "What kind of hook is it?",
          choices: [
            { value: "around", name: "Around" },
            { value: "regular", name: "Before, After or Error" },
          ],
        },
      ]),
    )
    .then((ctx) => {
      const { name } = ctx;
      const kebabName = _._kebabCase(name);
      const camelName = _._camelCase(name);

      return {
        ...ctx,
        kebabName,
        camelName,
      };
    })
    .then(runGenerators(__dirname, "templates"));
