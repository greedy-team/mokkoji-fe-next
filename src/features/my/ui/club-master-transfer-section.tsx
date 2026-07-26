'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { ManageClub } from '@/shared/model/type';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import postClubMasterTransfer from '../api/postClubMasterTransfer';

type ClubMasterTransferSectionProps = {
  clubs: ManageClub[];
};

function ClubMasterTransferSection({ clubs }: ClubMasterTransferSectionProps) {
  const router = useRouter();
  const [selectedClub, setSelectedClub] = useState<ManageClub | null>(null);
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (clubs.length === 0) {
    return null;
  }

  const closeDialog = () => {
    setSelectedClub(null);
    setCode('');
  };

  const handleTransfer = async () => {
    if (!selectedClub) {
      return;
    }

    setIsSubmitting(true);
    const response = await postClubMasterTransfer(selectedClub.clubId, code);
    setIsSubmitting(false);

    if (!response.ok) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);
    closeDialog();
    router.refresh();
  };

  return (
    <div className="mb-8 flex flex-col gap-2">
      {clubs.map((club) => (
        <button
          key={club.clubId}
          type="button"
          onClick={() => setSelectedClub(club)}
          className="bg-gray4 flex items-center justify-between rounded-lg px-4 py-3.5 text-left"
        >
          <span className="text-text-secondary text-sm font-medium">
            {`'${club.clubName}' 동아리장 위임하기`}
          </span>
          <Image src="/nextBlack.svg" alt="" width={8} height={12} />
        </button>
      ))}

      <Dialog
        open={selectedClub !== null}
        onOpenChange={(open) => {
          if (!open) {
            closeDialog();
          }
        }}
      >
        <DialogContent
          aria-describedby="club-master-transfer-desc"
          className="w-[400px] rounded-2xl"
        >
          <DialogHeader>
            <DialogTitle className="font-semibold">
              동아리장 권한을 위임하시겠어요?
            </DialogTitle>
            <DialogDescription
              id="club-master-transfer-desc"
              className="text-sm"
            >
              위임하시려면, 권한 위임받을 분의 코드를 입력해주세요.
              <br />
              (숫자+영문 6자리)
            </DialogDescription>
          </DialogHeader>

          <Input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            maxLength={6}
            placeholder="코드 6자리 입력"
            disabled={isSubmitting}
          />

          <DialogFooter className="flex flex-row gap-3">
            <Button
              variant="none"
              size="none"
              onClick={closeDialog}
              disabled={isSubmitting}
              className="flex-1 rounded-[8px] border border-[#1AE166] py-4 text-sm font-bold text-[#1AE166] transition-colors duration-200 hover:bg-[#1AE166]/10 disabled:pointer-events-none disabled:opacity-50"
            >
              취소
            </Button>
            <Button
              variant="none"
              size="none"
              onClick={handleTransfer}
              disabled={isSubmitting || code.length !== 6}
              className="flex-1 rounded-[8px] bg-[#1AE166] py-4 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#00c94c] disabled:cursor-not-allowed disabled:bg-[#93F3B8]"
            >
              {isSubmitting ? '위임 중…' : '권한 위임하기'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ClubMasterTransferSection;
