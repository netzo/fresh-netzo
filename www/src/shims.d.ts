declare interface Window {
  // mounts customerly client (see scripts in index.html)
  customerly: {
    load: ({ app_id: string }) => void
    [key: string]: any
  }
  fathom: any
  UC_UI: any
}

declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// with vite-plugin-vue-markdown, markdown files can be treated as Vue components
declare module '*.md' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
