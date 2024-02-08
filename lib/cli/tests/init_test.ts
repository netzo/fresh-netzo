import { retry } from "std/async/retry.ts";

Deno.test("CLI init and task execution", async () => {
  const tmpDirName = await Deno.makeTempDir();
  const process = new Deno.Command(Deno.execPath(), {
    args: [
      "run",
      "-A",
      "./lib/cli/netzo.ts",
      "init",
      "minimal",
      "--dir",
      tmpDirName,
    ],
  }).spawn();
  await process.status;

  const checkProcess = new Deno.Command(Deno.execPath(), {
    args: [
      "task",
      "ok",
    ],
    cwd: tmpDirName,
  }).spawn();
  await checkProcess.status;
  console.log(tmpDirName);

  await retry(() => Deno.remove(tmpDirName, { recursive: true }));
});
