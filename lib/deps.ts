// NOTE: import_map.json is for apps, deps.ts is for modules/libraries
// IMPORTANT: import/export only what's required to avoid bloating bundle

// fresh:
export type {
  MiddlewareHandler,
  Plugin,
} from "https://deno.land/x/fresh@1.3.0/server.ts";

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
// export { get } from "https://deno.land/x/lodash_es@v0.0.2/mod.ts";

// @headlessui/react:
// export { } from 'https://esm.sh/@headlessui/react@1.7.14?alias=react:preact/compat,react-dom:preact/compat,@types/react:preact/compat&external=preact/compat'

// react-datepicker:
export { default as DatePicker } from "https://esm.sh/react-datepicker@4.16.0?alias=react:preact/compat,react-dom:preact/compat,@types/react:preact/compat&external=preact/compat";
