// adapted from https://github.com/rainxh11/vue-useurl
import { IS_BROWSER } from "../deps/$fresh/runtime.ts";
import {
  computed,
  type ReadonlySignal,
  type Signal,
  signal,
} from "../deps/@preact/signals.ts";

export type IQueryParams = Record<
  string,
  | null
  | undefined
  | string
  | number
  | string[]
  | (string | number)[]
>;

export type IPathVariables = Record<string, string | number | Signal<any>>;

export interface IUrlOptions {
  path?: Signal<string | number>;
  pathVariables?: Signal<IPathVariables>;
  queryParams?: Signal<IQueryParams>;
  hash?: Signal<string | number>;
  disableCSV?: Signal<boolean>;
}

export interface IBuilderResult {
  path: Signal<string>;
  pathVariables: Signal<IPathVariables>;
  queryParams: Signal<IQueryParams>;
  hash: Signal<string | number>;
  disableCSV: Signal<boolean>;
  url: ReadonlySignal<string>;
  setUrl: (url: ReadonlySignal<string>) => void;
}

const createBuilderResult = (
  path: string,
  pathVariables: IPathVariables,
  queryParams: IQueryParams,
  hash: string,
  disableCSV: boolean,
) => {
  return {
    path: signal<string>(path),
    pathVariables: signal<IPathVariables>(pathVariables),
    queryParams: signal<IQueryParams>(queryParams),
    hash: signal<string>(hash),
    disableCSV: signal<boolean>(disableCSV),
    url: computed(() => ""),
    setUrl(url: ReadonlySignal<string>) {
      this.url = url;
    },
  };
};

const createUrlBuilder = (baseUrl?: string | null | undefined) => {
  const urlBuilder = {
    baseUrl: baseUrl ?? "",
    buildHash(url: string, hash: string | number): string {
      if (url.match(/#.+/gi)) return url.replace(/#.+/gi, `#${hash}`);
      return `${url}#${hash}`;
    },
    buildPathVariables(url: string, pathVariables: IPathVariables): string {
      Object.keys(pathVariables).forEach((_, index) => {
        const value = Object.values(pathVariables)[index];
        url = url.replace(
          /:([^\/]+)/gi,
          ("value" in (value as Signal))
            ? (value as Signal).value
            : value.toString(),
        );
      });
      return url;
    },
    buildQueryParams(
      url: string,
      queryParams: IQueryParams,
      disableCSV = false,
    ): string {
      url = url.replace(/(\?|\&)([^=]+)\=([^&]+)/gi, "");
      const params = Object.keys(queryParams)
        .map((key, index) => {
          const param = Object.values(queryParams)[index];
          switch (typeof key) {
            default:
              return `${key}=${param}`;
            case "object":
              return this.buildCSV(key, param, disableCSV);
          }
        })
        .flat()
        .filter((x) => !!x);
      const paramsString = params.length > 0 ? `?${params.join("&")}` : "";
      return url + paramsString;
    },
    buildCSV(key: string, param: any, disableCSV: boolean): string[] | any[] {
      if (Array.isArray(param)) {
        if (disableCSV) {
          return param.map((p) => `${key}=${p}`);
        }
        return [`${key}=${param.join(",")}`];
      }
      return [];
    },
  };

  return urlBuilder;
};

/**
 * Create a reactive url
 * @param {IUrlOptions | any} options Builder Options
 * @param {string} baseUrl Base URL
 * @returns {IBuilderResult} `{ url, queryParams, pathVariables, hash, path, disableCSV }`
 */
export const useUrl = (
  options: IUrlOptions | any,
  baseUrl?: string,
): IBuilderResult => {
  const builderResult = createBuilderResult(
    options?.path ?? "",
    options?.pathVariables ?? {},
    options?.queryParams ?? {},
    options?.hash ?? "",
    options?.disableCSV ?? false,
  );

  const { queryParams, pathVariables, path, hash, disableCSV } = builderResult;
  const builder = createUrlBuilder(baseUrl);

  const computedUrl = computed(() => {
    let tempUrl = `${builder.baseUrl}${path.value}`;
    tempUrl = tempUrl.replace(/([^:]\/)\/+/g, "$1");
    tempUrl = builder.buildPathVariables(tempUrl, pathVariables.value);
    tempUrl = builder.buildQueryParams(
      tempUrl,
      queryParams.value,
      disableCSV.value,
    );
    tempUrl = builder.buildHash(tempUrl, hash.value);

    return tempUrl;
  });

  builderResult.setUrl(computedUrl);

  return builderResult;
};
