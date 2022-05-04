import { describe, it } from "https://deno.land/std@0.137.0/testing/bdd.ts";
import { assertThrows } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import validateRequest from "./mod.ts";

describe("validateRequest", () => {
  it("throws for invalid path params", () => {
    const validationLevel = "error";
    const routeSpec = {
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "integer" },
        },
      ],
    };
    const pathParams = { id: "20" };
    const queryParams = {};
    const body = undefined;
    const contentType = "application/json";

    assertThrows(
      () =>
        validateRequest(
          validationLevel,
          routeSpec,
          pathParams,
          queryParams,
          body,
          contentType,
        ),
      Error,
      "[oa-client:103]",
    );
  });
  it("throws for invalid query params", () => {
    const validationLevel = "error";
    const routeSpec = {
      parameters: [
        {
          in: "query",
          name: "age",
          required: true,
          schema: { type: "integer" },
        },
      ],
    };
    const pathParams = {};
    const queryParams = { age: 20.5 };
    const body = undefined;
    const contentType = "application/json";

    assertThrows(
      () =>
        validateRequest(
          validationLevel,
          routeSpec,
          pathParams,
          queryParams,
          body,
          contentType,
        ),
      Error,
      "[oa-client:103]",
    );
  });
  it("throws for invalid body", () => {
    const validationLevel = "error";
    const routeSpec = {
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "integer" },
          },
        },
      },
    };
    const pathParams = {};
    const queryParams = {};
    const body = "hello";
    const contentType = "application/json";

    assertThrows(
      () =>
        validateRequest(
          validationLevel,
          routeSpec,
          pathParams,
          queryParams,
          body,
          contentType,
        ),
      Error,
      "[oa-client:103]",
    );
  });
  it("does not throw for valid all", () => {
    const validationLevel = "error";
    const routeSpec = {
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "integer" },
        },
        {
          in: "query",
          name: "age",
          required: true,
          schema: { type: "integer" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "integer" },
          },
        },
      },
    };
    const pathParams = { id: 20 };
    const queryParams = { age: 30 };
    const body = 40;
    const contentType = "application/json";

    // FIXME:how do we implement .not.toThrow() in Deno?
    // assertThrows(() =>
    //   validateRequest(
    //     validationLevel,
    //     routeSpec,
    //     pathParams,
    //     queryParams,
    //     body,
    //     contentType,
    //   )
    // ).not.toThrow();
  });
});
