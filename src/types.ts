import { Callers, ValidationLevel } from "./client/types.ts";

export interface IServiceOptions {
  id?: string;
  doc?: any;
  // createClient:
  callers?: Callers;
  origin?: string | null;
  validationLevel?: ValidationLevel;
}

export interface IService {
  getUrl: () => string;
  getDoc: () => any;
  [k: string]: any;
}

export interface INetzoOptions {
  apiKey: string;
  apiUrl?: string;
}

export interface INetzo {
  createClient: (options: IServiceOptions) => Promise<IService>;
  // utils:
  getApiKey: () => string;
}
