import { computed, signal } from '../../deps.ts'

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
