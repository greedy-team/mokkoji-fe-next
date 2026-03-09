'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UserRole } from '@/shared/model/type';

interface SessionUser {
  studentId: number;
  department: string;
  name: string;
  grade: string;
  email: string;
}

interface SessionData {
  user: SessionUser;
  role?: UserRole;
  accessToken?: string;
}

interface SessionContextValue {
  session: SessionData | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  refresh: () => void;
}

const SessionContext = createContext<SessionContextValue>({
  session: null,
  status: 'loading',
  refresh: () => {},
});

export function AppSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<SessionData | null>(null);
  const [status, setStatus] =
    useState<SessionContextValue['status']>('loading');

  const fetchSession = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/session');
      const json = await res.json();
      if (json?.user) {
        setSession(json);
        setStatus('authenticated');
      } else {
        setSession(null);
        setStatus('unauthenticated');
      }
    } catch {
      setSession(null);
      setStatus('unauthenticated');
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const value = useMemo(
    () => ({ session, status, refresh: fetchSession }),
    [session, status, fetchSession],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
