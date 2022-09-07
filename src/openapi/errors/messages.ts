type Messages = Record<number, (data: any) => string>;

const messages: Messages = {
  0: ({ test }) => `Test is equal to ${test}`,
  1: ({ path }) =>
    `The path ${path} does not specify a route type. Make sure your OpenAPI spec have a .paths['${path}']['x-type'] key.`,
  2: ({ type, callers }) =>
    `No caller of type ${type}, only found ${
      Object.keys(callers)
    }. Make sure your caller object has a ${type} key.`,
  3: () =>
    "No origin nor server URL specified. Call createClient with an origin argument, or specify .servers[0].url in your OpenAPI spec.",
  101: () => "No body passed, but the route requires one.",
  102: ({ contentType, requestBody }) =>
    `Route does not handle content type ${contentType}, only one of ${
      Object.keys(requestBody.content)
    }`,
  103: ({ ajvError, data }) =>
    [
      `Data does not pass validation: data${ajvError.dataPath} ${ajvError.message}`,
      `schema path: ${ajvError.schemaPath}`,
      `params: ${JSON.stringify(ajvError.params)}`,
      `data: ${JSON.stringify(data)}`,
    ].join("\n"),
  104: ({ parameter }) => `${parameter.name} is required.`,
  105: ({ schema }) =>
    `Expected a schema, got ${schema}. Please check your spec.`,
};

export default messages;
