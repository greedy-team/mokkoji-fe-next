import PeriodSection from '@/entities/recruit/ui/period-section';
import RecruitDetailHeaderControl from '@/features/club-detail/ui/club-detail-header-control';
import getStatus from '@/shared/lib/getStatus';
import RadiusTag from '@/shared/ui/radius-tag';

interface RecruitDetailHeaderProps {
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  instagram: string;
  clubId: number;
  isFavorite?: boolean;
  createdAt: string;
}

function RecruitDetailHeader({
  title,
  category,
  startDate,
  endDate,
  instagram,
  clubId,
  isFavorite,
  createdAt,
}: RecruitDetailHeaderProps) {
  const [date, time] = (createdAt || '').split('T');
  return (
    <>
      <header className="w-full cursor-default border-b border-b-[#D6D6D6] pb-4">
        <div className="mb-4 flex flex-row items-center gap-5">
          <h1 className="text-xl font-bold lg:text-4xl">{title}</h1>
          <p className="text-lg font-bold text-[#9C9C9C] lg:text-3xl">
            {category} 동아리
          </p>
        </div>
        <div className="mb-4 flex flex-row items-center gap-4 lg:text-xl">
          <RadiusTag
            label={getStatus(endDate).text}
            className={`${getStatus(endDate).backColor} ${getStatus(endDate).fontColor} lg:text-[16px]`}
          />
          <PeriodSection
            startDate={startDate}
            endDate={endDate}
            decoration={false}
            className="lg:text-lg"
          />
        </div>
        <div className="flex justify-between">
          <p className="lg:text-md mb-2 text-xs text-[#9C9C9C]">
            작성일: {date} {time}
          </p>
        </div>
      </header>
      <RecruitDetailHeaderControl
        instagram={instagram}
        clubId={clubId}
        isFavorite={isFavorite || false}
      />
    </>
  );
}

export default RecruitDetailHeader;
