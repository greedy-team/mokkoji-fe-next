'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';

interface ConfirmDialogProps {
  title: string;
  description: string;
  open: boolean;
  pending?: boolean;
  confirmLabel?: string;
  pendingLabel?: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

function ConfirmDialog({
  title,
  description,
  open,
  pending = false,
  confirmLabel = '확인',
  pendingLabel,
  onOpenChange,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={pending}
          >
            취소
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={onConfirm}
            disabled={pending}
          >
            {pending ? (pendingLabel ?? confirmLabel) : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog;
