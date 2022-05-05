import { Callers, ValidationLevel } from "./client/types.ts";

export interface IClientOptions {
  id?: string;
  doc?: any;
  callers?: Callers;
  origin?: string | null;
  validationLevel?: ValidationLevel;
}

export interface IClient {
  getId: () => string;
  getDoc: () => any;
  dereference: (doc: any) => Promise<any>;
  [k: string]: any;
}

export interface INetzoOptions {
  apiKey: string;
  base?: string;
}

export interface INetzo {
  base: string;
  getDocUrlById: (id: string) => string;
  createClient: (options: IClientOptions) => Promise<IClient>;
  // utils:
  getApiKey: () => string;
}
