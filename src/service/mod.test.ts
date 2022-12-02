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
    "uid": "service-http-jsonplaceholder",
    "version": "1.0.0",
    "_type": "item",
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
  },
  "updatedAt": "2022-11-07T23:05:16.831Z",
  "createdAt": "2022-11-07T14:05:13.501Z",
};

Deno.test("netzo.service", { ignore: !API_KEY }, async (t) => {
  const netzo = Netzo({ apiKey: API_KEY });
  const service = await netzo.service(SERVICE);

  await t.step("service", () => {
    assertExists(service);
    assertExists(service.client);
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
});
