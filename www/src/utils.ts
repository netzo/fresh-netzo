import { baseImports, imports } from '~/../lib/components/imports.ts'

function select(obj: Record<string, any>, keys: string[]) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key)),
  )
}
function omit(obj: Record<string, any>, keys: string[]) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key)),
  )
}

/**
 * Build the deno.json file for dynamic injection using
 * vitepress' `json-vue` unescape syntax for codeblocks.
 * @see https://vitepress.dev/guide/using-vue#unescape-in-code-blocks
 * @param dependencies {string[]} - Array of component dependencies to inject
 * @returns {Record<string, any>} - deno.json object
 */
export function buildDenoJson(entry: RegistryEntry = {}) {
  // NOTE: registryDependencies already covered by "netzo/" in baseImports
  const { dependencies = [], registryDependencies = [] } = entry
  const componentImports = dependencies.reduce((acc, dependency) => {
    return { ...acc, [dependency]: `https://esm.sh/${dependency}` }
  }, {})
  return {
    imports: {
      ...baseImports,
      ...select(imports, dependencies),
    },
  }
}
