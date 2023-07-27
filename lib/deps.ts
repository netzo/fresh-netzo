// NOTE: import_map.json is for apps, deps.ts is for modules/libraries
// IMPORTANT: import/export only what's required to avoid bloating bundle

// std:
export {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";

// fresh:
export type {
  MiddlewareHandler,
  Plugin,
} from "https://deno.land/x/fresh@1.3.1/server.ts";

// preact:
export {
  computed,
  effect,
  Signal,
  signal,
  useComputed,
  useSignal,
} from "https://esm.sh/*@preact/signals@1.1.5";

// lodash (radash.get not working somehow):
export { get } from "https://deno.land/x/lodash_es@v0.0.2/mod.ts";

// unocss:
export {
  type Preset,
  type RuleContext,
  UnoGenerator,
  type UserConfig,
} from "https://esm.sh/@unocss/core@0.53.4?bundle";
export type { Theme } from "https://esm.sh/@unocss/preset-uno@0.53.4?bundle";
export { parseColor } from "https://esm.sh/@unocss/preset-mini@0.53.4/utils?bundle";
export { theme as unoTheme } from "https://esm.sh/@unocss/preset-mini@0.53.4?bundle";
export { fonts } from "https://esm.sh/@unocss/preset-mini@0.53.4/rules?bundle";
export {
  mergeDeep,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
} from "https://esm.sh/unocss@0.53.4?bundle";

// @headlessui/react:
// export { } from 'https://esm.sh/@headlessui/react@1.7.14?alias=react:preact/compat,react-dom:preact/compat,@types/react:preact/compat&external=preact/compat'

// react-datepicker:
export { default as DatePicker } from "https://esm.sh/react-datepicker@4.16.0?alias=react:preact/compat,react-dom:preact/compat,@types/react:preact/compat&external=preact/compat";

// apis:
export {
  $fetch,
  type FetchContext,
  type FetchOptions,
} from "https://esm.sh/ofetch@1.0.0";
export {
  type QueryObject,
  resolveURL,
  withQuery,
} from "https://esm.sh/ufo@0.8.5";
export {
  getToken,
  type GoogleAuth,
} from "https://deno.land/x/googlejwtsa@v0.1.8/mod.ts";
