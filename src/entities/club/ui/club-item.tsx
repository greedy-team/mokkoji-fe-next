'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import RadiusTag from '@/shared/ui/radius-tag';
import { RecruitStatus } from '@/shared/model/type';
import FavoriteButton from '@/shared/ui/favorite-button';
import PeriodSection from '../../club-detail/ui/period-section';

interface ClubItemProps {
  title: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  isFavorite?: boolean;
  logo?: string;
  clubId: string;
  status: RecruitStatus;
  height?: number;
}

function ClubItem({
  title,
  name,
  startDate,
  endDate,
  description,
  isFavorite,
  logo,
  clubId,
  status,
  height = 150,
}: ClubItemProps) {
  return (
    <div
      style={{ height }}
      className="hover:shadow-[0_0_20px_1px_rgba(0,0,0,0.2) relative flex w-[100%] flex-col gap-3 rounded-xl bg-[#F8F8F8] px-7 py-8 text-[#474747] transition-shadow duration-300"
    >
      <div className="flex w-full">
        <div className="flex w-full items-center gap-4">
          <Avatar className="h-[54px] w-[54px]">
            <AvatarImage src={logo} alt={logo} />
            <AvatarFallback />
          </Avatar>

          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-1">
              <h1 className="text-text-primary leading-none font-extrabold whitespace-nowrap lg:text-[24px]">
                {name}
              </h1>

              <FavoriteButton
                isFavorite={isFavorite || false}
                clubId={clubId}
                customClass="scale-80 lg:scale-100 flex-1"
              />

              <RadiusTag status={status} className="shrink-0" />
            </div>

            <div className="whitespace-nowrap">
              <PeriodSection startDate={startDate} endDate={endDate} />
            </div>
          </div>
        </div>
      </div>

      <p className="weight-600 overflow-hidden text-[16px] font-semibold break-words text-ellipsis whitespace-nowrap text-[#474747]">
        {description}
      </p>
    </div>
  );
}

export default ClubItem;
