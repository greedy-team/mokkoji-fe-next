'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

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
  const [isOpen, setIsOpen] = useState(false);

  const openLoginModal = useCallback(() => setIsOpen(true), []);
  const closeLoginModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openLoginModal, closeLoginModal }),
    [isOpen, openLoginModal, closeLoginModal],
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
