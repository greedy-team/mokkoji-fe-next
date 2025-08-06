'use client';

import { useEffect, useRef } from 'react';
import LoginWidget from '@/widgets/login/ui/login-widget';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

function LoginModal({ open, onClose }: LoginModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener('cancel', handleCancel);

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed top-1/2 left-1/2 z-10 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-none bg-white p-8"
    >
      <LoginWidget />
    </dialog>
  );
}

export default LoginModal;
