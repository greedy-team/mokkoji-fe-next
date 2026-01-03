import { ClubRecruitments } from '@/views/club/model/type';

interface RecruitHistoryCardProps {
  recruitHistories: ClubRecruitments;
}

function RecruitHistoryCard({ recruitHistories }: RecruitHistoryCardProps) {
  const formatDateDot = (iso: string) =>
    iso ? iso.slice(0, 10).replaceAll('-', '.') : '';

  return (
    //   <div className="border-primary-500 h-[132px] w-[360px] rounded-2xl border bg-gray-50 px-2 py-4"></div>
    <div className="flex h-[132px] w-full max-w-[360px] cursor-pointer flex-col gap-3.5 rounded-2xl bg-[#F8F8F8] px-6 py-6 lg:gap-1 lg:py-5">
      <span className="text-sm text-[#474747] lg:text-lg">
        {formatDateDot(recruitHistories.createdAt)}
      </span>
      <span className="font-semibold lg:text-lg">{recruitHistories.title}</span>
    </div>
  );
}

export default RecruitHistoryCard;
