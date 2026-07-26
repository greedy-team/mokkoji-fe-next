import ConfirmDialog from '@/shared/ui/ConfirmDialog';

interface DeleteDialogProps {
  targetName: string | undefined;
  open: boolean;
  pending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

function DeleteDialog({
  targetName,
  open,
  pending,
  onOpenChange,
  onConfirm,
}: DeleteDialogProps) {
  return (
    <ConfirmDialog
      title="삭제"
      description={`"${targetName}"을(를) 삭제하시겠습니까? 삭제된 항목은 복구할 수 없습니다.`}
      open={open}
      pending={pending}
      confirmLabel="삭제"
      pendingLabel="삭제 중…"
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
    />
  );
}

export default DeleteDialog;
