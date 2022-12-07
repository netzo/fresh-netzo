// import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
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

const REQUEST_WITH_BASEURL: IRequest = {
  "method": "GET",
  "baseURL": "https://jsonplaceholder.typicode.com",
  "url": "/todos",
  "authorization": {
    "type": "none",
  },
  "query": {},
  "headers": {},
  "body": "",
  "variables": {},
};

const REQUEST_WITH_OAUTH2: IRequest = {
  "method": "GET",
  "url": "https://api.petfinder.com/v2/animals",
  "authorization": {
    "type": "oauth2",
    "grantType": "client_credentials",
    headerPrefix: "Bearer",
    "authorizationUri": "https://api.petfinder.com/v2/oauth2/token",
    "clientId": "tKtsbutxQg0h0ExqpVqlCcXc0effHX93uM53XhzlTaP37pdKbX",
    "clientSecret": "CQC9xZ9nxelVSw7JCUeeGltviuNhyVhkzZ49tTHb",
    "scope": "",
  },
  "query": {
    "organization": "RI77",
  },
  "headers": {},
  "body": "",
  "variables": {},
};

Deno.test("netzo.request", async (t) => {
  const netzo = Netzo({ apiKey: "" });
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

  await t.step("request.invoke({ completed: false })", async () => {
    const todosQuery = await request.invoke({ completed: false });
    assertEquals(todosQuery?.length, 110);
  });
});

Deno.test("netzo.requestWithBase", async (t) => {
  const netzo = Netzo({ apiKey: "" });
  const requestWithBase = netzo.request(REQUEST_WITH_BASEURL);

  await t.step("requestWithBase.invoke()", async () => {
    const todos = await requestWithBase.invoke();
    assertEquals(todos?.length, 200);
  });

  await t.step("requestWithBase.invoke({ completed: false })", async () => {
    const todosQuery = await requestWithBase.invoke({ completed: false });
    assertEquals(todosQuery?.length, 110);
  });
});

Deno.test("netzo.requestWithOauth2", async (t) => {
  const netzo = Netzo({ apiKey: "" });
  const requestWithOauth2 = netzo.request(REQUEST_WITH_OAUTH2);

  await t.step("requestWithOauth2.invoke()", async () => {
    const results = await requestWithOauth2.invoke();
    assertExists(results.animals);
  });

  await t.step(
    "requestWithOauth2.invoke({ status: 'adoptable' })",
    async () => {
      const results = await requestWithOauth2.invoke({ status: "adoptable" });
      assertExists(results.animals);
    },
  );
});
