import axiosInstance from '@/lib/auth/axios';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [validating, setValidating] = useState(false);
  // Function to get token from storage
  const getStoredToken = () => {
    if (typeof window === 'undefined') return null;

    return localStorage.getItem('accessToken') ||
      sessionStorage.getItem('accessToken');
  };

  const clearStoredTokens = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiration');
    sessionStorage.removeItem('tokenExpiration');
  };
  // Check authentication status
  // useEffect(() => {
  //   const storedToken = getStoredToken();
  //   const hasSession = !!session?.user;

  //   // User is authenticated if they have either a valid token or NextAuth session
  //   setIsAuthenticated(hasSession || !!storedToken);
  // }, [session]);

  useEffect(() => {
    let cancelled = false;

    const validateAuth = async () => {
      const storedToken = getStoredToken();
      const sessionToken = (session as any)?.accessToken as string | undefined;
      const hasAnyToken = !!storedToken || !!sessionToken;

      // No token at all -> unauthenticated
      if (!hasAnyToken) {
        if (!cancelled) setIsAuthenticated(false);
        return;
      }

      setValidating(true);
      try {
        // NOTE: axiosInstance baseURL already includes /api, so use '/account'
        await axiosInstance.get('/account');
        if (!cancelled) setIsAuthenticated(true);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          clearStoredTokens();
          try {
            await signOut({ redirect: false });
          } catch { }
          if (!cancelled) setIsAuthenticated(false);
        } else {
          // For non-401 errors, keep previous state (or decide how you want to handle)
          if (!cancelled) setIsAuthenticated(Boolean(hasAnyToken));
        }
      } finally {
        if (!cancelled) setValidating(false);
      }
    };

    // Run validation after NextAuth finishes initial load
    if (status !== 'loading') {
      validateAuth();
    }

    return () => {
      cancelled = true;
    };
  }, [session, status]);

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    const result = await signIn('credentials', {
      email,
      password,
      rememberMe,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  };

  const logout = async (callbackUrl?: string) => {
    try {
      // Clear stored tokens synchronously
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenExpiration');
        sessionStorage.removeItem('tokenExpiration');
      }
      // End NextAuth session WITHOUT redirect
      await signOut({ redirect: false });
    } finally {
      // Now navigate to signin once tokens are gone
      router.push(callbackUrl || '/signin');
    }
  };

    const isLoading = status === 'loading' || validating;

  const hasRole = (role: string): boolean => {
    return session?.user?.roles?.includes(role) || false;
  };

  const hasPermission = (permission: string): boolean => {
    return session?.user?.permissions?.includes(permission) || false;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some(role => hasRole(role));
  };

  const hasAllRoles = (roles: string[]): boolean => {
    return roles.every(role => hasRole(role));
  };

  return {
    session,
    user: session?.user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasRole,
    hasPermission,
    hasAnyRole,
    hasAllRoles,
    token: getStoredToken(),
  };
}