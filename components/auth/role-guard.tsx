'use client';

import { ReactNode } from 'react';
import { AuthGuard } from './auth-guard';

interface RoleGuardProps {
  children: ReactNode;
  roles: string[];
  fallback?: ReactNode;
  mode?: 'any' | 'all'; // any = has any of the roles, all = has all roles
}

export function RoleGuard({ 
  children, 
  roles, 
  fallback,
  mode = 'any' 
}: RoleGuardProps) {
  return (
    <AuthGuard 
      requiredRoles={roles} 
      fallback={fallback}
    >
      {children}
    </AuthGuard>
  );
}

// Specific role guards for common use cases
export function AdminGuard({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard roles={['admin']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function UserGuard({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard roles={['user', 'admin']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}