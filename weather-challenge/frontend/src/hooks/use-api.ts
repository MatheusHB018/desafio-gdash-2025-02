const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

export function useApi() {
  const getToken = () => localStorage.getItem('access_token');

  const fetchApi = async (url: string, options: FetchOptions = {}) => {
    const { skipAuth = false, ...fetchOptions } = options;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    };

    if (!skipAuth) {
      const token = getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_URL}${url}`, {
      ...fetchOptions,
      headers,
    });

    if (response.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
      throw new Error(error.message || `Erro ${response.status}`);
    }

    return response.json();
  };

  return { fetchApi, API_URL };
}
