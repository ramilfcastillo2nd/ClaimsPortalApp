import { NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/lib/prisma';
import { ApiClient } from '@/lib/auth/api';

const authOptions: NextAuthOptions = {
  providers: [
     CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Shape of the login response from the backend
        type LoginResponse = {
          id?: string;
          email?: string;
          firstName?: string;
          lastName?: string;
          token?: string;
          refreshToken?: string;
          user?: {
            id?: string;
            email?: string;
            firstName?: string;
            lastName?: string;
          };
        };

        // Call your backend login
        const { data } = await ApiClient.post<LoginResponse>('/account/login', {
          email: credentials?.email,
          password: credentials?.password,
        });

        if (!data) return null;
        const response: LoginResponse = data;

        // Normalize a user object from response
        const user = {
          id: response.user?.id ?? response.id ?? response.email ?? 'user',
          email: response.email ?? response.user?.email ?? undefined,
          firstName: response.firstName ?? response.user?.firstName ?? undefined,
          lastName: response.lastName ?? response.user?.lastName ?? undefined,
          accessToken: response.token,
          refreshToken: response.refreshToken,
          raw: response, // keep entire login response
        };

        if (!user.accessToken) throw new Error('Login failed: no access token');

        return user as any;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
          include: {
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        if (existingUser) {
          // Update `lastSignInAt` field for existing users
          await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              name: profile.name,
              avatar: profile.picture || null,
              lastSignInAt: new Date(),
            },
          });

          return {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name || 'Anonymous',
            status: existingUser.status,
            roleId: existingUser.roleId,
            roleName: existingUser.role.name,
            avatar: existingUser.avatar,
          };
        }

        const defaultRole = await prisma.userRole.findFirst({
          where: { isDefault: true },
        });

        if (!defaultRole) {
          throw new Error(
            'Default role not found. Unable to create a new user.',
          );
        }

        // Create a new user and account
        const newUser = await prisma.user.create({
          data: {
            email: profile.email,
            name: profile.name,
            password: '', // No password for OAuth users
            avatar: profile.picture || null,
            emailVerifiedAt: new Date(),
            roleId: defaultRole.id,
            status: 'ACTIVE',
          },
        });

        return {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name || 'Anonymous',
          status: newUser.status,
          avatar: newUser.avatar,
          roleId: newUser.roleId,
          roleName: defaultRole.name,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
   async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.loginResponse = (user as any).raw ?? user;
        // Optional: also copy basic profile fields
        token.name = [ (user as any).firstName, (user as any).lastName ].filter(Boolean).join(' ') || token.name;
        token.email = (user as any).email || token.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      session.refreshToken = token.refreshToken as string | undefined;
      session.loginResponse = token.loginResponse;

      // Optional: expose names on session.user
      session.user = {
        ...session.user,
        email: token.email as string | undefined,
        name: token.name as string | undefined,
        firstName: (token as any).firstName ?? (session.user as any)?.firstName,
        lastName: (token as any).lastName ?? (session.user as any)?.lastName,
      };

      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
};

export default authOptions;
