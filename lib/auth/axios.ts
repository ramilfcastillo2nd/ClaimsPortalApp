import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getSession, signOut } from 'next-auth/react';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || '/api';
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 
                  process.env.NEXTAUTH_URL || 
                  'http://localhost:3000';

  console.log('BaseUrl: ', baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`);
  
  return baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
};
// Create axios instance
const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get token from storage
const getStoredToken = () => {
  if (typeof window === 'undefined') return null;
  
  return localStorage.getItem('accessToken') || 
         sessionStorage.getItem('accessToken');
};

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  async (config) => {
    let token = null;

    // First try to get token from storage
    token = getStoredToken();

    // Fallback to NextAuth session if no stored token
    if (!token) {
      try {
        const session = await getSession();
        if (session?.accessToken) {
          token = session.accessToken;
        }
      } catch (error) {
        console.log('Could not get session');
      }
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear invalid tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');

      // Sign out and redirect to login
      await signOut({ callbackUrl: '/signin' });
      return Promise.reject(error);
    }

    // Handle 403 forbidden errors
    if (error.response?.status === 403) {
      if (typeof window !== 'undefined') {
        window.location.href = '/unauthorized';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;