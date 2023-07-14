import { computed, get, signal } from '../deps.ts'

export const useSearch = <T>(items: T[] = [], keys: string[]) => {
  if (!keys) keys = Object.keys(items[0] as object)

  const search = signal('')
  const filteredItems = computed(() => {
    const query = search.value.toLowerCase()
    return items.filter((item) => {
      return keys.some((key: string) =>
        get(item, key)?.toString().toLowerCase().includes(query)
      )
    })
  })

  return { search, filteredItems }
}