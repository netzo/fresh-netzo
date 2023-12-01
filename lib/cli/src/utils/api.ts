export type RequestOptions = {
  method?: string;
  body?: unknown;
};

export class APIError extends Error {
  code: string;
  xDenoRay: string | null;

  name = "APIError";

  constructor(code: string, message: string, xDenoRay: string | null) {
    super(message);
    this.code = code;
    this.xDenoRay = xDenoRay;
  }

  toString() {
    let error = `${this.name}: ${this.message}`;
    if (this.xDenoRay !== null) {
      error += `\nx-deno-ray: ${this.xDenoRay}`;
      error += "\nIf you encounter this error frequently," +
        " contact us at help@netzo.io with the above x-deno-ray.";
    }
    return error;
  }
}
