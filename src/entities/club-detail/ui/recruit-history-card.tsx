import { ClubRecruitments } from '@/views/club/model/type';

interface RecruitHistoryCardProps {
  recruitHistories: ClubRecruitments;
  isSelected: boolean;
}

function RecruitHistoryCard({
  recruitHistories,
  isSelected,
}: RecruitHistoryCardProps) {
  const formatDateDot = (iso: string) =>
    iso ? iso.slice(0, 10).replaceAll('-', '.') : '';

  return (
    <div
      data-selected={isSelected}
      className="ring-primary-500 flex h-[132px] w-full max-w-[360px] cursor-pointer flex-col gap-3.5 rounded-2xl bg-[#F8F8F8] px-6 py-6 data-[selected=true]:ring lg:gap-1 lg:py-5"
    >
      <span className="text-sm text-[#474747] lg:text-lg">
        {formatDateDot(recruitHistories.createdAt)}
      </span>
      <span className="line-clamp-2 font-semibold lg:text-lg">
        {recruitHistories.title}
      </span>
    </div>
  );
}

export default RecruitHistoryCard;
