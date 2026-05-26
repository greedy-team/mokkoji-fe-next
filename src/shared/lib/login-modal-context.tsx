'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface LoginModalContextValue {
  isOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const LoginModalContext = createContext<LoginModalContextValue>({
  isOpen: false,
  openLoginModal: () => {},
  closeLoginModal: () => {},
});

export function LoginModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const openLoginModal = useCallback(() => router.push('/login'), [router]);
  const closeLoginModal = useCallback(() => {}, []);

  const value = useMemo(
    () => ({ isOpen: false, openLoginModal, closeLoginModal }),
    [openLoginModal, closeLoginModal],
  );

  return (
    <LoginModalContext.Provider value={value}>
      {children}
    </LoginModalContext.Provider>
  );
}

export function useLoginModal() {
  return useContext(LoginModalContext);
}
