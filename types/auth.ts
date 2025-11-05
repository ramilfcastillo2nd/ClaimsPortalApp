import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';
import { ReactNode } from 'react';

// Extend NextAuth types
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    loginResponse: any;
    user: DefaultSession['user'] & {
      firstName?: string;
      lastName?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    refreshToken?: string;
    loginResponse?: any;
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


export interface ICurrentProfileInfo {
  email: string;
  firstName: string;
  lastName: string;
  refreshToken: string;
  token: string;
}

export interface ICustomerInfo {
  id: number;
  customerID: string;
  zohoContactID: string;
  customerReference: string;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  previousName: string;
  status: string;
  email: string;
  mobile: string;
  streetName: string;
  streetName2: string;
  town: string;
  county: string;
  postcode: string;
  city: string;
}
