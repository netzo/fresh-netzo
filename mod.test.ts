import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Netzo } from "./mod.ts";
// TRYME: import { Netzo } from 'https://deno.land/x/netzo@v0.1.0/mod.ts'

const apiKey = "e6f2271907f1c46d48f4d0af1929df56c91dd18eb445465cf6042a63e1930669";
const id = "61ec965dfe5f8df0e8e50bcd";
const doc = {
  "openapi": "3.0.3",
  "info": {
    "title": "Smart-Coffee-Machine",
    "version": "unknown",
    "description":
      "A smart coffee machine with a range of capabilities.\nA complementary tutorial is available at http://www.thingweb.io/smart-coffee-machine.html.",
    "contact": {
      "x-uri": "git://github.com/eclipse/thingweb.node-wot.git",
    },
    "x-@context": [
      "https://www.w3.org/2019/wot/td/v1",
      {
        "@language": "en",
      },
    ],
    "x-@type": "Thing",
    "x-id": "61ec965dfe5f8df0e8e50bcd",
  },
  "paths": {
    "/properties/allAvailableResources": {
      "get": {
        "responses": {
          "200": {
            "description": "default success response",
            "content": {
              "application/json": {
                "schema": {
                  "readOnly": true,
                  "writeOnly": false,
                  "properties": {
                    "water": {
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 100,
                    },
                    "milk": {
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 100,
                    },
                    "chocolate": {
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 100,
                    },
                    "coffeeBeans": {
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 100,
                    },
                  },
                  "type": "object",
                },
                "example": {
                  "chocolate": 2,
                  "water": 42,
                  "coffeeBeans": 15,
                  "milk": 66,
                  "sunt25e": -76367769,
                },
              },
            },
          },
          "default": {
            "description": "some error",
            "content": {
              "application/json": {},
            },
          },
        },
        "tags": [
          "properties",
        ],
        "description":
          "Current level of all available resources given as an integer percentage for each particular resource.\nThe data is obtained from the machine's sensors but can be set manually via the availableResourceLevel property in case the sensors are broken.\nop:readproperty",
        "summary": "allAvailableResources",
        "parameters": [
          {
            "name": "q",
            "in": "query",
            "description":
              "A JSONata expression to query or transform response data",
            "required": false,
            "allowEmptyValue": true,
            "schema": {
              "type": "string",
              "title": "Query",
              "description":
                "A JSONata expression to query or transform response data",
              "default": "",
            },
          },
        ],
      },
    },
    "/properties/availableResourceLevel{?id}": {
      "get": {
        "responses": {
          "200": {
            "description": "default success response",
            "content": {
              "application/json": {
                "schema": {
                  "readOnly": false,
                  "writeOnly": false,
                  "type": "number",
                },
                "example": -89198210.18942456,
              },
            },
          },
          "default": {
            "description": "some error",
            "content": {
              "application/json": {},
            },
          },
        },
        "tags": [
          "properties",
        ],
        "description":
          "Current level of a particular resource. Requires resource id variable as uriVariables.\nThe property can also be overridden, which also requires resource id as uriVariables.\nop:readproperty, writeproperty",
        "summary": "availableResourceLevel",
        "parameters": [
          {
            "schema": {
              "enum": [
                "water",
                "milk",
                "chocolate",
                "coffeeBeans",
              ],
              "type": "string",
            },
            "example": "chocolate",
            "name": "id",
            "in": "query",
          },
          {
            "name": "q",
            "in": "query",
            "description":
              "A JSONata expression to query or transform response data",
            "required": false,
            "allowEmptyValue": true,
            "schema": {
              "type": "string",
              "title": "Query",
              "description":
                "A JSONata expression to query or transform response data",
              "default": "",
            },
          },
        ],
      },
      "put": {
        "responses": {
          "200": {
            "description": "default success response",
            "content": {
              "application/json": {
                "schema": {
                  "readOnly": false,
                  "writeOnly": false,
                  "type": "number",
                },
                "example": -89198210.18942456,
              },
            },
          },
          "default": {
            "description": "some error",
            "content": {
              "application/json": {},
            },
          },
        },
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "readOnly": false,
                "writeOnly": false,
                "type": "number",
              },
              "example": 91418284.44790292,
            },
          },
        },
        "tags": [
          "properties",
        ],
        "description":
          "Current level of a particular resource. Requires resource id variable as uriVariables.\nThe property can also be overridden, which also requires resource id as uriVariables.\nop:readproperty, writeproperty",
        "summary": "availableResourceLevel",
        "parameters": [
          {
            "schema": {
              "enum": [
                "water",
                "milk",
                "chocolate",
                "coffeeBeans",
              ],
              "type": "string",
            },
            "example": "chocolate",
            "name": "id",
            "in": "query",
          },
        ],
      },
    },
    "/properties/possibleDrinks": {
      "get": {
        "responses": {
          "200": {
            "description": "default success response",
            "content": {
              "application/json": {
                "schema": {
                  "readOnly": true,
                  "writeOnly": false,
                  "items": {
                    "type": "string",
                  },
                  "type": "array",
                },
                "example": [
                  "sint",
                ],
              },
            },
          },
          "default": {
            "description": "some error",
            "content": {
              "application/json": {},
            },
          },
        },
        "tags": [
          "properties",
        ],
        "description":
          "The list of possible drinks in general. Doesn't depend on the available resources.\nop:readproperty",
        "summary": "possibleDrinks",
        "parameters": [
          {
            "name": "q",
            "in": "query",
            "description":
              "A JSONata expression to query or transform response data",
            "required": false,
            "allowEmptyValue": true,
            "schema": {
              "type": "string",
              "title": "Query",
              "description":
                "A JSONata expression to query or transform response data",
              "default": "",
            },
          },
        ],
      },
    },
    "/properties/servedCounter": {
      "get": {
        "responses": {
          "200": {
            "description": "default success response",
            "content": {
              "application/json": {
                "schema": {
                  "readOnly": false,
                  "writeOnly": false,
                  "minimum": 0,
                  "type": "integer",
                },
                "example": 61296546,
              },
            },
          },
          "default": {
            "description": "some error",
            "content": {
              "application/json": {},
            },
          },
        },
        "tags": [
          "properties",
        ],
        "description":
          "The total number of served beverages.\nop:readproperty, writeproperty",
        "summary": "servedCounter",
        "parameters": [
          {
            "name": "q",
            "in": "query",
            "description":
              "A JSONata expression to query or transform response data",
            "required": false,
            "allowEmptyValue": true,
            "schema": {
              "type": "string",
              "title": "Query",
              "description":
                "A JSONata expression to query or transform response data",
              "default": "",
            },
          },
        ],
      },
      "put": {
        "responses": {
          "200": {
            "description": "default success response",
            "content": {
              "application/json": {
                "schema": {
                  "readOnly": false,
                  "writeOnly": false,
                  "minimum": 0,
                  "type": "integer",
                },
                "example": 61296546,
              },
            },
          },
          "default": {
            "description": "some error",
            "content": {
              "application/json": {},
            },
          },
        },
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "readOnly": false,
                "writeOnly": false,
                "minimum": 0,
                "type": "integer",
              },
              "example": 86039172,
            },
          },
        },
        "tags": [
          "properties",
        ],
        "description":
          "The total number of served beverages.\nop:readproperty, writeproperty",
        "summary": "servedCounter",
      },
    },
    "/properties/maintenanceNeeded": {
      "get": {
        "responses": {
          "200": {
            "description": "default success response",
            "content": {
              "application/json": {
                "schema": {
                  "readOnly": false,
                  "writeOnly": false,
                  "type": "boolean",
                },
                "example": false,
              },
            },
          },
          "default": {
            "description": "some error",
            "content": {
              "application/json": {},
            },
          },
        },
        "tags": [
          "properties",
        ],
        "description":
          "Shows whether a maintenance is needed. The property is observable. Automatically set to true when the servedCounter property exceeds 1000.\nop:readproperty, writeproperty",
        "summary": "maintenanceNeeded",
        "parameters": [
          {
            "name": "q",
            "in": "query",
            "description":
              "A JSONata expression to query or transform response data",
            "required": false,
            "allowEmptyValue": true,
            "schema": {
              "type": "string",
              "title": "Query",
              "description":
                "A JSONata expression to query or transform response data",
              "default": "",
            },
          },
        ],
      },
      "put": {
        "responses": {
          "200": {
            "description": "default success response",
            "content": {
              "application/json": {
                "schema": {
                  "readOnly": false,
                  "writeOnly": false,
                  "type": "boolean",
                },
                "example": false,
              },
            },
          },
          "default": {
            "description": "some error",
            "content": {
              "application/json": {},
            },
          },
        },
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "readOnly": false,
                "writeOnly": false,
                "type": "boolean",
              },
              "example": true,
            },
          },
        },
        "tags": [
          "properties",
        ],
        "description":
          "Shows whether a maintenance is needed. The property is observable. Automatically set to true when the servedCounter property exceeds 1000.\nop:readproperty, writeproperty",
        "summary": "maintenanceNeeded",
      },
    },
    "/properties/maintenanceNeeded/observable": {
      "get": {
        "responses": {
          "200": {
            "description": "default success response",
            "content": {
              "application/json": {
                "schema": {
                  "readOnly": false,
                  "writeOnly": false,
                  "type": "boolean",
                },
                "example": false,
              },
            },
          },
          "default": {
            "description": "some error",
            "content": {
              "application/json": {},
            },
          },
        },
        "tags": [
          "properties",
        ],
        "description":
          "Shows whether a maintenance is needed. The property is observable. Automatically set to true when the servedCounter property exceeds 1000.\nop:readproperty, writepropertyop:observeproperty, unobserveproperty",
        "summary": "maintenanceNeeded",
        "parameters": [
          {
            "name": "q",
            "in": "query",
            "description":
              "A JSONata expression to query or transform response data",
            "required": false,
            "allowEmptyValue": true,
            "schema": {
              "type": "string",
              "title": "Query",
              "description":
                "A JSONata expression to query or transform response data",
              "default": "",
            },
          },
        ],
      },
    },
    "/properties/schedules": {
      "get": {
        "responses": {
          "200": {
            "description": "default success response",
            "content": {
              "application/json": {
                "schema": {
                  "readOnly": true,
                  "writeOnly": false,
                  "items": {
                    "type": "object",
                    "properties": {
                      "drinkId": {
                        "type": "string",
                        "description":
                          "Defines what drink to make, drinkId is one of possibleDrinks property values, e.g. latte.",
                      },
                      "size": {
                        "type": "string",
                        "description":
                          "Defines the size of a drink, s = small, m = medium, l = large.",
                        "enum": [
                          "s",
                          "m",
                          "l",
                        ],
                      },
                      "quantity": {
                        "type": "integer",
                        "description":
                          "Defines how many drinks to make, ranging from 1 to 5.",
                        "minimum": 1,
                        "maximum": 5,
                      },
                      "time": {
                        "type": "string",
                        "description":
                          "Defines the time of the scheduled task in 24h format, e.g. 10:00 or 21:00.",
                      },
                      "mode": {
                        "type": "string",
                        "description":
                          "Defines the mode of the scheduled task, e.g. once or everyday. All the possible values are given in the enum field of this Thing Description.",
                        "enum": [
                          "once",
                          "everyday",
                          "everyMo",
                          "everyTu",
                          "everyWe",
                          "everyTh",
                          "everyFr",
                          "everySat",
                          "everySun",
                        ],
                      },
                    },
                  },
                  "type": "array",
                },
                "example": [
                  {
                    "size": "s",
                    "mode": "once",
                    "drinkId": "ut cillum ipsum consequat",
                    "time": "esse do eiusmod",
                    "quantity": 3,
                  },
                  {
                    "laborum27": "cupidatat do in laboris velit",
                  },
                  {
                    "size": "m",
                    "time": "est ipsum",
                    "mode": "everyWe",
                  },
                  {
                    "time": "Lorem sed tempor",
                    "mode": "everySat",
                    "size": "s",
                    "drinkId": "culpa est reprehenderit aute adipisicing",
                    "quantity": 2,
                    "in34": "eu cillum",
                  },
                ],
              },
            },
          },
          "default": {
            "description": "some error",
            "content": {
              "application/json": {},
            },
          },
        },
        "tags": [
          "properties",
        ],
        "description": "The list of scheduled tasks.\nop:readproperty",
        "summary": "schedules",
        "parameters": [
          {
            "name": "q",
            "in": "query",
            "description":
              "A JSONata expression to query or transform response data",
            "required": false,
            "allowEmptyValue": true,
            "schema": {
              "type": "string",
              "title": "Query",
              "description":
                "A JSONata expression to query or transform response data",
              "default": "",
            },
          },
        ],
      },
    },
    "/actions/makeDrink{?drinkId,size,quantity}": {
      "post": {
        "responses": {
          "200": {
            "description": "default success response",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "result": {
                      "type": "boolean",
                    },
                    "message": {
                      "type": "string",
                    },
                  },
                  "type": "object",
                },
                "example": {
                  "result": true,
                  "message": "dolore voluptate occaecat",
                  "in_280": "dolore Ut",
                  "incididunt_38": 63490598,
                  "culpa_b6": false,
                  "doloreb3a": -5885763.877516985,
                  "non404": false,
                },
              },
            },
          },
          "default": {
            "description": "some error",
            "content": {
              "application/json": {},
            },
          },
        },
        "requestBody": {
          "content": {
            "application/json": {},
          },
        },
        "tags": [
          "actions",
        ],
        "description":
          "Make a drink from available list of beverages. Accepts drink id, size and quantity as uriVariables.\nBrews one medium americano if no uriVariables are specified.\nop:invokeaction",
        "summary": "makeDrink",
        "parameters": [
          {
            "description":
              "Defines what drink to make, drinkId is one of possibleDrinks property values, e.g. latte.",
            "schema": {
              "type": "string",
            },
            "example": "esse cillum eu incididunt ut",
            "name": "drinkId",
            "in": "query",
          },
          {
            "description":
              "Defines the size of a drink, s = small, m = medium, l = large.",
            "schema": {
              "enum": [
                "s",
                "m",
                "l",
              ],
              "type": "string",
            },
            "example": "l",
            "name": "size",
            "in": "query",
          },
          {
            "description":
              "Defines how many drinks to make, ranging from 1 to 5.",
            "schema": {
              "minimum": 1,
              "maximum": 5,
              "type": "integer",
            },
            "example": 2,
            "name": "quantity",
            "in": "query",
          },
        ],
      },
    },
    "/actions/setSchedule": {
      "post": {
        "responses": {
          "200": {
            "description": "default success response",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "result": {
                      "type": "boolean",
                    },
                    "message": {
                      "type": "string",
                    },
                  },
                  "type": "object",
                },
                "example": {
                  "message": "qui Ut tempor nisi exercitation",
                },
              },
            },
          },
          "default": {
            "description": "some error",
            "content": {
              "application/json": {},
            },
          },
        },
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "properties": {
                  "drinkId": {
                    "type": "string",
                    "description":
                      "Defines what drink to make, drinkId is one of possibleDrinks property values, e.g. latte.",
                  },
                  "size": {
                    "type": "string",
                    "description":
                      "Defines the size of a drink, s = small, m = medium, l = large.",
                    "enum": [
                      "s",
                      "m",
                      "l",
                    ],
                  },
                  "quantity": {
                    "type": "integer",
                    "description":
                      "Defines how many drinks to make, ranging from 1 to 5.",
                    "minimum": 1,
                    "maximum": 5,
                  },
                  "time": {
                    "type": "string",
                    "description":
                      "Defines the time of the scheduled task in 24h format, e.g. 10:00 or 21:00.",
                  },
                  "mode": {
                    "type": "string",
                    "description":
                      "Defines the mode of the scheduled task, e.g. once or everyday. All the possible values are given in the enum field of this Thing Description.",
                    "enum": [
                      "once",
                      "everyday",
                      "everyMo",
                      "everyTu",
                      "everyWe",
                      "everyTh",
                      "everyFr",
                      "everySat",
                      "everySun",
                    ],
                  },
                },
                "required": [
                  "time",
                  "mode",
                ],
                "type": "object",
              },
              "example": {
                "time": "sint",
                "mode": "everyTh",
                "quantity": 3,
                "drinkId": "do",
                "size": "s",
              },
            },
          },
        },
        "tags": [
          "actions",
        ],
        "description":
          "Add a scheduled task to the schedules property. Accepts drink id, size, quantity, time and mode as body of a request.\nAssumes one medium americano if not specified, but time and mode are mandatory fields.\nop:invokeaction",
        "summary": "setSchedule",
      },
    },
    "/events/outOfResource": {
      "get": {
        "responses": {
          "200": {
            "description": "default success response",
            "content": {
              "application/json": {},
            },
          },
          "default": {
            "description": "some error",
            "content": {
              "application/json": {},
            },
          },
        },
        "tags": [
          "events",
        ],
        "description":
          "Out of resource event. Emitted when the available resource level is not sufficient for a desired drink.\nop:subscribeevent, unsubscribeevent",
        "summary": "outOfResource",
        "parameters": [
          {
            "name": "q",
            "in": "query",
            "description":
              "A JSONata expression to query or transform response data",
            "required": false,
            "allowEmptyValue": true,
            "schema": {
              "type": "string",
              "title": "Query",
              "description":
                "A JSONata expression to query or transform response data",
              "default": "",
            },
          },
        ],
      },
    },
    "/all/properties": {
      "get": {
        "responses": {
          "200": {
            "description": "default success response",
            "content": {
              "application/json": {},
            },
          },
          "default": {
            "description": "some error",
            "content": {
              "application/json": {},
            },
          },
        },
        "tags": [
          "rootInteractions",
        ],
        "summary":
          "readallproperties, readmultipleproperties, writeallproperties, writemultipleproperties",
        "parameters": [
          {
            "name": "q",
            "in": "query",
            "description":
              "A JSONata expression to query or transform response data",
            "required": false,
            "allowEmptyValue": true,
            "schema": {
              "type": "string",
              "title": "Query",
              "description":
                "A JSONata expression to query or transform response data",
              "default": "",
            },
          },
        ],
      },
      "put": {
        "responses": {
          "200": {
            "description": "default success response",
            "content": {
              "application/json": {},
            },
          },
          "default": {
            "description": "some error",
            "content": {
              "application/json": {},
            },
          },
        },
        "requestBody": {
          "content": {
            "application/json": {},
          },
        },
        "tags": [
          "rootInteractions",
        ],
        "summary":
          "readallproperties, readmultipleproperties, writeallproperties, writemultipleproperties",
      },
    },
  },
  "tags": [
    {
      "name": "properties",
      "description":
        "A property can expose a variable of a Thing, this variable might be readable, writable and/or observable.",
      "externalDocs": {
        "url":
          "https://www.w3.org/TR/wot-thing-description/#propertyaffordance",
        "description": "Find out more about Property Affordances.",
      },
    },
    {
      "name": "actions",
      "description":
        "An action can expose something to be executed by a Thing, an action can be invoked.",
      "externalDocs": {
        "url": "https://www.w3.org/TR/wot-thing-description/#actionaffordance",
        "description": "Find out more about Action Affordances.",
      },
    },
    {
      "name": "events",
      "description":
        "An event can expose a notification by a Thing, this notification can be subscribed and/or unsubscribed.",
      "externalDocs": {
        "url": "https://www.w3.org/TR/wot-thing-description/#eventaffordance",
        "description": "Find out more about Event Affordances.",
      },
    },
    {
      "name": "rootInteractions",
      "description":
        "An interaction that allows interacting with several properties in one request.",
      "externalDocs": {
        "url": "https://www.w3.org/TR/wot-thing-description/#thing",
        "description":
          "Read about the property 'forms' of a Thing to find out more.",
      },
    },
  ],
  "security": [
    {
      "BearerAuth": [],
    },
    {
      "ApiKeyAuth": [],
    },
    {
      "ApiKeyAuthQuery": [],
    },
  ],
  "servers": [
    {
      "url": "https://api.netzo.io/web/61ec965dfe5f8df0e8e50bcd",
    },
  ],
  "components": {
    "securitySchemes": {
      "ApiKeyAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "x-api-key",
      },
      "ApiKeyAuthQuery": {
        "type": "apiKey",
        "in": "query",
        "name": "apiKey",
      },
      "BearerAuth": {
        "type": "http",
        "scheme": "bearer",
      },
    },
  },
};

