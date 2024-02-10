// deno-lint-ignore-file no-explicit-any
// adapted from  @feathersjs/errors

export interface NetzoErrorJSON {
  name: string;
  message: string;
  code: number;
  className: string;
  data?: any;
  errors?: any;
}

export type DynamicError = Error & { [key: string]: any };
export type ErrorMessage =
  | null
  | string
  | DynamicError
  | { [key: string]: any }
  | any[];

interface ErrorProperties extends Omit<NetzoErrorJSON, "message"> {
  type: string;
}

export class NetzoError extends Error {
  readonly type!: string;
  readonly code!: number;
  readonly className!: string;
  readonly data: any;
  readonly errors: any;

  constructor(
    err: ErrorMessage | undefined,
    name: string,
    code: number,
    className: string,
    _data: any,
  ) {
    let msg = typeof err === "string" ? err : "Error";
    const properties: ErrorProperties = {
      name,
      code,
      className,
      type: "NetzoError",
    };

    if (Array.isArray(_data)) {
      properties.data = _data;
    } else if (typeof err === "object" || _data !== undefined) {
      const { message, errors, ...rest } =
        err !== null && typeof err === "object" ? err : _data;

      msg = message || msg;
      properties.errors = errors;
      properties.data = rest;
    }

    super(msg);
    Object.assign(this, properties);
  }

  toJSON() {
    const result: NetzoErrorJSON = {
      name: this.name,
      message: this.message,
      code: this.code,
      className: this.className,
    };

    if (this.data !== undefined) {
      result.data = this.data;
    }

    if (this.errors !== undefined) {
      result.errors = this.errors;
    }

    return result;
  }
}

export class BadRequest extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "BadRequest", 400, "bad-request", data);
  }
}

// 401 - Not Authenticated
export class NotAuthenticated extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "NotAuthenticated", 401, "not-authenticated", data);
  }
}

// 402 - Payment Error
export class PaymentError extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "PaymentError", 402, "payment-error", data);
  }
}

// 403 - Forbidden
export class Forbidden extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "Forbidden", 403, "forbidden", data);
  }
}

// 404 - Not Found
export class NotFound extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "NotFound", 404, "not-found", data);
  }
}

// 405 - Method Not Allowed
export class MethodNotAllowed extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "MethodNotAllowed", 405, "method-not-allowed", data);
  }
}

// 406 - Not Acceptable
export class NotAcceptable extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "NotAcceptable", 406, "not-acceptable", data);
  }
}

// 408 - Timeout
export class Timeout extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "Timeout", 408, "timeout", data);
  }
}

// 409 - Conflict
export class Conflict extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "Conflict", 409, "conflict", data);
  }
}

// 410 - Gone
export class Gone extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "Gone", 410, "gone", data);
  }
}

// 411 - Length Required
export class LengthRequired extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "LengthRequired", 411, "length-required", data);
  }
}

// 422 Unprocessable
export class Unprocessable extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "Unprocessable", 422, "unprocessable", data);
  }
}

// 429 Too Many Requests
export class TooManyRequests extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "TooManyRequests", 429, "too-many-requests", data);
  }
}

// 500 - General Error
export class GeneralError extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "GeneralError", 500, "general-error", data);
  }
}

// 501 - Not Implemented
export class NotImplemented extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "NotImplemented", 501, "not-implemented", data);
  }
}

// 502 - Bad Gateway
export class BadGateway extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "BadGateway", 502, "bad-gateway", data);
  }
}

// 503 - Unavailable
export class Unavailable extends NetzoError {
  constructor(message?: ErrorMessage, data?: any) {
    super(message, "Unavailable", 503, "unavailable", data);
  }
}

export interface Errors {
  NetzoError: NetzoError;
  BadRequest: BadRequest;
  NotAuthenticated: NotAuthenticated;
  PaymentError: PaymentError;
  Forbidden: Forbidden;
  NotFound: NotFound;
  MethodNotAllowed: MethodNotAllowed;
  NotAcceptable: NotAcceptable;
  Timeout: Timeout;
  Conflict: Conflict;
  LengthRequired: LengthRequired;
  Unprocessable: Unprocessable;
  TooManyRequests: TooManyRequests;
  GeneralError: GeneralError;
  NotImplemented: NotImplemented;
  BadGateway: BadGateway;
  Unavailable: Unavailable;
  400: BadRequest;
  401: NotAuthenticated;
  402: PaymentError;
  403: Forbidden;
  404: NotFound;
  405: MethodNotAllowed;
  406: NotAcceptable;
  408: Timeout;
  409: Conflict;
  411: LengthRequired;
  422: Unprocessable;
  429: TooManyRequests;
  500: GeneralError;
  501: NotImplemented;
  502: BadGateway;
  503: Unavailable;
}

export const errors = {
  NetzoError,
  BadRequest,
  NotAuthenticated,
  PaymentError,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  NotAcceptable,
  Timeout,
  Conflict,
  LengthRequired,
  Unprocessable,
  TooManyRequests,
  GeneralError,
  NotImplemented,
  BadGateway,
  Unavailable,
  400: BadRequest,
  401: NotAuthenticated,
  402: PaymentError,
  403: Forbidden,
  404: NotFound,
  405: MethodNotAllowed,
  406: NotAcceptable,
  408: Timeout,
  409: Conflict,
  410: Gone,
  411: LengthRequired,
  422: Unprocessable,
  429: TooManyRequests,
  500: GeneralError,
  501: NotImplemented,
  502: BadGateway,
  503: Unavailable,
};

export function convert(error: any) {
  if (!error) {
    return error;
  }

  const NetzoError = (errors as any)[error.name];
  const result = NetzoError
    ? new NetzoError(error.message, error.data)
    : new Error(error.message || error);

  if (typeof error === "object") {
    Object.assign(result, error);
  }

  return result;
}
