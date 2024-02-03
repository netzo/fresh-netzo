// inspired by https://blog.apideck.com/abstracting-pagination-across-third-party-apis

export interface PaginationOptions {
  limit: number;
  cursor?: string;
}

export interface PaginationResult<T> {
  data: T[];
  nextCursor?: string;
  previousCursor?: string;
}

/**
 * Paginate over a fetchPage function
 *
 * @example
 * const fetchPage = async (options: PaginationOptions) => {
 *   const { limit, cursor } = options;
 *   const response = await fetch(`/api/users?limit=${limit}&cursor=${cursor}`);
 *   const data = await response.json();
 *   return {
 *     data,
 *     nextCursor: data.length === limit ? encodeCursorCursor(data[data.length - 1].id) : undefined,
 *   };
 * };
 * const { data, nextCursor, previousCursor } = await paginate(fetchPage, { limit: 50 });
 * console.log(data, nextCursor, previousCursor);
 *
 * @param fetchPage
 * @param options
 * @returns
 */
export async function paginate<T>(
  fetchPage: (options: PaginationOptions) => Promise<PaginationResult<T>>,
  options: PaginationOptions
): Promise<PaginationResult<T>> {
  const { limit, cursor } = options;
  let nextCursor = cursor;
  let previousCursor = undefined;
  let data: T[] = [];

  do {
    const page = await fetchPage({ limit, cursor: nextCursor });
    data = data.concat(page.data);
    previousCursor = nextCursor;
    nextCursor = page.nextCursor;
  } while (nextCursor);

  return { data, nextCursor, previousCursor };
}

// Usage:
// const results = await paginate(fetchPageFunction, { limit: 50 });
