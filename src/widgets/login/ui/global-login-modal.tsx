'use client';

import { createPortal } from 'react-dom';
import { useLoginModal } from '@/shared/lib/login-modal-context';
import LoginModal from './login-modal';

function GlobalLoginModal() {
  const { isOpen, closeLoginModal } = useLoginModal();

  if (typeof window === 'undefined') return null;

  return createPortal(
    <LoginModal open={isOpen} onClose={closeLoginModal} />,
    document.body,
  );
}

export default GlobalLoginModal;
