import PeriodSection from '@/entities/recruit/ui/period-section';
import ClubDetailHeaderControl from '@/features/club-detail/ui/club-detail-header-control';
import RadiusTag from '@/shared/ui/radius-tag';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { RecruitStatus } from '@/shared/model/type';

interface ClubDetailHeaderProps {
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  instagram: string;
  clubId: number;
  isFavorite?: boolean;
  logo: string;
  status: RecruitStatus;
}

function ClubDetailHeader({
  title,
  category,
  startDate,
  endDate,
  instagram,
  clubId,
  logo,
  isFavorite,
  status,
}: ClubDetailHeaderProps) {
  return (
    <>
      <header className="w-full cursor-default border-b border-b-[#D6D6D6] pb-4">
        <div className="mb-4 flex flex-row items-center gap-5">
          <Avatar className="size-12 lg:size-14">
            <AvatarImage src={logo} />
            <AvatarFallback />
          </Avatar>
          <h1 className="text-xl font-bold lg:text-4xl">{title}</h1>
          <p className="text-lg font-bold text-[#9C9C9C] lg:text-3xl">
            {category} 동아리
          </p>
        </div>
        <div className="mb-2 flex flex-row items-center gap-2 lg:text-xl">
          <RadiusTag status={status} className="lg:text-[16px]" />
          <PeriodSection
            startDate={startDate}
            endDate={endDate}
            decoration={false}
            className="lg:text-lg"
          />
        </div>
      </header>
      <ClubDetailHeaderControl
        instagram={instagram}
        clubId={clubId}
        isFavorite={isFavorite || false}
      />
    </>
  );
}

export default ClubDetailHeader;
