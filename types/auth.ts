import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { ReactNode } from 'react';

// Extend NextAuth types
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
      roles: string[];
      permissions?: string[];
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    roles: string[];
    permissions?: string[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    roles: string[];
    permissions?: string[];
  }
}

// Auth Guard Types
export interface UseAuthGuardOptions {
  redirectTo?: string;
  requiredRoles?: string[];
  requiredPermissions?: string[];
  requireAuth?: boolean;
}

export interface AuthGuardProps {
  children: ReactNode;
  requiredRoles?: string[];
  requiredPermissions?: string[];
  requireAuth?: boolean;
  redirectTo?: string;
  fallback?: ReactNode;
}

export interface AuthState {
  isAuthorized: boolean;
  isLoading: boolean;
  user: any;
  session: any;
}

export interface LoadingGuardProps {
  children: ReactNode;
  isLoading: boolean;
  fallback?: ReactNode;
}

// API Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Permission Types
export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}