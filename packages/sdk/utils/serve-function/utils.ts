const getBodyParams = async (
  request: Request,
): Promise<Record<string, unknown>> => {
  'application/x-www-form-urlencoded'
  switch (request.headers.get('content-type')) {
    case 'application/x-www-form-urlencoded': {
      const formData = await request.formData()
      return Object.fromEntries(formData.entries())
    }
    case 'application/json': {
      return request.json()
    }
    default: {
      return {} // TODO: handle other content types?
    }
  }
}

export const getParams = async (
  request: Request,
): Promise<Record<string, unknown>> => {
  const url = new URL(request.url)
  const searchParams = Object.fromEntries(url.searchParams.entries())
  const bodyParams = await getBodyParams(request)
  return { ...searchParams, ...bodyParams }
}
