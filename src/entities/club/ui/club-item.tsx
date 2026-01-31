'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import RadiusTag from '@/shared/ui/radius-tag';
import { RecruitStatus } from '@/widgets/club/model/type';
import FavoriteButton from '@/shared/ui/favorite-button';
import PeriodSection from '../../club-detail/ui/period-section';

interface ClubItemProps {
  name: string;
  startDate?: string;
  endDate?: string;
  description: string;
  favorite: boolean;
  logo?: string;
  id: number;
  recruitStatus?: RecruitStatus;
  isAlwaysRecruiting: boolean;
  height?: number;
}

function ClubItem({
  name,
  startDate,
  endDate,
  description,
  favorite,
  logo,
  id,
  recruitStatus,
  isAlwaysRecruiting,
  height = 150,
}: ClubItemProps) {
  return (
    <div
      style={{ height }}
      className="hover:shadow-[0_0_20px_1px_rgba(0,0,0,0.2) relative flex w-[100%] flex-col gap-3 rounded-xl bg-[#F8F8F8] px-5 py-8 text-[#474747] transition-shadow duration-300"
    >
      <div className="flex w-full">
        <div className="flex w-full items-center gap-4">
          <Avatar className="h-[54px] w-[54px]">
            <AvatarImage src={logo} alt={logo} />
            <AvatarFallback />
          </Avatar>

          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-1">
              <h1 className="text-text-primary text-[20px] leading-none font-bold whitespace-nowrap">
                {name}
              </h1>

              <FavoriteButton
                isFavorite={favorite}
                clubId={id}
                customClass="scale-100"
              />
              {recruitStatus && (
                <RadiusTag
                  recruitStatus={recruitStatus}
                  className="absolute top-8 right-5 shrink-0 px-3 py-2 text-xs"
                />
              )}
            </div>

            <div className="whitespace-nowrap">
              <PeriodSection
                startDate={startDate}
                endDate={endDate}
                isAlwaysRecruiting={isAlwaysRecruiting}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="weight-600 overflow-hidden text-[14px] break-words text-ellipsis whitespace-nowrap text-[#474747]">
        {description}
      </p>
    </div>
  );
}

export default ClubItem;
