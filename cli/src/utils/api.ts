import { TextLineStream } from '../../deps.ts'

// externalized types in @denoland/deployctl/src/utils/api_types.ts
// to @netzo/api to use them both for @netzo/app and @netzo/netzo/cli
import type {
  DenoDeploymentProgress,
  DenoProjectDeployment,
  DenoProjectDeploymentRequestGitHubActions,
  DenoProjectDeploymentRequestPush,
  Log,
  ManifestEntry,
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

export class API {
  #endpoint: string
  #apiKey: string

  constructor(authorization: string, endpoint: string) {
    this.#apiKey = authorization
    this.#endpoint = endpoint
  }

  static fromApiKey(apiKey: string) {
    const endpoint = Deno.env.get('NETZO_API_ENDPOINT') ??
      'https://api.netzo.io'
    return new API(apiKey, endpoint)
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

  async getProject(id: string): Promise<Project | null> {
    try {
      return await this.#requestJson(`/projects/${id}`)
    } catch (err) {
      throw err
    }
  }

  async getProjectByUid(projectUid: string): Promise<Project | null> {
    try {
      const { data: [project] } = await this.#requestJson(
        `/projects?uid=${projectUid}&$limit=1`,
      ) as Paginated<Project>
      return project
    } catch (err) {
      throw err
    }
  }

  async getTemplateByUid(templateUid: string): Promise<Template | null> {
    try {
      const { data: [template] } = await this.#requestJson(
        `/templates?uid=${templateUid}&$limit=1`,
      ) as Paginated<Template>
      return template
    } catch (err) {
      throw err
    }
  }

  async getDeployments(
    projectId: string,
  ): Promise<DenoProjectDeployment[] | null> {
    try {
      const { data } = await this.#requestJson(
        `/deployments?projectId=${projectId}`,
      ) as Paginated<DenoProjectDeployment>
      return data
    } catch (err) {
      throw err
    }
  }

  getLogs(projectId: string, deploymentId: string): AsyncIterable<Log> {
    return this.#requestStream(
      `/logs?projectId=${projectId}&deploymentId=${deploymentId}`,
    )
  }

  // TODO: implement an endpoint (e.g. `/projects/${id}/assets/negotiate`)
  // that returns only the hashes of assets that need to be uploaded.
  // In the meantime we return all hashes (string[]) to deploy all each time.
  async projectNegotiateAssets(
    // deno-lint-ignore no-unused-vars
    id: string,
    manifest: { entries: Record<string, ManifestEntry> },
  ): Promise<string[]> {
    const result: string[] = []
    // deno-lint-ignore no-explicit-any
    function walk(obj: any) {
      // deno-lint-ignore no-prototype-builtins
      if (obj.hasOwnProperty('gitSha1')) result.push(obj.gitSha1)
      if (typeof obj === 'object') {
        for (const key in obj) {
          // deno-lint-ignore no-prototype-builtins
          if (obj.hasOwnProperty(key)) walk(obj[key])
        }
      }
    }
    await walk(manifest)
    return result

    // return await this.#requestJson(`/projects/${id}/assets/negotiate`, {
    //   method: 'POST',
    //   body: manifest,
    // })
  }

  // TODO: replace `pushDeployJson` with `pushDeploy` below once @netzo/api
  // adds support for deploying with assets via multipart/form-data directly.
  // In the meantime, we use POST /projects/:id with JSON body (files as strings)
  // instead of POST /projects/:id/deployment_with_assets with multipart/form-data
  // and use the existing progress indicator in the CLI by returning AsyncIterable
  async *pushDeployJson(
    projectId: string,
    body: Pick<Project, 'deploymentId' | 'configuration' | 'files'>,
  ): AsyncIterable<DenoDeploymentProgress> {
    try {
      const paths = Object.keys(body.files)
      const total = paths.length
      let i = 0
      do {
        yield { type: 'load', url: paths[i], seen: i++, total }
      } while (i < paths.length)
      const result: Project = await this.#requestJson(
        `/projects/${projectId}`,
        { method: 'PATCH', body },
      )
      yield { type: 'uploadComplete' }
      // deno-lint-ignore no-explicit-any
      yield { ...result, type: 'success' } as any
    } catch (err) {
      yield { type: 'error', code: 'unknown', ctx: err.message }
    }
  }

  pushDeploy(
    projectId: string,
    request: DenoProjectDeploymentRequestPush,
    files: Uint8Array[],
  ): AsyncIterable<DenoDeploymentProgress> {
    const form = new FormData()
    form.append('request', JSON.stringify(request))
    for (const bytes of files) {
      form.append('file', new Blob([bytes]))
    }
    return this.#requestStream(
      `/projects/${projectId}/deployment_with_assets`,
      { method: 'POST', body: form },
    )
  }

  gitHubActionsDeploy(
    projectId: string,
    request: DenoProjectDeploymentRequestGitHubActions,
    files: Uint8Array[],
  ): AsyncIterable<DenoDeploymentProgress> {
    const form = new FormData()
    form.append('request', JSON.stringify(request))
    for (const bytes of files) {
      form.append('file', new Blob([bytes]))
    }
    return this.#requestStream(
      `/projects/${projectId}/deployment_github_actions`,
      { method: 'POST', body: form },
    )
  }
}
