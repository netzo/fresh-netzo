import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import type { Callers } from "./types.ts";
import { createClient } from "./mod.ts";

Deno.test("client module", (): void => {
  assertEquals(!!createClient, true);
});

const doc = {
  "openapi": "3.0.1",
  "info": {
    "title": "JSON Placeholder",
    "description":
      "An interface for the fake online REST API JSON placeholder,\nuseful for testing.\nCurrently incomplete, only GET operations defined for most endpoints.",
    "version": "0.1.0",
  },
  "servers": [
    {
      "url": "https://jsonplaceholder.typicode.com/",
    },
  ],
  "tags": [
    {
      "name": "posts",
    },
    {
      "name": "comments",
    },
    {
      "name": "albums",
    },
    {
      "name": "photos",
    },
    {
      "name": "todos",
    },
    {
      "name": "users",
    },
  ],
  "paths": {
    "/posts": {
      "get": {
        "tags": [
          "posts",
        ],
        "summary": "Get all posts",
        "operationId": "getPosts",
        "parameters": [
          {
            "name": "userId",
            "in": "query",
            "description": "user id to filter by",
            "schema": {
              "type": "integer",
            },
          },
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Post",
                  },
                },
              },
            },
          },
        },
      },
      "post": {
        "tags": [
          "posts",
        ],
        "summary": "Create a new post",
        "operationId": "createPost",
        "requestBody": {
          "description": "new post body",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Post",
              },
            },
          },
          "required": true,
        },
        "responses": {
          "201": {
            "description": "created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Post",
                },
              },
            },
          },
        },
        "x-codegen-request-body-name": "post",
      },
    },
    "/posts/{id}": {
      "get": {
        "tags": [
          "posts",
        ],
        "summary": "Retrieve a specific post",
        "operationId": "getPost",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The id of the post to retrieve",
            "required": true,
            "schema": {
              "type": "integer",
            },
          },
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Post",
                },
              },
            },
          },
          "404": {
            "description": "not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NotFoundError",
                },
              },
            },
          },
        },
      },
      "put": {
        "tags": [
          "posts",
        ],
        "summary": "Update a specific post",
        "operationId": "updatePost",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The id of the post to update",
            "required": true,
            "schema": {
              "type": "integer",
            },
          },
        ],
        "requestBody": {
          "description": "new post body",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Post",
              },
            },
          },
          "required": true,
        },
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Post",
                },
              },
            },
          },
          "404": {
            "description": "not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NotFoundError",
                },
              },
            },
          },
        },
        "x-codegen-request-body-name": "post",
      },
      "delete": {
        "tags": [
          "posts",
        ],
        "summary": "Delete a specific post",
        "operationId": "deletePost",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The id of the post to delete",
            "required": true,
            "schema": {
              "type": "integer",
            },
          },
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {},
          },
          "404": {
            "description": "not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NotFoundError",
                },
              },
            },
          },
        },
      },
      "patch": {
        "tags": [
          "posts",
        ],
        "summary": "Partially update a specific post",
        "operationId": "patchPost",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The id of the post to update",
            "required": true,
            "schema": {
              "type": "integer",
            },
          },
        ],
        "requestBody": {
          "description": "new post body",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Post",
              },
            },
          },
          "required": true,
        },
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Post",
                },
              },
            },
          },
          "404": {
            "description": "not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NotFoundError",
                },
              },
            },
          },
        },
        "x-codegen-request-body-name": "post",
      },
    },
    "/posts/{id}/comments": {
      "get": {
        "tags": [
          "posts",
        ],
        "summary": "Get comments for a specific post",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "the post id",
            "required": true,
            "schema": {
              "type": "integer",
            },
          },
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Comment",
                  },
                },
              },
            },
          },
          "404": {
            "description": "not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NotFoundError",
                },
              },
            },
          },
        },
      },
    },
    "/comments": {
      "get": {
        "tags": [
          "comments",
        ],
        "summary": "Get all available comments",
        "operationId": "getComments",
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "description": "Filter by comment ID",
            "schema": {
              "type": "integer",
            },
          },
          {
            "name": "postId",
            "in": "query",
            "description": "Filter by post ID",
            "schema": {
              "type": "integer",
            },
          },
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Comment",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/comments/{id}": {
      "get": {
        "tags": [
          "comments",
        ],
        "summary": "Get specific comment",
        "operationId": "getComment",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the comment to retrieve",
            "required": true,
            "schema": {
              "type": "integer",
            },
          },
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Comment",
                },
              },
            },
          },
          "404": {
            "description": "not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NotFoundError",
                },
              },
            },
          },
        },
      },
    },
    "/albums": {
      "get": {
        "tags": [
          "albums",
        ],
        "summary": "Get all available albums",
        "operationId": "getAlbums",
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "description": "Filter by album ID",
            "schema": {
              "type": "integer",
            },
          },
          {
            "name": "userId",
            "in": "query",
            "description": "Filter by user ID",
            "schema": {
              "type": "integer",
            },
          },
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Album",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/albums/{id}": {
      "get": {
        "tags": [
          "albums",
        ],
        "summary": "Get specific album",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the album to retrieve",
            "required": true,
            "schema": {
              "type": "integer",
            },
          },
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Album",
                },
              },
            },
          },
          "404": {
            "description": "not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NotFoundError",
                },
              },
            },
          },
        },
      },
    },
    "/albums/{id}/photos": {
      "get": {
        "tags": [
          "albums",
        ],
        "summary": "Get photos for a specific album",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "post id",
            "required": true,
            "schema": {
              "type": "integer",
            },
          },
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Photo",
                  },
                },
              },
            },
          },
          "404": {
            "description": "not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NotFoundError",
                },
              },
            },
          },
        },
      },
    },
    "/photos": {
      "get": {
        "tags": [
          "photos",
        ],
        "summary": "Get all available photos",
        "operationId": "getPhotos",
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "description": "Filter by photo ID",
            "schema": {
              "type": "integer",
            },
          },
          {
            "name": "albumId",
            "in": "query",
            "description": "Filter by album ID",
            "schema": {
              "type": "integer",
            },
          },
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Photo",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/photos/{id}": {
      "get": {
        "tags": [
          "photos",
        ],
        "summary": "Get specific photo",
        "operationId": "getPhoto",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the photo to retrieve",
            "required": true,
            "schema": {
              "type": "integer",
            },
          },
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Photo",
                },
              },
            },
          },
          "404": {
            "description": "not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NotFoundError",
                },
              },
            },
          },
        },
      },
    },
    "/todos": {
      "get": {
        "tags": [
          "todos",
        ],
        "summary": "Get all available todos",
        "operationId": "getTodos",
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "description": "Filter by todo ID",
            "schema": {
              "type": "integer",
            },
          },
          {
            "name": "userId",
            "in": "query",
            "description": "Filter by user ID",
            "schema": {
              "type": "integer",
            },
          },
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Todo",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/todos/{id}": {
      "get": {
        "tags": [
          "todos",
        ],
        "summary": "Get specific todo",
        "operationId": "getTodo",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the todo to retrieve",
            "required": true,
            "schema": {
              "type": "integer",
            },
          },
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Todo",
                },
              },
            },
          },
          "404": {
            "description": "not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NotFoundError",
                },
              },
            },
          },
        },
      },
    },
    "/users": {
      "get": {
        "tags": [
          "users",
        ],
        "summary": "Get all available users",
        "operationId": "getUsers",
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "description": "Filter by user ID",
            "schema": {
              "type": "integer",
            },
          },
          {
            "name": "email",
            "in": "query",
            "description": "Filter by user email address",
            "schema": {
              "type": "integer",
            },
          },
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/users/{id}": {
      "get": {
        "tags": [
          "users",
        ],
        "summary": "Get specific user",
        "operationId": "getUser",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the user to retrieve",
            "required": true,
            "schema": {
              "type": "integer",
            },
          },
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User",
                },
              },
            },
          },
          "404": {
            "description": "not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NotFoundError",
                },
              },
            },
          },
        },
      },
    },
  },
  "components": {
    "schemas": {
      "Post": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64",
          },
          "userId": {
            "type": "integer",
            "format": "int64",
          },
          "title": {
            "type": "string",
          },
          "body": {
            "type": "string",
          },
        },
      },
      "Comment": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64",
          },
          "postId": {
            "type": "integer",
            "format": "int64",
          },
          "name": {
            "type": "string",
          },
          "email": {
            "type": "string",
            "format": "email",
          },
          "body": {
            "type": "string",
          },
        },
      },
      "Album": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64",
          },
          "userId": {
            "type": "integer",
            "format": "int64",
          },
          "title": {
            "type": "string",
          },
        },
      },
      "Photo": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64",
          },
          "albumId": {
            "type": "integer",
            "format": "int64",
          },
          "title": {
            "type": "string",
          },
          "url": {
            "type": "string",
            "format": "uri",
          },
          "thumbnailUrl": {
            "type": "string",
            "format": "uri",
          },
        },
      },
      "Todo": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64",
          },
          "userId": {
            "type": "integer",
            "format": "int64",
          },
          "title": {
            "type": "string",
          },
          "completed": {
            "type": "boolean",
          },
        },
      },
      "User": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64",
          },
          "name": {
            "type": "string",
          },
          "username": {
            "type": "string",
          },
          "email": {
            "type": "string",
            "format": "email",
          },
          "phone": {
            "type": "string",
          },
          "website": {
            "type": "string",
          },
          "company": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
              },
              "catchPhrase": {
                "type": "string",
              },
              "bs": {
                "type": "string",
              },
            },
          },
          "address": {
            "type": "object",
            "properties": {
              "street": {
                "type": "string",
              },
              "suite": {
                "type": "string",
              },
              "city": {
                "type": "string",
              },
              "zipcode": {
                "type": "string",
              },
              "geo": {
                "type": "object",
                "properties": {
                  "lat": {
                    "type": "string",
                  },
                  "lng": {
                    "type": "string",
                  },
                },
              },
            },
          },
        },
      },
      "NotFoundError": {
        "type": "object",
        "description": "resource not found",
      },
    },
  },
};

const callers: Callers = {
  get: async (url) => {
    const resp = await fetch(url);
    const json = await resp.json();
    return json;
  },
};

const client = createClient(doc, callers);

Deno.test("client function", async (): Promise<void> => {
  const data = await client["/todos/{id}"].get({ pathParams: { id: 1 } });
  const todo1 = {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false,
  };
  assertEquals(data, todo1);
});
