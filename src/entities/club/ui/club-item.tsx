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
      className="hover:shadow-[0_0_20px_1px_rgba(0,0,0,0.2) relative flex w-[100%] flex-col gap-3 rounded-lg bg-[#F8F8F8] px-7 py-8 text-[#474747] transition-shadow duration-300"
    >
      <div className="flex w-full items-center">
        <div className="flex gap-4">
          <Avatar className="h-[54px] w-[54px]">
            <AvatarImage src={logo} alt={logo} />
            <AvatarFallback />
          </Avatar>

          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <h1 className="text-text-primary min-w-0 font-extrabold whitespace-nowrap lg:text-2xl">
                {name}
              </h1>

              <div className="shrink-0">
                <FavoriteButton
                  isFavorite={isFavorite || false}
                  clubId={clubId}
                  customClass="scale-80 lg:scale-100"
                />
              </div>

              <RadiusTag
                status={status}
                className="absolute top-8 right-7 shrink-0 lg:text-[16px]"
              />
            </div>

            <div className="mt-1 whitespace-nowrap">
              <PeriodSection startDate={startDate} endDate={endDate} />
            </div>
          </div>
        </div>
      </div>

      <p className="overflow-hidden text-[12px] break-words text-ellipsis whitespace-nowrap lg:text-xs">
        {description}
      </p>
    </div>
  );
}

export default ClubItem;
