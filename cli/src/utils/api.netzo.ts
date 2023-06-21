import { TextLineStream } from '../../deps.ts'

// externalized types in @denoland/deployctl/src/utils/api_types.ts
// to @netzo/api to use them both for @netzo/app and @netzo/netzo/cli
import type {
  DenoDeploymentProgress,
  DenoProjectDeploymentRequestPush,
  Paginated,
  Project,
  Template,
} from '../../deps.ts'

export interface RequestOptions {
  method?: string
  body?: unknown
}

export class APIError extends Error {
  code: string
  xDenoRay: string | null

  name = 'APIError'

  constructor(code: string, message: string, xDenoRay: string | null) {
    super(message)
    this.code = code
    this.xDenoRay = xDenoRay
  }

  toString() {
    let error = `${this.name}: ${this.message}`
    if (this.xDenoRay !== null) {
      error += `\nx-deno-ray: ${this.xDenoRay}`
      error += '\nIf you encounter this error frequently,' +
        ' contact us at help@netzo.io with the above x-deno-ray.'
    }
    return error
  }
}

export class NetzoAPI {
  #endpoint: string
  #apiKey: string

  constructor(authorization: string, endpoint: string) {
    this.#apiKey = authorization
    this.#endpoint = endpoint
  }

  static fromApiKey(apiKey: string) {
    const endpoint = Deno.env.get('NETZO_API_ENDPOINT') ??
      'http://localhost:4321' // 'https://api.netzo.io'
    return new NetzoAPI(apiKey, endpoint)
  }

  async #request(path: string, opts: RequestOptions = {}): Promise<Response> {
    const url = `${this.#endpoint}${path}`
    const method = opts.method ?? 'GET'
    const body = opts.body !== undefined
      ? opts.body instanceof FormData ? opts.body : JSON.stringify(opts.body)
      : undefined
    const headers = {
      'accept': 'application/json',
      [this.#apiKey.length === 64 ? 'x-api-key' : 'x-env-var-api-key']:
        this.#apiKey,
      ...(opts.body !== undefined
        ? opts.body instanceof FormData
          ? {}
          : { 'content-type': 'application/json' }
        : {}),
    }
    return await fetch(url, { method, headers, body })
  }

  async #requestJson<T>(path: string, opts?: RequestOptions): Promise<T> {
    const res = await this.#request(path, opts)
    if (!res.headers.get('content-type')?.startsWith('application/json')) {
      const text = await res.text()
      throw new Error(`Expected JSON, got '${text}'`)
    }
    const json = await res.json()
    if (res.status !== 200) {
      const xDenoRay = res.headers.get('x-deno-ray')
      throw new APIError(json.code, json.message, xDenoRay)
    }
    return json
  }

  async *#requestStream<T>(
    path: string,
    opts?: RequestOptions,
  ): AsyncIterable<T> {
    const res = await this.#request(path, opts)
    if (res.status !== 200) {
      const json = await res.json()
      const xDenoRay = res.headers.get('x-deno-ray')
      throw new APIError(json.code, json.message, xDenoRay)
    }
    if (res.body === null) {
      throw new Error('Stream ended unexpectedly')
    }

    const lines = res.body
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(new TextLineStream())
    for await (const line of lines) {
      if (line === '') return
      yield JSON.parse(line)
    }
  }

  async getProjectByUid(uid: string): Promise<Project | null> {
    try {
      const { data: [project] } = await this.#requestJson(
        `/projects?uid=${uid}&$limit=1`,
      ) as Paginated<Project>
      return project
    } catch (err) {
      throw err
    }
  }

  async getTemplateByUid(uid: string): Promise<Template | null> {
    try {
      const { data: [template] } = await this.#requestJson(
        `/templates?uid=${uid}&$limit=1`,
      ) as Paginated<Template>
      return template
    } catch (err) {
      throw err
    }
  }

  pushDeploy(
    uid: string,
    request: DenoProjectDeploymentRequestPush,
    files: Uint8Array[],
  ): AsyncIterable<DenoDeploymentProgress> {
    const form = new FormData()
    form.append('request', JSON.stringify(request))
    for (const bytes of files) {
      form.append('file', new Blob([bytes]))
    }
    return this.#requestStream(
      `/projects/${uid}/deployment_with_assets`,
      { method: 'POST', body: form },
    )
  }
}
