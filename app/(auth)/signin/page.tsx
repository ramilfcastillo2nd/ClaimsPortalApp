'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiErrorWarningFill } from '@remixicon/react';
import { AlertCircle, Eye, EyeOff, LoaderCircleIcon } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { ApiClient } from '@/lib/auth';
import { useAuth } from '@/hooks/auth';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingGuard } from '@/components/auth';
import { Icons } from '@/components/common/icons';
import { getSigninSchema, SigninSchemaType } from '../forms/signin-schema';
import { useAuthStore } from '@/lib/state/auth-store';

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loginResponse, setLoginResponse] = useState<unknown | null>(null);
  // Token present in storage?
  const hasStoredToken = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return Boolean(
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('accessToken'),
    );
  }, []);

  // Authenticated if session has accessToken or we have a stored token
  const isAuthenticated = Boolean(session?.accessToken) || hasStoredToken;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== 'loading' && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [status, isAuthenticated, router]);

  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(getSigninSchema()),
    defaultValues: {
      email: 'customer@testuser.com',
      password: 'P@ssw0rd',
      rememberMe: false,
    },
  });

  async function onSubmit(values: SigninSchemaType) {
    setIsProcessing(true);
    setError(null);

    try {
      // Call your API to authenticate
      const response = await ApiClient.post('/account/login', {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      });

      console.log('API response:', response);
      useAuthStore.getState().setLogin(response);
      // Check if login was successful and token is available
      if (response && response.token) {
        const { token, refreshToken, firstName, lastName } = response;

        // Store tokens based on rememberMe preference
        if (values.rememberMe) {
          localStorage.setItem('accessToken', token);
          localStorage.setItem('firstName', firstName);
          localStorage.setItem('lastName', lastName);
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
          }
        } else {
          sessionStorage.setItem('accessToken', token);
          localStorage.setItem('firstName', firstName);
          localStorage.setItem('lastName', lastName);
          if (refreshToken) {
            sessionStorage.setItem('refreshToken', refreshToken);
          }
        }

        // Optional: Create NextAuth session for additional features
        try {
          await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            accessToken: token,
          });
        } catch {
          console.log('NextAuth session creation failed, but token is stored');
        }
        const callbackUrl = new URLSearchParams(window.location.search).get(
          'callbackUrl',
        );
        router.push(callbackUrl || '/dashboard');
      } else {
        // Handle API response without token or unsuccessful login
        setError(
          response.message || 'Login failed. Please check your credentials.',
        );
      }
    } catch (err: any) {
      console.error('Login error:', err);

      // Handle different error scenarios
      if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else if (err.response?.status === 429) {
        setError('Too many login attempts. Please try again later.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(
          err instanceof Error
            ? err.message
            : 'An unexpected error occurred. Please try again.',
        );
      }
    } finally {
      setIsProcessing(false);
    }
  }

  if (status === 'loading' && !hasStoredToken) {
    return (
      <LoadingGuard isLoading={true}>
        <div>Checking authentication...</div>
      </LoadingGuard>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="block w-full space-y-5"
      >
        <div className="space-y-1.5 pb-3">
          <h1 className="text-2xl font-semibold tracking-tight text-center">
            Sign in to Metronic
          </h1>
        </div>

        <Alert size="sm" close={false}>
          <AlertIcon>
            <RiErrorWarningFill className="text-primary" />
          </AlertIcon>
          <AlertTitle className="text-accent-foreground">
            Use <span className="text-mono font-semibold">demo@kt.com</span>{' '}
            username and{' '}
            <span className="text-mono font-semibold">demo123</span> for demo
            access.
          </AlertTitle>
        </Alert>

        <div className="flex flex-col gap-3.5">
          <Button
            variant="outline"
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            <Icons.googleColorful className="size-5! opacity-100!" /> Sign in
            with Google
          </Button>
        </div>

        <div className="relative py-1.5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertIcon>
              <AlertCircle />
            </AlertIcon>
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center gap-2.5">
                <FormLabel>Password</FormLabel>
                <Link
                  href="/reset-password"
                  className="text-sm font-semibold text-foreground hover:text-primary"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  placeholder="Your password"
                  type={passwordVisible ? 'text' : 'password'} // Toggle input type
                  {...field}
                />
                <Button
                  type="button"
                  variant="ghost"
                  mode="icon"
                  size="sm"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                  className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!"
                  aria-label={
                    passwordVisible ? 'Hide password' : 'Show password'
                  }
                >
                  {passwordVisible ? (
                    <EyeOff className="text-muted-foreground" />
                  ) : (
                    <Eye className="text-muted-foreground" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <>
                <Checkbox
                  id="remember-me"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="text-sm leading-none text-muted-foreground"
                >
                  Remember me
                </label>
              </>
            )}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <Button type="submit" disabled={isProcessing}>
            {isProcessing ? (
              <LoaderCircleIcon className="size-4 animate-spin" />
            ) : null}
            Continue
          </Button>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-sm font-semibold text-foreground hover:text-primary"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
}
