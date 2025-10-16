'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthGuardProps } from '@/types/auth';
import { useAuth } from '@/hooks/auth';
import { LoadingGuard } from './loading-guard';

export function AuthGuard({
  children,
  requiredRoles,
  requiredPermissions,
  requireAuth = true,
  redirectTo = '/signin',
  fallback,
}: AuthGuardProps) {
  const { isAuthenticated, isLoading, hasAnyRole, session } = useAuth();
  const router = useRouter();

  useEffect(() => {
      console.log('🛡️ AuthGuard useAuth Debug:', {
      isAuthenticated,
      isLoading,
      requireAuth,
      hasSession: !!session,
      accessToken: localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
    });

    if (!isLoading && requireAuth && !isAuthenticated) {
      console.log('❌ Not authenticated, redirecting to:', redirectTo);
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router, session]);

    // If auth is not required, show content
  if (!requireAuth) {
    return <>{children}</>;
  }
  // Show loading while checking auth
  if (isLoading) {
    return (
      <LoadingGuard isLoading={true} fallback={fallback}>
        <div>Loading...</div>
      </LoadingGuard>
    );
  }
   // If not authenticated, don't show content (redirect will happen in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // Check roles if required
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRole = hasAnyRole(requiredRoles);
    if (!hasRole) {
      router.push('/unauthorized');
      return null;
    }
  }

  // Show protected content
  return <>{children}</>;
}
