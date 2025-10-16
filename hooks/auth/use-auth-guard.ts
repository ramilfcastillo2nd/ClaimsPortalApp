import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UseAuthGuardOptions, AuthState } from '@/types/auth';

export function useAuthGuard(options: UseAuthGuardOptions = {}): AuthState {
  const {
    redirectTo = '/signin',
    requiredRoles = [],
    requiredPermissions = [],
    requireAuth = true
  } = options;

  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

    // Function to get token from storage
  const getStoredToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  };
  
 useEffect(() => {
    console.log('🔍 useAuthGuard Debug:', {
      status,
      requireAuth,
      hasSession: !!session?.user,
      hasStoredToken: !!getStoredToken()
    });

    // Still loading NextAuth
    if (status === 'loading') {
      setIsLoading(true);
      return;
    }

    // If auth is not required, allow access
    if (!requireAuth) {
      setIsAuthorized(true);
      setIsLoading(false);
      return;
    }

    // Check authentication - same logic as useAuth
    const storedToken = getStoredToken();
    const hasSession = !!session?.user;
    const isAuthenticated = hasSession || !!storedToken;

    console.log('🔍 Auth check details:', {
      storedToken: !!storedToken,
      hasSession,
      isAuthenticated
    });

    if (!isAuthenticated) {
      console.log('❌ Not authenticated, will redirect to:', redirectTo);
      setIsAuthorized(false);
      setIsLoading(false);
      router.push(redirectTo);
      return;
    }

    // Check roles if required
    if (requiredRoles.length > 0) {
      const userRoles = session?.user?.roles || [];
      const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
      
      if (!hasRequiredRole) {
        console.log('❌ Missing required role');
        router.push('/unauthorized');
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }
    }

    // Check permissions if required
    if (requiredPermissions.length > 0) {
      const userPermissions = session?.user?.permissions || [];
      const hasRequiredPermission = requiredPermissions.some(permission => 
        userPermissions.includes(permission)
      );
      
      if (!hasRequiredPermission) {
        console.log('❌ Missing required permission');
        router.push('/unauthorized');
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }
    }

    console.log('✅ User authorized');
    setIsAuthorized(true);
    setIsLoading(false);

  }, [session, status, router, redirectTo, requiredRoles, requiredPermissions, requireAuth]);

  return {
    isAuthorized,
    isLoading,
    user: session?.user,
    session,
  };
}