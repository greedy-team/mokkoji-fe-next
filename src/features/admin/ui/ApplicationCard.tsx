'use client';

import { useState } from 'react';
import type { ApplicationCardItem } from '@/features/admin/model/dashboard-types';
import { ClubCategoryLabel, ClubCategory } from '@/shared/model/type';
import RejectReasonDialog from './RejectReasonDialog';
import ApproveCompleteDialog from './ApproveCompleteDialog';
import DescriptionViewDialog from './DescriptionViewDialog';

interface ApplicationCardProps {
  item: ApplicationCardItem;
  onApprove: () => void;
  onReject: (rejectReason?: string) => void;
}

function ApplicationCard({ item, onApprove, onReject }: ApplicationCardProps) {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [approveCompleteDialogOpen, setApproveCompleteDialogOpen] =
    useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  const formattedDate = item.createdAt.slice(0, 10).replace(/-/g, '.');
  const categoryLabel = item.category
    ? (ClubCategoryLabel[item.category as ClubCategory] ?? item.category)
    : null;
  const resolveInstagramHref = (instagram: string) =>
    instagram.startsWith('http') ? instagram : `https://${instagram}`;
  const instagramHref = item.instagram
    ? resolveInstagramHref(item.instagram)
    : null;
  const hasLogo = !!item.logo && /^https?:\/\//.test(item.logo);

  const handleApprove = () => {
    onApprove();
    setApproveCompleteDialogOpen(true);
  };

  const handleRejectConfirm = (reason?: string) => {
    onReject(reason);
    setRejectDialogOpen(false);
  };

  return (
    <>
      <div className="flex w-full items-center justify-between border-b border-[#D6D6D6] py-3">
        <div className="flex items-center gap-6">
          <span className="w-12 shrink-0 text-center text-[12px] leading-[100%] font-normal text-[#474747]">
            {item.applicantName}
          </span>
          <div className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full bg-[#F8F8F8]">
            {hasLogo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.logo}
                alt={`${item.clubName} 로고`}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="flex w-[160px] shrink-0 flex-col gap-3">
            <div className="flex w-fit items-center justify-center rounded-[30px] border border-[#22CF64] px-2.5 py-1.5">
              <span className="text-[12px] leading-[100%] font-normal text-[#22CF64]">
                {item.universityName}
              </span>
            </div>
            <div className="flex flex-col gap-px">
              <span className="w-full truncate text-[20px] leading-[140%] font-semibold tracking-[-0.03em] text-[#000000]">
                {item.clubName}
              </span>
              <span className="text-[12px] leading-[140%] font-normal text-[#8B95A1]">
                {formattedDate}
              </span>
            </div>
          </div>
          <div className="flex w-[220px] shrink-0 items-center gap-1.5 overflow-hidden">
            {categoryLabel && (
              <span className="text-[14px] leading-[140%] font-medium tracking-[-0.03em] whitespace-nowrap text-[#8B95A1]">
                {categoryLabel}
              </span>
            )}
            {item.affiliation && (
              <>
                <span className="h-0.5 w-0.5 shrink-0 rounded-full bg-[#D6D6D6]" />
                <span className="text-[14px] leading-[140%] font-medium tracking-[-0.03em] whitespace-nowrap text-[#8B95A1]">
                  {item.affiliation}
                </span>
              </>
            )}
          </div>
          <div className="flex w-[130px] shrink-0 items-center">
            {instagramHref && (
              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-[20px] border border-[#E2E2E2]/70 bg-white py-2 pr-3 pl-2"
              >
                <span className="text-[8px] leading-[10px] text-[#6A6B6B]">
                  🔗
                </span>
                <span className="text-[10px] leading-[12px] font-normal tracking-[-0.03em] text-[#6A6B6B]">
                  instagram
                </span>
              </a>
            )}
          </div>
          <div className="w-[110px] shrink-0">
            {item.description && (
              <button
                type="button"
                onClick={() => setDescriptionOpen(true)}
                className="cursor-pointer border-b border-[#8B95A1] text-[12px] leading-[100%] font-normal text-[#8B95A1]"
              >
                한 줄 소개 보기
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {item.status === 'PENDING' ? (
            <>
              <button
                type="button"
                onClick={handleApprove}
                className="flex h-9 w-[72px] cursor-pointer items-center justify-center rounded-[30px] bg-[#4AF38A] text-[14px] leading-[140%] font-medium tracking-[-0.03em] text-[#000000] transition-colors hover:bg-[#22CF64]"
              >
                승인하기
              </button>
              <button
                type="button"
                onClick={() => setRejectDialogOpen(true)}
                className="flex h-9 w-[72px] cursor-pointer items-center justify-center rounded-[30px] border border-[#22CF64] bg-white text-[14px] leading-[140%] font-medium tracking-[-0.03em] text-[#22CF64] transition-colors hover:bg-[#f0fff6]"
              >
                반려하기
              </button>
            </>
          ) : (
            <span
              className={`text-[14px] leading-[140%] font-medium tracking-[-0.03em] ${item.status === 'APPROVED' ? 'text-[#22CF64]' : 'text-[#8B95A1]'}`}
            >
              {item.status === 'APPROVED' ? '승인됨' : '반려됨'}
            </span>
          )}
        </div>
      </div>

      <RejectReasonDialog
        open={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        onConfirm={handleRejectConfirm}
      />

      <ApproveCompleteDialog
        open={approveCompleteDialogOpen}
        onClose={() => setApproveCompleteDialogOpen(false)}
      />

      {item.description && (
        <DescriptionViewDialog
          open={descriptionOpen}
          onClose={() => setDescriptionOpen(false)}
          clubName={item.clubName}
          description={item.description}
        />
      )}
    </>
  );
}

export default ApplicationCard;
