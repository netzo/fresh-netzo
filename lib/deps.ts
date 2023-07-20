// NOTE: import_map.json is for apps, deps.ts is for modules/libraries
// IMPORTANT: import/export only what's required to avoid bloating bundle

// fresh:
export type {
  MiddlewareHandler,
  Plugin,
} from 'https://deno.land/x/fresh@1.3.0/server.ts'

// preact:
export {
  computed,
  effect,
  Signal,
  signal,
  useComputed,
  useSignal,
} from 'https://esm.sh/*@preact/signals@1.1.5'

// radash:
export { get } from 'https://esm.sh/radash@11.0.0'

// @headlessui/react:
export { } from 'https://esm.sh/@headlessui/react@1.7.14?alias=react:preact/compat,react-dom:preact/compat,@types/react:preact/compat&external=preact/compat'

// shiki-es:
export {
  getHighlighter,
  type Highlighter,
  type Lang,
} from 'https://esm.sh/shiki-es@0.14.0'

// react-datepicker:
// FIXME: cannot import react-datepicker here (in deps.ts) somehow. It currently only
// works when importing it directly in the component files that use it (the DatePicker)
// export { default as DatePicker } from "https://esm.sh/react-datepicker@4.16.0?alias=react:preact/compat,react-dom:preact/compat,@types/react:preact/compat&external=preact/compat"