Deno.test("main entry point", (): void => {
  const netzo = Netzo({ apiKey });
  assertEquals<boolean>(!!netzo, true);
});

Deno.test("create client (by id)", async (): Promise<void> => {
  const netzo = Netzo({ apiKey });
  const client = await netzo.createClient({ id });
  assertEquals<boolean>(!!client, true);
});

Deno.test("client.get() (by id)", async (): Promise<void> => {
  const netzo = Netzo({ apiKey });
  const client = await netzo.createClient({ id });
  const data = await client["/properties/allAvailableResources"].get();
  assertEquals<boolean>(!!data, true);
});

Deno.test("client.get(params) (by id)", async (): Promise<void> => {
  const netzo = Netzo({ apiKey });
  const client = await netzo.createClient({ id });
  const params = { pathParams: {}, queryParams: { q: "milk + water" } };
  const data = await client["/properties/allAvailableResources"].get(params);
  assertEquals<boolean>(!!data, true);
});

Deno.test("create client (by doc)", (): void => {
  const netzo = Netzo({ apiKey });
  const client = netzo.createClient({ doc });
  assertEquals<boolean>(!!client, true);
});

Deno.test("client.get() (by doc)", async (): Promise<void> => {
  const netzo = Netzo({ apiKey });
  const client = await netzo.createClient({ doc });
  const data = await client["/properties/allAvailableResources"].get();
  assertEquals<boolean>(!!data, true);
});

Deno.test("client.get(params) (by doc)", async (): Promise<void> => {
  const netzo = Netzo({ apiKey });
  const client = await netzo.createClient({ doc });
  const params = { pathParams: {}, queryParams: { q: "milk + water" } };
  const data = await client["/properties/allAvailableResources"].get(params);
  assertEquals<boolean>(!!data, true);
});
