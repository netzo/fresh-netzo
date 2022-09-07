import messages from "./messages.ts";

export default class OAClientError extends Error {
  code: number;

  constructor(code: number, data?: Record<string, any>) {
    super(`[oa-client:${code}] ${messages[code](data)}`);
    this.code = code;
  }
}
