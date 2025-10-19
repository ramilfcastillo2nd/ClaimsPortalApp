'use client';

import { useAuth } from '@/hooks/auth';
import { ClaimList } from './components';
export default function ClaimPage() {
  const { user, session, logout, token } = useAuth();
  return <ClaimList mode="card" />;
}
  