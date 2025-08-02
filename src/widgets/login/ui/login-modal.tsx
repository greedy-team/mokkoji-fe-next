'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import LoginWidget from '@/widgets/login/ui/login-widget';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

function LoginModal({ open, onClose }: LoginModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!open) return null;

  return createPortal(
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          onClose();
        }
      }}
      aria-label="모달 닫기 배경"
    >
      <div className="relative w-[400px] rounded-2xl bg-white p-8">
        <LoginWidget />
      </div>
    </div>,
    document.body,
  );
}

export default LoginModal;
