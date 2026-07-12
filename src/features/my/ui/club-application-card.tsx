'use client';

import dayjs from 'dayjs';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { ApplicationCardItem } from '@/entities/my/model/type';

type ClubApplicationCardProps = {
  item: ApplicationCardItem;
  showLogo?: boolean;
};

function ClubApplicationCard({
  item,
  showLogo = false,
}: ClubApplicationCardProps) {
  const { clubName, universityName, status, createdAt, rejectReason, logo } =
    item;

  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-[#22CF64] p-4">
      <div className="flex items-center gap-4">
        {showLogo && (
          <Avatar className="size-13">
            <AvatarImage src={logo ?? ''} alt={clubName} />
            <AvatarFallback />
          </Avatar>
        )}
        <div className="flex flex-col gap-1">
          <span className="font-semibold">
            {clubName}{' '}
            <span className="text-text-tertiary text-lg">{universityName}</span>
          </span>
          <span className="text-text-tertiary text-sm">
            신청일시 | {dayjs(createdAt).format('YYYY.MM.DD')}
          </span>
        </div>
      </div>

      <div className="h-0.5 w-full rounded-full bg-[#f8f8f8]">
        <div
          className={`bg-gradient-primary h-1 rounded-full ${
            status === 'PENDING' ? 'w-1/2' : 'w-full'
          }`}
        />
      </div>

      <div className="mx-2 flex items-center justify-between">
        <span
          className={`text-sm ${
            status === 'PENDING' ? 'text-[#22CF64]' : 'text-text-tertiary'
          }`}
        >
          승인 대기
        </span>

        {status === 'PENDING' && (
          <span className="text-text-tertiary text-sm">승인/반려</span>
        )}

        {status === 'APPROVED' && (
          <span className="rounded-full border border-[#22CF64] px-3 py-1 text-xs text-[#22CF64]">
            승인
          </span>
        )}

        {status === 'REJECTED' && (
          <div className="flex items-center gap-2">
            <span className="text-alert-500 border-alert-500 rounded-full border px-3 py-1 text-xs">
              반려
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="text-text-tertiary text-xs underline"
                >
                  반려 사유 확인
                </button>
              </DialogTrigger>
              <DialogContent
                aria-describedby="reject-reason-description"
                className="w-[400px] rounded-2xl"
              >
                <DialogHeader>
                  <DialogTitle className="flex items-start font-semibold">
                    반려 사유
                  </DialogTitle>
                </DialogHeader>
                <DialogDescription
                  id="reject-reason-description"
                  className="text-text-secondary text-sm"
                >
                  {rejectReason}
                </DialogDescription>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="submit-default"
                      className="mt-2 rounded-xl bg-[#4AF38A] py-6 font-normal text-[#474747] disabled:text-white"
                    >
                      확인
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </li>
  );
}

export default ClubApplicationCard;
