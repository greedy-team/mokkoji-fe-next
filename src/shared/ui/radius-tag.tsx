import clsx from 'clsx';
import { RecruitStatus } from '@/shared/model/type';

export const RecruitStatusLabel: Record<RecruitStatus, string> = {
  OPEN: '모집중',
  CLOSED: '모집마감',
  BEFORE: '모집전',
  IMMINENT: '마감임박',
};

export const RecruitStatusColor: Record<RecruitStatus, string> = {
  OPEN: 'bg-[#00E457] text-white',
  CLOSED: 'bg-[#E9E7E7] text-[#9C9C9C]',
  BEFORE: 'bg-[#D9D9D9] text-[#9C9C9C]',
  IMMINENT: 'bg-[#F9796F] text-[#FCD7D4]',
};

interface RadiusTagProps {
  className?: string;
  status: RecruitStatus;
}

function RadiusTag({ className, status }: RadiusTagProps) {
  return (
    <span
      className={clsx(
        'inline-block h-[27px] rounded-[13px] px-[12px] text-center text-xs leading-[27px] font-semibold whitespace-nowrap',
        RecruitStatusColor[status],
        className,
      )}
    >
      {RecruitStatusLabel[status]}
    </span>
  );
}

export default RadiusTag;
