import { useState } from 'react';
import { liveApi, mockApi, type LoginCredentials } from '@jqbtx/api';

const isMock = import.meta.env.VITE_USE_MOCKS === 'true';
export const authClient = isMock ? mockApi.auth : liveApi.auth;

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials, onSuccess: () => void) => {
    setIsLoading(true);
    setError(null);
    try {
      const success = await authClient.login(credentials);
      if (success) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}