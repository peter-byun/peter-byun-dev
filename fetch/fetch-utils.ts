type FetchOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
  body?: unknown;
  headers?: Record<string, string>;
};

export const fetchJson = <T>(
  url: string,
  options?: FetchOptions
): Promise<T> => {
  if (!options) return fetch(url).then(getJsonFromResponse) as Promise<T>;

  const fetchOptions: RequestInit = {
    method: options.method,
    headers: {
      ...options.headers,
      'Content-type': 'application/json;charset=utf-8',
    },
  };

  if (options.body && options.method !== 'HEAD' && options.method !== 'GET') {
    fetchOptions.body = JSON.stringify(options.body);
  }

  return fetch(url, fetchOptions).then(getJsonFromResponse) as Promise<T>;
};

function getJsonFromResponse(response: Awaited<ReturnType<typeof fetch>>) {
  return response.json();
}
