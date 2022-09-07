import validate from "./validate.ts";
import OAClientError from "../../errors/OAClientError.ts";

export default (parameter: any, value: any) => {
  if (!value && !parameter.required) return;
  if (!value && parameter.required) throw new OAClientError(104, { parameter });
  const schema = parameter.schema || parameter.content;
  validate(schema, value);
};
