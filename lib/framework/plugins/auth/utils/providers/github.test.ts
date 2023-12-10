import { assertRejects } from "../../../../../deps/std/assert/assert_rejects.ts";
import { getUserGithub } from "./github.ts";
import { returnsNext, stub } from "../../../../../deps/std/testing/mock.ts";
import { errors } from "../../../../../deps/std/http/http_errors.ts";
import { assertEquals } from "../../../../../deps/std/assert/assert_equals.ts";
import { Status } from "../../../../../deps/deno_kv_oauth/deps.ts";

Deno.test("[plugins/auth/utils/providers/github] getUserGithub()", async (test) => {
  await test.step("rejects on error message", async () => {
    const message = crypto.randomUUID();
    const fetchStub = stub(
      window,
      "fetch",
      returnsNext([
        Promise.resolve(
          Response.json({ message }, { status: Status.BadRequest }),
        ),
      ]),
    );
    await assertRejects(
      async () => await getUserGithub(crypto.randomUUID()),
      errors.BadRequest,
      message,
    );
    fetchStub.restore();
  });

  await test.step("resolves to a GitHub user object", async () => {
    const body = { login: crypto.randomUUID(), email: crypto.randomUUID() };
    const fetchStub = stub(
      window,
      "fetch",
      returnsNext([Promise.resolve(Response.json(body))]),
    );
    assertEquals(await getUserGithub(crypto.randomUUID()), body);
    fetchStub.restore();
  });
});
