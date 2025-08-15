'use client';

import Link from 'next/link';
import { ManageClub } from '../model/type';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from './dialog';
import { Button } from './button';

interface ManageModalProps {
  open: boolean;
  onClose: () => void;
  manageClubInfo: ManageClub[];
  menu: string; // 'register' | 'recruit' 등
}

function ManageModal({
  open,
  onClose,
  manageClubInfo,
  menu,
}: ManageModalProps) {
  const title =
    menu === 'register'
      ? '정보를 등록/수정할 동아리를 선택해주세요.'
      : '모집 공고를 작성할 동아리를 선택해주세요.';

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogOverlay />
      <DialogContent className="w-full max-w-[calc(100%-2rem)] p-8 whitespace-normal sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex flex-wrap gap-2">
          {manageClubInfo.length > 0 &&
            manageClubInfo.map((club) => (
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
      </DialogContent>
    </Dialog>
  );
}

export default ManageModal;
