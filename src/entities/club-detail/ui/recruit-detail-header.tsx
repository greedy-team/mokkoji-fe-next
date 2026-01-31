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
      <div className="mb-8 flex flex-row items-center gap-4">
        <ClickLogo logo={logo} title={title} />
        <h1 className="text-xl font-bold whitespace-nowrap lg:text-4xl">
          {title}
        </h1>
        <p className="text-lg font-bold whitespace-nowrap text-[#9C9C9C] lg:text-4xl">
          <Link href={`/recruit?category=${ClubCategoryToLabel[category]}`}>
            {category} 동아리
          </Link>
        </p>
      </div>
      <div className="flex items-center gap-6 lg:text-xl">
        <RadiusTag
          recruitStatus={status}
          className="shrink-0 px-4 py-3 whitespace-nowrap lg:text-[14px]"
        />
        <div className="flex flex-col gap-2 pt-4">
          <PeriodSection
            startDate={startDate}
            endDate={endDate}
            decoration={false}
            className="whitespace-nowrap lg:text-lg"
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
        <div className="ml-auto shrink-0">
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
