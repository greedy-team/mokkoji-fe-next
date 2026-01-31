import Link from 'next/link';
import RecruitDetailHeaderControl from '@/features/club-detail/ui/club-detail-header-control';
import RadiusTag from '@/shared/ui/radius-tag';
import {
  ClubCategoryToLabel,
  RecruitStatus,
  ClubCategoryToStringLabel,
  ClubCategory,
} from '@/shared/model/type';
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
  isAlwaysRecruiting: boolean;
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
  isAlwaysRecruiting,
}: RecruitDetailHeaderProps) {
  const [date] = (createdAt || '').split('T');
  const [year, month, day] = date.split('-');
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  return (
    <header className="w-full cursor-default">
      <div className="mb-4 flex flex-row items-center gap-3.5 lg:mb-8 lg:gap-4">
        <ClickLogo logo={logo} title={title} />
        <div className="flex min-w-0 items-center gap-2">
          <h1 className="text-2xl font-bold whitespace-nowrap lg:text-4xl">
            {title}
          </h1>
          <p className="truncate text-2xl font-bold whitespace-nowrap text-[#9C9C9C] lg:text-4xl">
            <Link href={`/recruit?category=${ClubCategoryToLabel[category]}`}>
              {ClubCategoryToStringLabel[category as ClubCategory]} 동아리
            </Link>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:text-xl">
        <RadiusTag
          recruitStatus={status}
          className="shrink-0 px-3 py-2 text-xs whitespace-nowrap lg:px-4 lg:py-3 lg:text-[14px]"
        />
        <div className="flex flex-col gap-1 lg:gap-2">
          <PeriodSection
            startDate={startDate}
            endDate={endDate}
            decoration={false}
            className="text-sm whitespace-nowrap lg:text-lg"
            isAlwaysRecruiting={isAlwaysRecruiting}
          />
          <div className="mr-auto shrink-0">
            {date && (
              <p className="mt-1 text-sm text-[#9C9C9C]">
                작성일 · {formattedDate}
              </p>
            )}
          </div>
        </div>
        <div className="shrink-0 lg:mt-0 lg:ml-auto">
          <RecruitDetailHeaderControl
            instagram={instagram}
            clubId={clubId}
            isFavorite={isFavorite || false}
          />
        </div>
      </div>
    </header>
  );
}

export default RecruitDetailHeader;
