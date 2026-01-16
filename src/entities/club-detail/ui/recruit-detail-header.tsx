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
  const [year, month, day] = date.split('-');
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  return (
    <header className="w-full cursor-default">
      <div className="mb-4 flex flex-row items-center gap-2.5 lg:gap-5">
        <ClickLogo logo={logo} title={title} />
        <h1 className="text-xl font-bold whitespace-nowrap lg:text-4xl">
          {title}
        </h1>
        <p className="text-lg font-bold whitespace-nowrap text-[#9C9C9C] lg:text-3xl">
          <Link href={`/recruit?category=${ClubCategoryToLabel[category]}`}>
            {category} 동아리
          </Link>
        </p>
      </div>
      <div className="slg:text-xl mb-4 flex gap-4">
        <RadiusTag
          status={status}
          className="whitespace-nowrap lg:text-[16px]"
        />
        <div className="flex flex-col">
          <PeriodSection
            startDate={startDate}
            endDate={endDate}
            decoration={false}
            className="whitespace-nowrap lg:text-lg"
          />
          <div className="flex">
            {date && (
              <p className="lg:text-md mb-2 text-sm text-[#9C9C9C]">
                작성일 · {formattedDate}
              </p>
            )}
          </div>
        </div>
        <RecruitDetailHeaderControl
          instagram={instagram}
          clubId={clubId}
          isFavorite={isFavorite || false}
        />
      </div>
    </header>
  );
}

export default RecruitDetailHeader;
