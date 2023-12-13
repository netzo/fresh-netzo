import { createHandler, Status } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import {
  createItem,
  createUser,
  getUser,
  type Item,
  randomItem,
  randomUser,
} from "netzo/framework/plugins/auth/utils/db.ts";
import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertInstanceOf,
  assertNotEquals,
} from "std/assert/mod.ts";
import { isRedirectStatus } from "std/http/http_status.ts";
import options from "./netzo.ts";

/**
 * These tests are end-to-end tests, which follow this rule-set:
 * 1. `Response.status` is checked first by using the `Status` enum. It's the
 * primary indicator of whether the request was successful or not.
 * 2. `Response.header`'s `content-type` is checked next to ensure the
 * response is of the expected type. This is where custom assertions are used.
 * 3. `Response.body` is checked last, if needed. This is where the actual
 * content of the response is checked. Here, we're checking if the body is
 * instance of a specific type, equals a specific string, contains a specific
 * string or is empty.
 */

/**
 * @see {@link https://fresh.deno.dev/docs/examples/writing-tests|Writing tests} example on how to write tests for Fresh projects.
 */
const handler = await createHandler(manifest, options);

function assertHtml(resp: Response) {
  assertInstanceOf(resp.body, ReadableStream);
  assertEquals(resp.headers.get("content-type"), "text/html; charset=utf-8");
}

function assertJson(resp: Response) {
  assertInstanceOf(resp.body, ReadableStream);
  assertEquals(resp.headers.get("content-type"), "application/json");
}

function assertText(resp: Response) {
  assertInstanceOf(resp.body, ReadableStream);
  assertEquals(resp.headers.get("content-type"), "text/plain;charset=UTF-8");
}

function assertRedirect(response: Response, location: string) {
  assert(isRedirectStatus(response.status));
  assert(response.headers.get("location")?.includes(location));
}

Deno.test("[e2e] GET /", async () => {
  const resp = await handler(new Request("http://localhost"));

  assertEquals(resp.status, Status.OK);
  assertHtml(resp);
});

Deno.test("[e2e] GET /auth/github/callback", async (test) => {
  const login = crypto.randomUUID();
  const sessionId = crypto.randomUUID();

  await test.step("creates a new user if it doesn't already exist", async () => {
    const handleCallbackResp = {
      response: new Response(),
      tokens: {
        accessToken: crypto.randomUUID(),
        tokenType: crypto.randomUUID(),
      },
      sessionId,
    };
    const githubRespBody = {
      login,
      email: crypto.randomUUID(),
    };

    const user = await getUser(githubRespBody.login);
    assert(user !== null);
    assertEquals(user.sessionId, handleCallbackResp.sessionId);
  });

  await test.step("updates the user session ID if they already exist", async () => {
    const githubRespBody = {
      login,
      email: crypto.randomUUID(),
    };

    const user = await getUser(githubRespBody.login);
    assert(user !== null);
    assertNotEquals(user.sessionId, sessionId);
  });
});

Deno.test("[e2e] GET /auth/github/signin", async () => {
  const resp = await handler(
    new Request("http://localhost/auth/github/signin"),
  );

  assertRedirect(
    resp,
    "https://github.com/login/auth/github/authorize",
  );
});

Deno.test("[e2e] GET /auth/signout", async () => {
  const resp = await handler(
    new Request("http://localhost/auth/signout"),
  );

  assertRedirect(resp, "/");
});

Deno.test("[e2e] GET /api/items", async () => {
  const item1 = randomItem();
  const item2 = randomItem();
  await createItem(item1);
  await createItem(item2);
  const req = new Request("http://localhost/api/items");
  const resp = await handler(req);
  const { values } = await resp.json();

  assertEquals(resp.status, Status.OK);
  assertJson(resp);
  assertArrayIncludes(values, [item1, item2]);
});

Deno.test("[e2e] GET /api/items/[id]", async (test) => {
  const item = randomItem();
  const req = new Request("http://localhost/api/items/" + item.id);

  await test.step("serves not found response if item not found", async () => {
    const resp = await handler(req);

    assertEquals(resp.status, Status.NotFound);
    assertEquals(await resp.text(), "Item not found");
  });

  await test.step("serves item as JSON", async () => {
    await createItem(item);
    const resp = await handler(req);

    assertEquals(resp.status, Status.OK);
    assertJson(resp);
    assertEquals(await resp.json(), item);
  });
});

Deno.test("[e2e] GET /api/users", async () => {
  const user1 = randomUser();
  const user2 = randomUser();
  await createUser(user1);
  await createUser(user2);

  const req = new Request("http://localhost/api/users");
  const resp = await handler(req);

  const { values } = await resp.json();

  assertEquals(resp.status, Status.OK);
  assertJson(resp);
  assertArrayIncludes(values, [user1, user2]);
});

Deno.test("[e2e] GET /api/users/[login]", async (test) => {
  const user = randomUser();
  const req = new Request("http://localhost/api/users/" + user.login);

  await test.step("serves not found response if user not found", async () => {
    const resp = await handler(req);

    assertEquals(resp.status, Status.NotFound);
    assertText(resp);
    assertEquals(await resp.text(), "User not found");
  });

  await test.step("serves user as JSON", async () => {
    await createUser(user);
    const resp = await handler(req);

    assertEquals(resp.status, Status.OK);
    assertJson(resp);
    assertEquals(await resp.json(), user);
  });
});

Deno.test("[e2e] GET /api/users/[login]/items", async (test) => {
  const user = randomUser();
  const item: Item = {
    ...randomItem(),
    userLogin: user.login,
  };
  const req = new Request(`http://localhost/api/users/${user.login}/items`);

  await test.step("serves not found response if user not found", async () => {
    const resp = await handler(req);

    assertEquals(resp.status, Status.NotFound);
    assertText(resp);
    assertEquals(await resp.text(), "User not found");
  });

  await test.step("serves items as JSON", async () => {
    await createUser(user);
    await createItem(item);
    const resp = await handler(req);
    const { values } = await resp.json();

    assertEquals(resp.status, Status.OK);
    assertJson(resp);
    assertArrayIncludes(values, [item]);
  });
});

Deno.test("[e2e] GET /account", async (test) => {
  const url = "http://localhost/account";

  await test.step("redirects to sign-in page if the session user is not signed in", async () => {
    const resp = await handler(new Request(url));

    assertRedirect(resp, "/auth/github/signin");
  });

  await test.step("serves a web page for signed-in free user", async () => {
    const user = randomUser();
    await createUser(user);

    const resp = await handler(
      new Request(url, {
        headers: { cookie: "site-session=" + user.sessionId },
      }),
    );

    assertEquals(resp.status, Status.OK);
    assertHtml(resp);
  });

  await test.step("serves a web page for signed-in premium user", async () => {
    const user = randomUser();
    await createUser({ ...user, isSubscribed: true });

    const resp = await handler(
      new Request(url, {
        headers: { cookie: "site-session=" + user.sessionId },
      }),
    );

    assertEquals(resp.status, Status.OK);
    assertHtml(resp);
  });
});