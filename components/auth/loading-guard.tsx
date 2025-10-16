'use client';

import { LoaderCircleIcon } from 'lucide-react';
import { LoadingGuardProps } from '@/types/auth';

export function LoadingGuard({ 
  children, 
  isLoading, 
  fallback 
}: LoadingGuardProps) {
  if (isLoading) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <LoaderCircleIcon className="size-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}

// Alternative loading components
export function PageLoadingGuard({ children, isLoading }: LoadingGuardProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoaderCircleIcon className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}

export function InlineLoadingGuard({ children, isLoading }: LoadingGuardProps) {
  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <LoaderCircleIcon className="size-4 animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  return <>{children}</>;
}