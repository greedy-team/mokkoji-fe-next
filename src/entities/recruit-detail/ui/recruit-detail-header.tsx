import PeriodSection from '@/entities/recruit/ui/period-section';
import RecruitDetailHeaderControl from '@/features/recruit-detail/ui/club-detail-header-control';
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
}

function RecruitDetailHeader({
  title,
  category,
  startDate,
  endDate,
  instagram,
  clubId,
  isFavorite,
}: RecruitDetailHeaderProps) {
  return (
    <>
      <header className="w-full cursor-default border-b border-b-[#D6D6D6] pb-4">
        <div className="mb-4 flex flex-row items-center gap-5">
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-xl font-bold text-[#9C9C9C]">{category} 동아리</p>
        </div>
        <div className="mb-2 flex flex-row items-center gap-2 text-xl">
          <RadiusTag
            label={getStatus(endDate).text}
            className={`${getStatus(endDate).backColor} ${getStatus(endDate).fontColor} w-[60px]`}
          />
          <PeriodSection
            startDate={startDate}
            endDate={endDate}
            decoration={false}
          />
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
