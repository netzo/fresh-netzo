import { join } from "std/path/mod.ts";
import { assert, assertStringIncludes } from "std/assert/mod.ts";
import { retry } from "std/async/retry.ts";
import $, { CommandBuilder } from "dax/mod.ts";

Deno.test("CLI init and task execution -- minimal", async (t) => {
  const tmpDirName = await Deno.makeTempDir();

  await t.step("init project", async () => {
    await executeAndAssert(
      $`deno run -A ./lib/cli/netzo.ts init minimal --dir ${tmpDirName}`,
    );
  });

  await t.step("check netzo location", () => {
    assertStringIncludes(netzoLocation(tmpDirName), Deno.cwd());
  });

  await t.step("format", async () => {
    await executeAndAssert($`deno fmt --check`.cwd(tmpDirName));
  });

  await t.step("lint", async () => {
    await executeAndAssert($`deno lint`.cwd(tmpDirName));
  });

  // TODO: fix type check https://github.com/netzo/netzo/issues/88
  // await t.step("type check", async () => {
  //   await executeAndAssert($`deno task check:types`.cwd(tmpDirName));
  // });

  await t.step("test", async () => {
    await executeAndAssert($`deno task test --no-check`.cwd(tmpDirName));
  });

  await t.step("git was initialized", async () => {
    const gitDirExists = await Deno.stat(join(tmpDirName, ".git")).then(() =>
      true
    ).catch(() => false);
    assert(gitDirExists, "Git directory does not exist.");

    const commitCount = await $`git -C ${tmpDirName} rev-list --count HEAD`
      .text();
    assert(
      Number.parseInt(commitCount) === 1,
      `Expected exactly 1 commit, but found ${commitCount}.`,
    );
  });

  const commitMessage =
    await $`git -C ${tmpDirName} log --pretty=format:"%s" -n 1`.text();
  assert(
    commitMessage === "initial commit",
    `Expected commit message "initial commit", but found "${commitMessage}".`,
  );

  await t.step("cleanup", async () => {
    await retry(() => Deno.remove(tmpDirName, { recursive: true }));
  });
});

Deno.test("CLI init and task execution -- crm", async (t) => {
  const tmpDirName = await Deno.makeTempDir();

  await t.step("init project", async () => {
    await executeAndAssert(
      $`deno run -A ./lib/cli/netzo.ts init crm --dir ${tmpDirName}`,
    );
  });

  await t.step("format", async () => {
    await executeAndAssert($`deno fmt --check`.cwd(tmpDirName));
  });

  await t.step("lint", async () => {
    await executeAndAssert($`deno lint`.cwd(tmpDirName));
  });

  // TODO: fix type check https://github.com/netzo/netzo/issues/88
  // await t.step("type check", async () => {
  //   await executeAndAssert($`deno task check:types`.cwd(tmpDirName));
  // });

  await t.step("test", async () => {
    await executeAndAssert($`deno task test --no-check`.cwd(tmpDirName));
  });

  await t.step("cleanup", async () => {
    await retry(() => Deno.remove(tmpDirName, { recursive: true }));
  });
});

Deno.test("CLI init reflects changes in the template -- minimal", async () => {
  const tmpDirName = await Deno.makeTempDir();
  const templateDir = join(Deno.cwd(), "./templates/minimal");
  const newRoutePath = join(templateDir, "routes/foo.tsx");
  const newRouteContent = `export default function Home() {
  return <div>foo</div>;
}
`;

  try {
    await Deno.writeTextFile(newRoutePath, newRouteContent);

    await executeAndAssert(
      $`deno run -A ./lib/cli/netzo.ts init minimal --dir ${tmpDirName}`,
    );

    const newProjectRoutePath = join(tmpDirName, "routes/foo.tsx");
    const newProjectRouteContent = await Deno.readTextFile(newProjectRoutePath);
    assertStringIncludes(newProjectRouteContent, "foo");

    const manifestOutput = await executeAndAssert(
      $`deno task manifest`.cwd(tmpDirName),
    );
    assertStringIncludes(
      manifestOutput.combined,
      "The manifest has been generated for 2 routes and 0 islands.",
    );
  } finally {
    await Deno.remove(newRoutePath).catch(() => {});
    await retry(() => Deno.remove(tmpDirName, { recursive: true }));
  }
});

Deno.test("remote CLI execution", async (t) => {
  const commitSHA = Deno.env.get("GITHUB_SHA"); // always provided by github
  const githubRepository = Deno.env.get("GITHUB_REPOSITORY"); // always provided by github
  const latestRelease = Deno.env.get("LATEST_RELEASE"); // set via pozetroninc/github-action-get-latest-release

  if (!commitSHA || !latestRelease || !githubRepository) {
    console.log("Environment variables not set. Exiting test.");
    return;
  }

  const tmpDirName = await Deno.makeTempDir();

  await t.step("init project from current commit and verify", async () => {
    const currentCommitUrl =
      `https://raw.githubusercontent.com/${githubRepository}/${commitSHA}/lib/cli/netzo.ts`;

    await executeAndAssert(
      $`deno run -A ${currentCommitUrl} init minimal --dir ${tmpDirName}`,
    );

    assertStringIncludes(
      netzoLocation(tmpDirName),
      `https://raw.githubusercontent.com/${githubRepository}/${commitSHA}/`,
    );
  });

  await t.step("cleanup after current commit test", async () => {
    await retry(() => Deno.remove(tmpDirName, { recursive: true }));
  });

  const tmpDirNameForRelease = await Deno.makeTempDir();

  await t.step("init project from latest release and verify", async () => {
    const latestReleaseUrl =
      `https://deno.land/x/netzo@${latestRelease}/cli/netzo.ts`;

    await executeAndAssert(
      $`deno run -A ${latestReleaseUrl} init minimal --dir ${tmpDirNameForRelease}`,
    );

    assertStringIncludes(
      netzoLocation(tmpDirNameForRelease),
      `https://deno.land/x/netzo@${latestRelease}/`,
    );
  });

  await t.step("cleanup after latest release test", async () => {
    await retry(() => Deno.remove(tmpDirNameForRelease, { recursive: true }));
  });
});

function netzoLocation(tmpDirName: string) {
  const denoJsonPath = join(tmpDirName, "deno.json");
  const denoJson = JSON.parse(Deno.readTextFileSync(denoJsonPath));
  return denoJson.imports["netzo/"];
}

async function executeAndAssert(commandBuilder: CommandBuilder) {
  const result = await commandBuilder.stdout("piped").stderr("piped")
    .captureCombined().noThrow();
  assert(
    result.code === 0,
    `Command failed with code ${result.code} and output:
${result.combined}`,
  );
  return result;
}
