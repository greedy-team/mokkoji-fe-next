import PeriodSection from '@/entities/recruit/ui/period-section';
import ClubDetailHeaderControl from '@/features/club-detail/ui/club-detail-header-control';
import RadiusTag from '@/shared/ui/radius-tag';
import { ClubCategoryToLabel, RecruitStatus } from '@/shared/model/type';
import Link from 'next/link';
import ClickLogo from '@/shared/ui/click-logo';

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
    <header className="mb-5 w-full cursor-default pb-4">
      <div className="mb-4 flex flex-row items-center gap-5">
        <ClickLogo logo={logo} title={title} />
        <h1 className="text-xl font-bold lg:text-4xl">{title}</h1>
        <p className="text-lg font-bold text-[#9C9C9C] lg:text-3xl">
          <Link
            href={`/club?category=${ClubCategoryToLabel[category].toLowerCase()}`}
          >
            {category} 동아리
          </Link>
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
      <ClubDetailHeaderControl
        instagram={instagram}
        clubId={clubId}
        isFavorite={isFavorite || false}
      />
    </header>
  );
}

export default ClubDetailHeader;
