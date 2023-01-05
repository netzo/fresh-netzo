/** @jsx h */
import { h } from "https://esm.sh/preact@10.5.15";
import { renderToString } from "https://esm.sh/preact-render-to-string@5.1.19?deps=preact@10.5.15";
import { TypescriptParser } from "https://esm.sh/typescript-parser@2.6.1";
import { getParams } from "./utils.ts";
import { Options } from "./mod.tsx";

const getMainDeclaration = async (
  parsed: Record<string, any>,
): Promise<Record<string, any> | undefined> => {
  return parsed.declarations.find((d) => d.name === "main");
};

/* see https://docs.windmill.dev/docs/reference#script-parameters-to-json-schema
In Deno:

Deno	JSON Schema
string	string
object	object
boolean	boolean
bigint	int
number	number
string[]	string[]
wmill.Base64	string, encodingFormat: base64
wmill.Email	string, format: email
wmill.Sql	string, format: sql
wmill.Resource<'resource_type'>	object, format: resource-{resource_type}
*/
export const handlerGET = async (
  { request, code, fn }: Options,
): Promise<Response> => {
  const params = await getParams(request);
  const ctx = { request, env: Deno.env.toObject(), params }; // encapsulate in single ctx object
  const body = await fn([...Object.values(params), ctx]);

  const parser = new TypescriptParser();
  const parsed = await parser.parseSource(code);
  const declaration = getMainDeclaration(parsed);

  const page = (
    <div>
      <form
        method="POST"
        action="/"
        style="display: grid; grid-gap: 12px; max-width: fit-content;"
      >
        {declaration?.parameters.map((parameter) => {
          const { name, type, start, end } = parameter;
          switch (type) {
            case "string":
              return <input type="text" name={name} placeholder={name} />;
            case "bigint":
            case "number":
              return <input type="number" name={name} placeholder={name} />;
            case "boolean":
              return <input type="checkbox" name={name} placeholder={name} />;
            default:
              return <textarea name={name} placeholder={name} />;
          }
        })}
        <button type="submit">Submit</button>
      </form>
      <pre>{JSON.stringify(parsed, null, 2)}</pre>
    </div>
  );

  const html = renderToString(page);
  return new Response(html, {
    headers: { "content-type": "text/html" },
  });
};
