import { computed, signal } from '@preact/signals'
import { get } from '../deps.ts'

// @uidotdev/usehooks:
export * from 'https://esm.sh/@uidotdev/usehooks@2.0.1'

export const usePagination = <T>(items: T[] = []) => {
  const page = signal(1)
  const itemsPerPage = signal(25)
  const pageCount = computed(() => Math.ceil(items.length / itemsPerPage.value))
  const paginatedItems = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return items.slice(start, end)
  })

  return { page, itemsPerPage, pageCount, paginatedItems }
}

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

export const useSelected = <T>(items: T[] = []) => {
  const selected = signal<T[]>([])
  const selectedAll = signal(false)
  const selectedCount = computed(() => selected.value.length)
  const selectedAllCount = computed(() => {
    const count = items.length
    return selectedCount.value === count ? count : 0
  })

  return { selected, selectedAll, selectedCount, selectedAllCount }
}
