import { IS_BROWSER } from "../deps/$fresh/runtime.ts";
import { effect, type Signal, useSignal } from "../deps/@preact/signals.ts";

export type UrlParams = Record<string, string[] | string>;

export interface UseUrlSearchParamsOptions<T> {
  /**
   * @default true
   */
  removeNullishValues?: boolean;

  /**
   * @default false
   */
  removeFalsyValues?: boolean;

  /**
   * @default {}
   */
  initialValue?: T;

  /**
   * Write back to `window.history` automatically
   *
   * @default true
   */
  write?: boolean;
}

/**
 * Reactive URLSearchParams
 *
 * @see https://vueuse.org/useUrlSearchParams
 * @param mode
 * @param options
 */
export function useUrlSearchParams<
  T extends Record<string, unknown> = UrlParams,
>(
  mode: "history" | "hash" | "hash-params" = "history",
  options: UseUrlSearchParamsOptions<T> = {},
): Signal<T> {
  if (!window || !IS_BROWSER) return useSignal<T>({} as T);

  const {
    initialValue = Object.fromEntries(
      new URLSearchParams(window.location.search),
    ) as T,
    removeNullishValues = true,
    removeFalsyValues = false,
    write: enableWrite = true,
  } = options;

  const state = useSignal({} as T);

  function getRawParams() {
    if (mode === "history") {
      return window.location.search || "";
    } else if (mode === "hash") {
      const hash = window.location.hash || "";
      const index = hash.indexOf("?");
      return index > 0 ? hash.slice(index) : "";
    } else {
      return (window.location.hash || "").replace(/^#/, "");
    }
  }

  function constructQuery(params: URLSearchParams) {
    const stringified = params.toString();

    if (mode === "history") {
      return `${stringified ? `?${stringified}` : ""}${
        window.location.hash || ""
      }`;
    }
    if (mode === "hash-params") {
      return `${window.location.search || ""}${
        stringified ? `#${stringified}` : ""
      }`;
    }
    const hash = window.location.hash || "#";
    const index = hash.indexOf("?");
    if (index > 0) {
      return `${hash.slice(0, index)}${stringified ? `?${stringified}` : ""}`;
    }
    return `${hash}${stringified ? `?${stringified}` : ""}`;
  }

  function read() {
    return new URLSearchParams(getRawParams());
  }

  function updateState(params: URLSearchParams) {
    const unusedKeys = new Set(Object.keys(state));
    for (const key of params.keys()) {
      const paramsForKey = params.getAll(key);
      state.value = {
        ...state.value,
        [key]: paramsForKey.length > 1 ? paramsForKey : (params.get(key) || ""),
      };
      unusedKeys.delete(key);
    }
    Array.from(unusedKeys).forEach((key) => delete state.value[key]);
  }

  effect(() => {
    const params = new URLSearchParams("");
    Object.keys(state.value).forEach((key) => {
      const mapEntry = state.value[key];
      if (Array.isArray(mapEntry)) {
        mapEntry.forEach((value) => params.append(key, value));
      } else if (removeNullishValues && mapEntry == null) {
        params.delete(key);
      } else if (removeFalsyValues && !mapEntry) {
        params.delete(key);
      } else {
        params.set(key, mapEntry as string);
      }
    });
    console.log("[EFFECT] NO UPDATE", state.value);
    write(params);
  });

  function write(params: URLSearchParams, shouldUpdate?: boolean) {
    if (shouldUpdate) updateState(params);

    window.history.replaceState(
      window.history.state,
      window.document.title,
      window.location.pathname + constructQuery(params),
    );
  }

  function onChanged() {
    if (!enableWrite) return;
    console.log("[EFFECT] UPDATE", state.value);
    write(read(), true);
  }

  addEventListener("popstate", onChanged, false);
  if (mode !== "history") addEventListener("hashchange", onChanged, false);

  // const initial = read();
  // if (initial.keys().next().value) {
  //   updateState(initial);
  // } else {
  //   Object.assign(state, initialValue);
  // }

  return state;
}
