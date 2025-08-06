'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from './button';
import { ManageClub } from '../model/type';

interface ManageModalProps {
  open: boolean;
  onClose: () => void;
  manageClubInfo: ManageClub[];
  menu: string;
}

function ManageModal({
  open,
  onClose,
  manageClubInfo,
  menu,
}: ManageModalProps) {
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
    <div>
      {open && (
        <dialog
          ref={dialogRef}
          className="fixed top-1/2 left-1/2 z-10 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-none bg-white p-8 whitespace-normal"
        >
          <div className="flex flex-col gap-6">
            <h1 className="text-xl">
              {menu === 'register'
                ? '정보를 등록/수정할 동아리를 선택해주세요.'
                : '모집 공고를 작성할 동아리를 선택해주세요.'}
            </h1>
            <div className="flex flex-wrap gap-2">
              {manageClubInfo.map((club) => (
                <Button
                  asChild
                  variant="options"
                  size="none"
                  key={club.clubId}
                  type="button"
                  className="hover:border-[#00D451]"
                >
                  <Link
                    href={
                      menu === 'register'
                        ? `/club-register/${club.clubId}`
                        : `/post-recruitment/${club.clubId}`
                    }
                    onClick={onClose}
                  >
                    {club.clubName}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default ManageModal;
