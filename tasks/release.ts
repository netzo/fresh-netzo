#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes/ dev.ts

const [tagName] = Deno.args;

if (!tagName) {
  console.error("Please provide a tag name X.Y.Z.");
  Deno.exit(1);
}

// Create Git tag
const process = new Deno.Command("git", {
  args: ["tag", tagName],
}).spawn();
const { success } = await process.status;
if (!success) console.error("Failed to create Git tag.");

// Create GitHub release
const processRelease = new Deno.Command("gh", {
  args: [
    "release",
    "create",
    tagName,
    "--generate-notes",
    "--prerelease",
    "--target",
    "main",
  ],
}).spawn();
const { success: successRelease } = await processRelease.status;
if (!successRelease) console.error("Failed to create GitHub release.");

console.log(`Created tag '${tagName}' and GitHub release for it.`);
