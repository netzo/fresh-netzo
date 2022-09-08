import Ajv from "https://cdn.skypack.dev/ajv";
import OAClientError from "../../errors/OAClientError.ts";

const ajv = new Ajv();

export default (schema: any, data: any) => {
  if (!schema) throw new OAClientError(105, { schema });
  const valid = ajv.validate(schema, data);
  if (valid) return;
  throw new OAClientError(103, { ajvError: (ajv.errors as any[])[0], data });
};
