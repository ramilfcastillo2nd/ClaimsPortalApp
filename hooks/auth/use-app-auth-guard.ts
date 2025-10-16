import { useAuth } from '@/hooks/auth/use-auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAppAuthGuard() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('🧪 useAppAuthGuard:', { isAuthenticated, isLoading });
    
    if (!isLoading && !isAuthenticated) {
      console.log('🧪 Redirecting to signin');
      router.push('/signin');
    }
  }, [isAuthenticated, isLoading, router]);

  return {
    isAuthenticated,
    isLoading,
  };
}