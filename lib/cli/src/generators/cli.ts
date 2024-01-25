// adapted from https://github.com/featherscloud/pinion/blob/main/packages/pinion/src/cli.ts
// to allow resolving the filepath to templates
import { existsSync } from "https://deno.land/std@0.212.0/fs/exists.ts";
import { Command } from "../../../deps/commander.ts";
import { getContext, loadModule } from "../../../deps/@featherscloud/pinion.ts";
import { VERSION } from "../version.ts";

const BASE_ACTIONS = ["help", "--help", "-h", "-V"];

export const cli = async (cmd: string[]) => {
  const [generatorFile, resource, name, ...argv] = cmd;
  const program = new Command();

  program.name("pinion").description("The Pinion CLI");
  program.command("<file> [args...]").description(
    "Run a generator file with command line arguments.",
  );
  program.version(VERSION);

  if (BASE_ACTIONS.includes(generatorFile)) {
    return program.parse(cmd, {
      from: "user",
    });
  }

  if (!generatorFile) {
    throw new Error("Please specify a generator file name");
  }

  const moduleName = import.meta.resolve(
    `./${resource}/mod.ts`,
  ).replace("file://", "");

  if (!moduleName.startsWith('http') && !existsSync(moduleName)) {
    throw new Error(`The generator file ${moduleName} does not exists`);
  }

  const module = await loadModule(moduleName);
  const generate = module.default?.generate || module.generate;
  const generatorContext = getContext({ argv }, {});

  if (typeof generate !== "function") {
    throw new Error("The generator file must export a generate function");
  }

  return generate(generatorContext);
};

if (import.meta.main) {
  await cli(Deno.args);
  Deno.exit(0); // exit after running cli
}
