class ApiError extends Error {
  constructor(public response: Response) {
    super("Api Error" + response.status);
  }
}

export const jsonApiInstance = async <T>(
  url: string,
  init?: RequestInit & { json?: unknown }
): Promise<T> => {
  let headers = init?.headers ?? {};

  if (init?.json) {
    headers = {
      ...headers,
      "Content-Type": "application/json",
    };

    init.body = JSON.stringify(init.json);
  }

  const result = await fetch(`${import.meta.env.VITE_BASE_SERVER_URL}${url}`, {
    ...init,
    headers,
  });

  if (!result.ok) {
    throw new ApiError(result);
  }

  const data = await result.json();
  return data;
};
