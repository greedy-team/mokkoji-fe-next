'use client';

import LoginWidget from '@/widgets/login/ui/login-widget';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

function LoginModal({ open, onClose }: LoginModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogOverlay />
      <DialogContent className="mb-5 h-[430px] p-10 sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="sr-only">로그인</DialogTitle>
        </DialogHeader>
        <LoginWidget />
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
