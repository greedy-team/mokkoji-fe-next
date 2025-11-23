import Link from 'next/link';
import RecruitDetailHeaderControl from '@/features/club-detail/ui/club-detail-header-control';
import RadiusTag from '@/shared/ui/radius-tag';
import { ClubCategoryToLabel, RecruitStatus } from '@/shared/model/type';
import ClickLogo from '@/shared/ui/click-logo';
import PeriodSection from '@/entities/club-detail/ui/period-section';

interface RecruitDetailHeaderProps {
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  instagram: string;
  clubId: number;
  isFavorite?: boolean;
  createdAt: string;
  logo: string;
  status: RecruitStatus;
}

function RecruitDetailHeader({
  title,
  category,
  startDate,
  endDate,
  instagram,
  clubId,
  isFavorite,
  logo,
  createdAt,
  status,
}: RecruitDetailHeaderProps) {
  const [date, time] = (createdAt || '').split('T');
  return (
    <>
      <header className="w-full cursor-default">
        <div className="mb-4 flex flex-row items-center gap-5">
          <ClickLogo logo={logo} title={title} />
          <h1 className="text-xl font-bold lg:text-4xl">{title}</h1>
          <p className="text-lg font-bold text-[#9C9C9C] lg:text-3xl">
            <Link
              href={`/recruit?category=${ClubCategoryToLabel[category].toLowerCase()}`}
            >
              {category} 동아리
            </Link>
          </p>
        </div>
        <div className="mb-4 flex flex-row items-center gap-4 lg:text-xl">
          <RadiusTag status={status} className="lg:text-[16px]" />
          <PeriodSection
            startDate={startDate}
            endDate={endDate}
            decoration={false}
            className="lg:text-lg"
          />
        </div>
        <div className="flex justify-between">
          {date && (
            <p className="lg:text-md mb-2 text-sm text-[#9C9C9C]">
              작성일: {date} {time}
            </p>
          )}
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
