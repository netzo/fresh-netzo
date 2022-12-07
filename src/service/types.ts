import { ClientBuilder } from "../client/types.ts";
import { IRequest } from "../request/types.ts";

export interface IService {
  _id: string;
  _type: "service";
  workspaceId: string;
  access: { level: "private" | "public" };
  item: {
    uid: string;
    version: string;
    _type: "item";
  };
  name: string;
  description: string;
  labels: string[];
  stars: number;
  display: { imageUrl: string };
  base: IRequest;
  updatedAt: string;
  createdAt: string;
}

export interface ServiceClient {
  client: ClientBuilder;
  item: IService;
}
