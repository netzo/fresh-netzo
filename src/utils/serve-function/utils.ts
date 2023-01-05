export const getParams = async (
  request: Request,
): Promise<Record<string, any>> => {
  switch (request.method) {
    case "GET": {
      const searchParams = new URLSearchParams(new URL(request.url).search);
      return Object.fromEntries(searchParams.entries());
    }
    case "POST": {
      const isFormData = request.headers.get("content-type") ===
        "application/x-www-form-urlencoded";
      return isFormData ? await request.formData() : await request.json();
    }
    default: {
      throw new Error(`Method ${request.method} not allowed`);
    }
  }
};
