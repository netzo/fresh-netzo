import { Callers, ValidationLevel } from "./client/types.ts";

export interface IClientOptions {
  id?: string;
  doc?: any;
  // createClient:
  callers?: Callers;
  origin?: string | null;
  validationLevel?: ValidationLevel;
}

export interface IClient {
  getUrl: () => string;
  getDoc: () => any;
  [k: string]: any;
}

export interface INetzoOptions {
  apiKey: string;
  apiUrl?: string;
}

export interface INetzo {
  createClient: (options: IClientOptions) => Promise<IClient>;
  // utils:
  getApiKey: () => string;
}
