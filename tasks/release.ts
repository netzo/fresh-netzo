#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes dev.ts

const [tagName] = Deno.args;

if (!tagName) {
  console.error("Please provide a tag name (e.g. 1.2.3).");
  Deno.exit(1);
}

// Create Git tag
const process = new Deno.Command(Deno.execPath(), {
  cmd: ["git", "tag", tagName],
}).spawn();
await process.status;

// Create GitHub release
const process = new Deno.Command(Deno.execPath(), {
  cmd: [
    "gh",
    "release",
    "create",
    tagName,
    "--generate-notes",
    "--prerelease",
    "--target",
    "main",
  ],
}).spawn();
await process.status;

console.log(`Created tag '${tagName}' and GitHub release for it.`);