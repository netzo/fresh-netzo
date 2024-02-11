// adapted from @featherscloud/pinion to allow resolving the filepath to templates
// see https://github.com/featherscloud/pinion/blob/main/packages/pinion/src/cli.ts
import { existsSync } from "../../../deps/std/fs/exists.ts";
import { getContext /* loadModule */ } from "../../../deps/@featherscloud/pinion/mod.ts";

export const add = async (cmd: string[]) => {
  const [generatorFile, resource, _name, ...argv] = cmd;

  if (!generatorFile) {
    throw new Error("Please specify a generator file name");
  }

  const moduleName = import.meta.resolve(
    `./${resource}/mod.ts`,
  ).replace("file://", "");

  if (!moduleName.startsWith("http") && !existsSync(moduleName)) {
    throw new Error(`The generator file ${moduleName} does not exists`);
  }

  const module = await import(moduleName);
  const generate = module.default?.generate || module.generate;
  const generatorContext = getContext({ argv }, {});

  if (typeof generate !== "function") {
    throw new Error("The generator file must export a generate function");
  }

  await generate(generatorContext);
  return Deno.exit(0);
};

if (import.meta.main) {
  await add(Deno.args);
  Deno.exit(0); // exit after running cli
}
