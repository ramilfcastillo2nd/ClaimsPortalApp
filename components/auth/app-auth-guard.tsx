'use client';

import { useAuth } from '@/hooks/auth/use-auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingGuard } from '@/components/auth/loading-guard';

export function AppAuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('🧪 AppAuthGuard:', { isAuthenticated, isLoading });
    
    if (!isLoading && !isAuthenticated) {
      console.log('🧪 Redirecting to signin');
      router.push('/signin');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <LoadingGuard isLoading={true}>
        <div>Checking authentication...</div>
      </LoadingGuard>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Not authenticated, redirecting...</div>
      </div>
    );
  }

  return <>{children}</>;
}