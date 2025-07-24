const API_HOST = 'sky-scrapper.p.rapidapi.com';
const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '';

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiClient<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {}
): Promise<ApiResponse<T>> {
  const url = new URL(`https://${API_HOST}${endpoint}`);
  
  // Add query parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST,
    },
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `API request failed: ${response.statusText}`
    );
  }

  const data = await response.json();
  
  return {
    data,
    status: response.status,
  };
}

export { apiClient, ApiError };
export type { ApiResponse }; 