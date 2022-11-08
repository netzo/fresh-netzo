import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from "../../mod.ts";
import { IService } from "./types.ts";

const { API_KEY } = config();

const SERVICE: IService = {
  "_id": "63691099f51b1100ea1148d6",
  "_type": "service",
  "workspaceId": "62b451dcebcf605330f2f98a",
  "access": {
    "level": "private",
  },
  "item": {
    "_type": "item",
    "version": "1.0.0",
  },
  "name": "TESTING",
  "description": "",
  "labels": [],
  "stars": 0,
  "display": {
    "imageUrl": "",
  },
  "base": {
    "baseURL": "https://jsonplaceholder.typicode.com",
    "authorization": {
      "type": "none",
    },
    "hooks":
      "export default {\n  onRequest: async ({ request, options }) => {},\n  onRequestError: async ({ request, options, error }) => {},\n  onResponse: async ({ request, options, response }) => {},\n  onResponseError: async ({ request, options, response }) => {},\n}",
    "_id": "63691099f51b1100ea1148d5",
  },
  "updatedAt": "2022-11-07T23:05:16.831Z",
  "createdAt": "2022-11-07T14:05:13.501Z",
  "__v": 0,
  "requests": [
    {
      "_id": "63698f423f2913b9999c1c2b",
      "workspaceId": "62b451dcebcf605330f2f98a",
      "access": {
        "level": "private",
      },
      "_type": "request",
      "name": "getAllTodos",
      "description": "",
      "method": "GET",
      "url": "/todos",
      "authorization": {
        "type": "none",
      },
      "body": "",
      "hooks":
        "export default {\n  onRequest: async ({ request, options }) => {},\n  onRequestError: async ({ request, options, error }) => {},\n  onResponse: async ({ request, options, response }) => {},\n  onResponseError: async ({ request, options, response }) => {},\n}",
      "ref": {
        "_id": "63691099f51b1100ea1148d6",
        "_type": "service",
      },
      "updatedAt": "2022-11-07T23:06:36.911Z",
      "createdAt": "2022-11-07T23:05:38.852Z",
      "params": {},
      "headers": {},
      "variables": {},
      "__v": 0,
    },
    {
      "_id": "63698f5a3f2913b9999c1da0",
      "workspaceId": "62b451dcebcf605330f2f98a",
      "access": {
        "level": "private",
      },
      "_type": "request",
      "name": "getFirstTodo",
      "description": "",
      "method": "GET",
      "url": "/todos",
      "authorization": {
        "type": "none",
      },
      "body": "",
      "hooks":
        "export default {\n  onRequest: async ({ request, options }) => {},\n  onRequestError: async ({ request, options, error }) => {},\n  onResponse: async ({ request, options, response }) => {\n    response._data = response._data[0]\n  },\n  onResponseError: async ({ request, options, response }) => {},\n}",
      "ref": {
        "_id": "63691099f51b1100ea1148d6",
        "_type": "service",
      },
      "updatedAt": "2022-11-07T23:07:13.454Z",
      "createdAt": "2022-11-07T23:06:02.018Z",
      "params": {},
      "headers": {},
      "variables": {},
      "__v": 0,
    },
  ],
};

Deno.test("netzo.service", { ignore: !API_KEY }, async (t) => {
  const netzo = Netzo({ apiKey: API_KEY });
  const service = await netzo.service(SERVICE);

  await t.step("service", () => {
    assertExists(service);
    assertExists(service.client);
    assertExists(service.requests);
    assertExists(service.item);
    assertEquals(service.item._id, "63691099f51b1100ea1148d6");
  });

  await t.step("service.client.todos.get()", async () => {
    const todos = await service.client.todos.get();
    assertEquals(todos?.length, 200);
  });

  await t.step("service.client.todos.get({ userId: 1 })", async () => {
    const todosQuery = await service.client.todos.get({ userId: 1 });
    assertEquals(todosQuery?.length, 20);
  });

  await t.step("service.client.todos[1].get()", async () => {
    const todo = await service.client.todos[1].get();
    assertEquals(todo?.id, 1);
  });

  await t.step("service.client.todos[1].get({ userId: 1 })", async () => {
    const todoQuery = await service.client.todos[1].get({ userId: 1 });
    assertEquals(todoQuery?.id, 1);
  });

  await t.step("service.client.todos.post()", async () => {
    const todo = await service.client.todos.post({
      userId: 1,
      title: "lorem ipsum",
      completed: true,
    });
    assertExists(todo);
  });

  await t.step("service.client.todos[1].put()", async () => {
    const todo = await service.client.todos[1].put({
      userId: 1,
      id: 1,
      title: "lorem ipsum",
      completed: true,
    });
    assertExists(todo);
  });

  await t.step("service.client.todos[1].patch()", async () => {
    const todo = await service.client.todos[1].patch({ completed: true });
    assertExists(todo);
  });

  await t.step("service.client.todos[1].delete()", async () => {
    const todo = await service.client.todos[1].delete();
    assertExists(todo);
  });

  await t.step("service.requests[0].invoke()", async () => {
    const todos = await service.requests[0].invoke();
    assertEquals(todos?.length, 200);
  });

  await t.step("service.requests.getAllTodos()", async () => {
    const todos = await service.requests.getAllTodos();
    assertEquals(todos?.length, 200);
  });

  await t.step("service.requests[1].invoke()", async () => {
    const todo = await service.requests[1].invoke();
    assertEquals(todo?.id, 1);
  });

  await t.step("service.requests.getFirstTodo()", async () => {
    const todo = await service.requests.getFirstTodo();
    assertEquals(todo?.id, 1);
  });
});
