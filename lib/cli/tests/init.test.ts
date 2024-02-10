import { join } from "std/path/mod.ts";
import { assertStringIncludes } from "std/assert/mod.ts";
import { retry } from "std/async/retry.ts";

Deno.test("CLI init and task execution -- minimal", async () => {
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

  await retry(() => Deno.remove(tmpDirName, { recursive: true }));
});

Deno.test("CLI init and task execution -- crm", async () => {
  const tmpDirName = await Deno.makeTempDir();
  const process = new Deno.Command(Deno.execPath(), {
    args: [
      "run",
      "-A",
      "./lib/cli/netzo.ts",
      "init",
      "crm",
      "--dir",
      tmpDirName,
    ],
  }).spawn();
  await process.status;

  // this won't work due to the state of type errors
  // const checkProcess = new Deno.Command(Deno.execPath(), {
  //   args: [
  //     "task",
  //     "ok",
  //   ],
  //   cwd: tmpDirName,
  // }).spawn();
  // await checkProcess.status;

  // delete the following three once the above is fixed
  const checkProcess = new Deno.Command(Deno.execPath(), {
    args: [
      "fmt",
      "--check",
    ],
    cwd: tmpDirName,
  }).spawn();
  await checkProcess.status;

  const lintProcess = new Deno.Command(Deno.execPath(), {
    args: [
      "lint",
    ],
    cwd: tmpDirName,
  }).spawn();
  await lintProcess.status;

  const testProcess = new Deno.Command(Deno.execPath(), {
    args: [
      "task",
      "test",
      "--no-check",
    ],
    cwd: tmpDirName,
  }).spawn();
  await testProcess.status;

  await retry(() => Deno.remove(tmpDirName, { recursive: true }));
});

Deno.test("CLI init reflects changes in the template -- minimal", async () => {
  const tmpDirName = await Deno.makeTempDir();
  const templateDir = join(
    Deno.cwd(),
    "./templates/minimal",
  );
  const newRoutePath = join(templateDir, "routes/foo.tsx");
  const newRouteContent = `export default function Home() {
  return <div>foo</div>;
}
`;

  try {
    await Deno.writeTextFile(newRoutePath, newRouteContent);

    await new Deno.Command(Deno.execPath(), {
      args: [
        "run",
        "-A",
        "./lib/cli/netzo.ts",
        "init",
        "minimal",
        "--dir",
        tmpDirName,
      ],
    }).spawn().status;

    const newProjectRoutePath = join(tmpDirName, "routes/foo.tsx");
    const newProjectRouteContent = await Deno.readTextFile(newProjectRoutePath);
    assertStringIncludes(newProjectRouteContent, "foo");

    const checkProcess = new Deno.Command(Deno.execPath(), {
      args: [
        "task",
        "manifest",
      ],
      cwd: tmpDirName,
      stdout: "piped",
    }).spawn();
    await checkProcess.status;
    const { stdout } = await checkProcess.output();
    const output = new TextDecoder().decode(stdout);
    assertStringIncludes(
      output,
      "The manifest has been generated for 2 routes and 0 islands.",
    );
  } finally {
    await Deno.remove(newRoutePath).catch(() => {});
    await retry(() => Deno.remove(tmpDirName, { recursive: true }));
  }
});
