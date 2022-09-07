export const getItemUrlById = (
  id: string, baseURL = 'https://api.netzo.io'
): string => new URL(`/web/${id}`, baseURL).href;