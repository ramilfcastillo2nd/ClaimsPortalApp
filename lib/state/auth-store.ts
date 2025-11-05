import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type LoginResponse = any;

interface AuthState {
  loginResponse: LoginResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
  setLogin: (payload: LoginResponse) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      loginResponse: null,
      accessToken: null,
      refreshToken: null,
      setLogin: (payload) =>
        set({
          loginResponse: payload,
          accessToken: payload?.token ?? payload?.accessToken ?? null,
          refreshToken: payload?.refreshToken ?? null,
        }),
      clear: () => set({ loginResponse: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        loginResponse: s.loginResponse,
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
      }),
    }
  )
);