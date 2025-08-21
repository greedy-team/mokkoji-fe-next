import clsx from 'clsx';
import { RecruitStatus } from '@/shared/model/type';

export const RecruitStatusLabel: Record<RecruitStatus, string> = {
  OPEN: '모집 중',
  CLOSED: '모집 마감',
  BEFORE: '모집 전',
  IMMINENT: '마감 임박',
};

export const RecruitStatusColor: Record<RecruitStatus, string> = {
  OPEN: 'bg-[#00E457] text-white',
  CLOSED: 'bg-[#E9E7E7] text-gray-600',
  BEFORE: 'bg-gray-200 text-gray-600',
  IMMINENT: 'bg-red-100 text-red-600',
};

interface RadiusTagProps {
  className?: string;
  status: RecruitStatus;
}

function RadiusTag({ className, status }: RadiusTagProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center rounded-full px-[11px] py-[7px] text-center text-[12px] font-semibold lg:py-[7px] lg:text-xs',
        RecruitStatusColor[status],
        className,
      )}
    >
      {RecruitStatusLabel[status]}
    </span>
  );
}

export default RadiusTag;
