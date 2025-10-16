'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ScreenLoader } from '@/components/common/screen-loader';
//import { Demo1Layout } from '../components/layouts/demo1/layout';
import { Demo7Layout } from '../components/layouts/demo7/layout';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasStoredToken = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return Boolean(
      localStorage.getItem('accessToken') ||
        sessionStorage.getItem('accessToken'),
    );
  }, [mounted]);

  const isAuthenticated = Boolean(session?.accessToken) || hasStoredToken;

  useEffect(() => {
    if (mounted && status !== 'loading' && !isAuthenticated) {
      router.push('/signin');
    }
  }, [mounted, status, isAuthenticated, router]);

  if (!mounted || (status === 'loading' && !hasStoredToken)) {
    return <ScreenLoader />;
  }

  return isAuthenticated ? <Demo7Layout>{children}</Demo7Layout> : null;
}
