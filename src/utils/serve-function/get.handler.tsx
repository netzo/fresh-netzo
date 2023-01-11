/** @jsx h */
import { h } from "https://esm.sh/preact@10.5.15";
import { renderToString } from "https://esm.sh/preact-render-to-string@5.1.19?deps=preact@10.5.15";
import {
  CallableDeclaration,
  Declaration,
  File,
  TypescriptParser,
} from "https://esm.sh/typescript-parser@2.6.1?target=deno";
import { getParams } from "./utils.ts";

const getMainDeclaration = (parsed: File): CallableDeclaration | undefined => {
  return parsed.declarations.find(
    (d: Declaration) => d.name === "main",
  ) as CallableDeclaration | undefined;
};

const getProps = (
  name: string,
  type: string,
  props: Record<string, any>,
): Record<string, any> => {
  switch (type) {
    case "boolean":
      return { name, placeholder: name, checked: props[name] === "true" };
    case "string":
    case "bigint":
    case "number":
    default:
      return { name, placeholder: name, value: props[name] };
  }
};

// see https://docs.windmill.dev/docs/reference#script-parameters-to-json-schema
export const handlerGET = async (
  request: Request,
  url: string,
): Promise<Response> => {
  const params = await getParams(request);
  const code = await Deno.readTextFile(url);
  const parser = new TypescriptParser();
  const file = await parser.parseSource(code);
  const declaration = getMainDeclaration(file);

  const Form = () => (
    <form
      method="post"
      action="/"
      style="display: grid; grid-gap: 12px; max-width: fit-content;"
    >
      {declaration?.parameters?.map((parameter: any) => {
        const { name, type, start, end } = parameter;
        const props = getProps(name, type, params);
        switch (type) {
          case "boolean":
            return <input type="checkbox" {...props} />;
          case "string":
            return <input type="text" {...props} />;
          case "bigint":
          case "number":
            return <input type="number" {...props} />;
          case "array":
          case "object":
          default:
            return <textarea {...props} />;
        }
      })}
      <button type="submit">Submit</button>
    </form>
  );

  const page = (
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height"
        />
        <title>Serve Function | Netzo</title>
      </head>
      <body>
        <Form />
      </body>
    </html>
  );

  const html = renderToString(page);
  return new Response(html, {
    headers: { "content-type": "text/html" },
  });
};
