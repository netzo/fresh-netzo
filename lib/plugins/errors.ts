const errors: Record<string, { status: number; message: string }> = {
  BadRequest: { status: 400, message: "Bad Request" },
  Unauthorized: { status: 401, message: "Unauthorized" },
  PaymentRequired: { status: 402, message: "Payment Required" },
  Forbidden: { status: 403, message: "Forbidden" },
  NotFound: { status: 404, message: "Not Found" },
  MethodNotAllowed: { status: 405, message: "Method Not Allowed" },
  InternalServerError: { status: 500, message: "Internal Server Error" },
  NotImplemented: { status: 501, message: "Not Implemented" },
  BadGateway: { status: 502, message: "Bad Gateway" },
  ServiceUnavailable: { status: 503, message: "Service Unavailable" },
};

export class ResponseError extends Error {
  errorName: keyof typeof errors;
  status: number;
  message: string;

  constructor(errorName: keyof typeof errors, message?: string) {
    const errorDefaults = errors[errorName];
    if (!errorDefaults) {
      throw new Error(`Unknown error name: ${errorName}`);
    }

    super(message || errorDefaults.message);
    this.name = "ResponseError";
    this.errorName = errorName;
    this.status = errorDefaults.status;
    this.message = message || errorDefaults.message;
    Object.setPrototypeOf(this, ResponseError.prototype); // set prototype explicitly
  }

  toResponse(): Response {
    return new Response(`${this.errorName}: ${this.message}`, {
      status: this.status,
      statusText: this.message,
    });
  }
}
