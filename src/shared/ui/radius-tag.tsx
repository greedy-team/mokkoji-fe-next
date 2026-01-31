import clsx from 'clsx';
import { RecruitStatus } from '@/widgets/club/model/type';

export const RecruitStatusLabel: Record<RecruitStatus, string> = {
  OPEN: '모집중',
  CLOSED: '모집마감',
  BEFORE: '모집전',
  IMMINENT: '마감임박',
  ALWAYS: '상시모집',
};

export const RecruitStatusColor: Record<RecruitStatus, string> = {
  OPEN: 'bg-[#4AF38A] text-black',
  CLOSED: 'bg-[#E9E7E7] text-[#9C9C9C]',
  BEFORE: 'bg-[#D9D9D9] text-[#9C9C9C]',
  IMMINENT: 'bg-[#F9796F] text-[#FCD7D4]',
  ALWAYS: 'bg-[#4AF38A] text-black',
};

interface RadiusTagProps {
  className?: string;
  recruitStatus: RecruitStatus;
}

function RadiusTag({ className, recruitStatus }: RadiusTagProps) {
  return (
    <span
      className={clsx(
        'flex rounded-full text-center leading-none whitespace-nowrap',
        RecruitStatusColor[recruitStatus],
        className,
      )}
    >
      {RecruitStatusLabel[recruitStatus]}
    </span>
  );
}

export default RadiusTag;
