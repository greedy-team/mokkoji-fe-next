'use client';

import { useState } from 'react';
import type { ApplicationStatus } from '@/features/admin/model/dashboard-types';
import { ClubCategoryLabel, ClubCategory } from '@/shared/model/type';
import TableDataCell from './TableDataCell';
import RejectReasonDialog from './RejectReasonDialog';
import ApproveCompleteDialog from './ApproveCompleteDialog';

interface ApplicationTableRowProps {
  applicationId: number;
  clubName: string;
  applicantName: string;
  category?: string;
  status: ApplicationStatus;
  createdAt: string;
  onApprove: (applicationId: number) => void;
  onReject: (applicationId: number, rejectReason?: string) => void;
}

function ApplicationTableRow({
  applicationId,
  clubName,
  applicantName,
  category,
  status,
  createdAt,
  onApprove,
  onReject,
}: ApplicationTableRowProps) {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [approveCompleteDialogOpen, setApproveCompleteDialogOpen] =
    useState(false);

  const formattedDate = createdAt.slice(0, 10).replace(/-/g, '.');

  const handleApprove = () => {
    onApprove(applicationId);
    setApproveCompleteDialogOpen(true);
  };

  const handleRejectConfirm = (reason?: string) => {
    onReject(applicationId, reason);
    setRejectDialogOpen(false);
  };

  return (
    <>
      <div className="flex w-full items-center border-b border-[#D6D6D6] py-2.5">
        <TableDataCell width="w-[120px]">{formattedDate}</TableDataCell>
        <TableDataCell width="w-[160px]">{clubName}</TableDataCell>
        {category !== undefined && (
          <TableDataCell width="w-[100px]">
            {ClubCategoryLabel[category as ClubCategory] ?? category}
          </TableDataCell>
        )}
        <TableDataCell width="flex-1">{applicantName}</TableDataCell>
        <div className="flex w-[152px] items-center gap-2">
          {status === 'PENDING' ? (
            <>
              <button
                type="button"
                onClick={handleApprove}
                className="flex h-9 w-[72px] items-center justify-center rounded-[30px] bg-[#4AF38A] text-[14px] leading-[140%] font-medium tracking-[-0.03em] text-[#000000] transition-colors hover:bg-[#22CF64]"
              >
                승인하기
              </button>
              <button
                type="button"
                onClick={() => setRejectDialogOpen(true)}
                className="flex h-9 w-[72px] items-center justify-center rounded-[30px] border border-[#22CF64] bg-white text-[14px] leading-[140%] font-medium tracking-[-0.03em] text-[#22CF64] transition-colors hover:bg-[#f0fff6]"
              >
                반려하기
              </button>
            </>
          ) : (
            <span
              className={`text-[14px] leading-[140%] font-medium tracking-[-0.03em] ${status === 'APPROVED' ? 'text-[#22CF64]' : 'text-[#8B95A1]'}`}
            >
              {status === 'APPROVED' ? '승인됨' : '반려됨'}
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
    </>
  );
}

export default ApplicationTableRow;
