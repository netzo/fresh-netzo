import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from "../../mod.ts";
import { IRequest } from "./types.ts";

// const { API_KEY } = config();

const REQUEST: IRequest = {
  "method": "GET",
  "url": "https://jsonplaceholder.typicode.com/todos",
  "authorization": {
    "type": "none",
  },
  "query": {},
  "headers": {},
  "body": "",
  "variables": {},
};

const REQUEST_WITH_BASE: IRequest = {
  "method": "GET",
  "url": "/todos",
  "authorization": {
    "type": "none",
  },
  "query": {},
  "headers": {},
  "body": "",
  "variables": {},
  base: {
    "baseURL": "https://jsonplaceholder.typicode.com",
  }
};

Deno.test("netzo.request", async (t) => {
  const netzo = Netzo({ apiKey: '' });
  const request = netzo.request(REQUEST);

  await t.step("request", () => {
    assertExists(request);
    assertExists(request.method);
    assertExists(request.url);
    assertExists(request.authorization);
    assertExists(request.query);
    assertExists(request.headers);
    assertExists(request.body);
    assertExists(request.variables);
    assertExists(request.invoke);
  });

  await t.step("request.invoke()", async () => {
    const todos = await request.invoke();
    assertEquals(todos?.length, 200);
  });

  await t.step("request.invoke({ userId: 1 })", async () => {
    const todosQuery = await request.invoke({ userId: 1 });
    assertEquals(todosQuery?.length, 20);
  });

  await t.step("request.invoke({ completed: false })", async () => {
    const todosQuery = await request.invoke({ completed: false });
    assertEquals(todosQuery?.length, 110);
  });
});

Deno.test("netzo.requestWithBase", async (t) => {
  const netzo = Netzo({ apiKey: '' });
  const requestWithBase = netzo.request(REQUEST);

  await t.step("requestWithBase", () => {
    assertExists(requestWithBase);
    assertExists(requestWithBase.method);
    assertExists(requestWithBase.url);
    assertExists(requestWithBase.authorization);
    assertExists(requestWithBase.query);
    assertExists(requestWithBase.headers);
    assertExists(requestWithBase.body);
    assertExists(requestWithBase.variables);
    assertExists(requestWithBase.invoke);
  });

  await t.step("requestWithBase.invoke()", async () => {
    const todos = await requestWithBase.invoke();
    assertEquals(todos?.length, 200);
  });

  await t.step("requestWithBase.invoke({ userId: 1 })", async () => {
    const todosQuery = await requestWithBase.invoke({ userId: 1 });
    assertEquals(todosQuery?.length, 20);
  });

  await t.step("requestWithBase.invoke({ completed: false })", async () => {
    const todosQuery = await requestWithBase.invoke({ completed: false });
    assertEquals(todosQuery?.length, 110);
  });
});
