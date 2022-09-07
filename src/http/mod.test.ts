import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { createClientHTTP } from "./mod.ts";

Deno.test("client module", (): void => {
  assertEquals(!!createClientHTTP, true);
});

const options = { baseURL: "https://jsonplaceholder.typicode.com/" }

const client = createClientHTTP(options);

Deno.test("client function", async (): Promise<void> => {
  const data = await client.todos(1).get();
  const todo1 = {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false,
  };
  assertEquals(data, todo1);
});
