'use client';

import { FavoriteDeadLineItem } from '@/features/favorite/model/type';
import formatKoreanDate from '@/features/favorite/util/formatKoreanDate';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import Link from 'next/link';

interface RecruitEndModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  selectedClubs: FavoriteDeadLineItem[];
  date: Date;
}

function RecruitEndModal({
  modalOpen,
  setModalOpen,
  selectedClubs,
  date,
}: RecruitEndModalProps) {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="mt-5 text-center font-bold">
            {formatKoreanDate(date)}
          </DialogTitle>
        </DialogHeader>
        <ul className="mt-2 mb-5 overflow-y-auto text-center text-sm font-semibold">
          {selectedClubs.length > 0 ? (
            selectedClubs.map((club) => (
              <li key={club.clubId}>
                <Link
                  href={`club/${club.clubId}`}
                  className="mr-2 text-[#00E457] underline"
                >
                  {club.clubName}
                </Link>{' '}
                모집 마감
              </li>
            ))
          ) : (
            <li>마감된 동아리가 없습니다.</li>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export default RecruitEndModal;
