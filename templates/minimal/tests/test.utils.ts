import { startFreshServer } from "$fresh/tests/test_utils.ts";

export async function withFresh(
  name: string,
  args: string[],
  fn: (address: string) => Promise<void>,
) {
  const { lines, serverProcess, address } = await startFreshServer({
    args: ["run", "-A", name, ...args],
  });

  try {
    await fn(address);
  } finally {
    serverProcess.kill("SIGTERM");

    // Wait until the process exits
    await serverProcess.status;

    // Drain the lines stream
    for await (const _ of lines) { /* noop */ }
  }
}
