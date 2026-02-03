'use client';

import PeriodSection from '@/entities/club-detail/ui/period-section';
import { RecruitStatus } from '@/shared/model/type';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import FavoriteButton from '@/shared/ui/favorite-button';
import RadiusTag from '@/shared/ui/radius-tag';

interface ClubItemProps {
  title: string;
  description?: string;
  isFavorite?: boolean;
  logo?: string;
  clubId: string;
  recruitStartDate: string;
  recruitEndDate: string;
  status: RecruitStatus;
  isAlwaysRecruiting: boolean;
}

function FavoriteItem({
  title,
  description,
  isFavorite,
  logo,
  clubId,
  recruitStartDate,
  recruitEndDate,
  status,
  isAlwaysRecruiting,
}: ClubItemProps) {
  return (
    <div className="relative flex min-h-[140px] w-[100%] flex-col gap-2 rounded-lg bg-[#F8F8F8] px-5 py-8 text-[#474747] transition-shadow duration-300 hover:shadow-[0_0_20px_1px_rgba(0,0,0,0.2)] lg:min-h-[198px] lg:w-auto lg:p-5">
      <div className="mb-2 flex flex-row items-center justify-between lg:mb-8">
        <div className="flex flex-row items-center gap-4">
          <Avatar className="size-12 lg:size-14">
            <AvatarImage src={logo} alt={logo} />
            <AvatarFallback />
          </Avatar>
          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-1">
              <h1 className="text-text-primary text-[20px] leading-none font-bold whitespace-nowrap">
                {title}
              </h1>

              <FavoriteButton
                isFavorite={isFavorite || false}
                clubId={Number(clubId)}
                customClass="scale-100 "
              />

              <RadiusTag
                recruitStatus={status}
                className="absolute top-8 right-7 shrink-0"
              />
            </div>

            <div className="whitespace-nowrap">
              <PeriodSection
                startDate={recruitStartDate}
                endDate={recruitEndDate}
                isAlwaysRecruiting={isAlwaysRecruiting}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="line-clamp-2 overflow-hidden pr-7 text-sm break-words lg:text-xs lg:text-[12px]">
          {description || '동아리 소개 정보가 없습니다.'}
        </div>
      </div>
    </div>
  );
}

export default FavoriteItem;
