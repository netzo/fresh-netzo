import {
  DenoProjectDeploymentsResult,
  Manifest,
  TextLineStream,
} from "../../deps.ts";

import type {
  DenoDeploymentProgress,
  DenoLog,
  DenoProjectDeploymentRequestGitHubActions,
  DenoProjectDeploymentRequestPush,
  Project,
} from "../../deps.ts";

export interface RequestOptions {
  method?: string;
  body?: unknown;
}

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

export class DenoAPI {
  #endpoint: string;
  #authorization: string;
  constructor(authorization: string, endpoint: string) {
    this.#authorization = authorization;
    this.#endpoint = endpoint;
  }
  static fromToken(token: string) {
    const endpoint = Deno.env.get("DENO_API_URL") ??
      "https://api.deno.com";
    return new DenoAPI(`Bearer ${token}`, endpoint);
  }
  async #request(path: string, opts: RequestOptions = {}): Promise<Response> {
    const url = `${this.#endpoint}${path}`;
    const method = opts.method ?? "GET";
    const body = opts.body !== undefined
      ? opts.body instanceof FormData ? opts.body : JSON.stringify(opts.body)
      : undefined;
    const headers = {
      "Accept": "application/json",
      "Authorization": this.#authorization,
      ...(opts.body !== undefined
        ? opts.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }
        : {}),
    };
    return await fetch(url, { method, headers, body });
  }
  async #requestJson<T>(path: string, opts?: RequestOptions): Promise<T> {
    const res = await this.#request(path, opts);
    if (res.headers.get("Content-Type") !== "application/json") {
      const text = await res.text();
      throw new Error(`Expected JSON, got '${text}'`);
    }
    const json = await res.json();
    if (res.status !== 200) {
      const xDenoRay = res.headers.get("x-deno-ray");
      throw new APIError(json.code, json.message, xDenoRay);
    }
    return json;
  }

  async *#requestStream<T>(
    path: string,
    opts?: RequestOptions,
  ): AsyncIterable<T> {
    const res = await this.#request(path, opts);
    if (res.status !== 200) {
      const json = await res.json();
      const xDenoRay = res.headers.get("x-deno-ray");
      throw new APIError(json.code, json.message, xDenoRay);
    }
    if (res.body === null) {
      throw new Error("Stream ended unexpectedly");
    }

    const lines = res.body
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(new TextLineStream());
    for await (const line of lines) {
      if (line === "") return;
      yield JSON.parse(line);
    }
  }

  async getProject(uid: string): Promise<Project | null> {
    try {
      return await this.#requestJson(`/projects/${uid}`);
    } catch (err) {
      throw err;
    }
  }

  async getDeployments(uid: string): Promise<DenoProjectDeploymentsResult> {
    try {
      return await this.#requestJson(`/projects/${uid}/deployments`);
    } catch (err) {
      if (err instanceof APIError && err.code === "projectNotFound") {
        return null;
      }
      throw err;
    }
  }

  getLogs(uid: string, deploymentId: string): AsyncIterable<DenoLog> {
    return this.#requestStream(
      `/projects/${uid}/deployments/${deploymentId}/logs/`,
    );
  }

  async projectNegotiateAssets(
    projectUid: string,
    manifest: Manifest,
  ): Promise<string[]> {
    return await this.#requestJson(`/projects/${projectUid}/assets/negotiate`, {
      method: "POST",
      body: manifest,
    });
  }

  pushDeploy(
    uid: string,
    request: DenoProjectDeploymentRequestPush,
    files: Uint8Array[],
  ): AsyncIterable<DenoDeploymentProgress> {
    const form = new FormData();
    form.append("request", JSON.stringify(request));
    for (const bytes of files) {
      form.append("file", new Blob([bytes]));
    }
    return this.#requestStream(
      `/projects/${uid}/deployment_with_assets`,
      { method: "POST", body: form },
    );
  }

  gitHubActionsDeploy(
    uid: string,
    request: DenoProjectDeploymentRequestGitHubActions,
    files: Uint8Array[],
  ): AsyncIterable<DenoDeploymentProgress> {
    const form = new FormData();
    form.append("request", JSON.stringify(request));
    for (const bytes of files) {
      form.append("file", new Blob([bytes]));
    }
    return this.#requestStream(
      `/projects/${uid}/deployment_github_actions`,
      { method: "POST", body: form },
    );
  }
}
