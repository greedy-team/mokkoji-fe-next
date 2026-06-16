'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import { ClubApplicationType } from '@/entities/my/model/type';

type ClubApplicationCardProps = {
  application: ClubApplicationType;
};

function ClubApplicationCard({ application }: ClubApplicationCardProps) {
  const [showRejectReason, setShowRejectReason] = useState(false);
  const { clubName, universityName, status, createdAt, rejectReason } =
    application;

  return (
    <li className="flex flex-col gap-3 rounded-2xl border-2 border-[#22CF64] p-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl font-semibold">
          {clubName}{' '}
          <span className="text-text-tertiary text-lg">{universityName}</span>
        </span>
        <span className="text-text-tertiary text-sm">
          신청일시 | {dayjs(createdAt).format('YYYY.MM.DD')}
        </span>
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
            <button
              type="button"
              onClick={() => setShowRejectReason((prev) => !prev)}
              className="text-text-tertiary text-xs underline"
            >
              반려 사유 확인
            </button>
          </div>
        )}
      </div>

      {status === 'REJECTED' && showRejectReason && rejectReason && (
        <span className="text-alert-500 text-xs">{rejectReason}</span>
      )}
    </li>
  );
}

export default ClubApplicationCard;
