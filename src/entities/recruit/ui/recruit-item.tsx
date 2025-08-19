'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import RadiusTag from '@/shared/ui/radius-tag';
import getStatus from '@/shared/lib/getStatus';
import PeriodSection from './period-section';
import FavoriteButton from '../../../shared/ui/favorite-button';

interface RecruitItemProps {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  isFavorite?: boolean;
  logo?: string;
  clubId: string;
}

function RecruitItem({
  title,
  startDate,
  endDate,
  description,
  isFavorite,
  logo,
  clubId,
}: RecruitItemProps) {
  return (
    <div className="relative flex min-h-[90px] w-[100%] flex-col gap-2 rounded-sm bg-[#F8F8F8] p-3 text-[#474747] lg:min-h-[180px] lg:w-auto lg:p-5">
      <div className="mb-2 flex flex-row items-center justify-between lg:mb-8">
        <div className="flex flex-row items-center gap-4">
          <Avatar className="size-10 lg:size-12">
            <AvatarImage src={logo} />
            <AvatarFallback>{title}</AvatarFallback>
          </Avatar>
          <div>
            <PeriodSection startDate={startDate} endDate={endDate} />
            <h1 className="text-[16px] font-bold lg:text-xl">{title}</h1>
          </div>
        </div>
        <RadiusTag
          label={getStatus(endDate).text}
          className={`${getStatus(endDate).backColor} ${getStatus(endDate).fontColor}`}
        />
      </div>
      <div className="flex flex-row justify-between">
        <div className="pr-7 text-[12px] break-words whitespace-normal lg:text-xs">
          {description}
        </div>
      </div>
      <FavoriteButton
        isFavorite={isFavorite || false}
        clubId={clubId}
        customClass="absolute bottom-4 right-4 scale-80 lg:scale-100"
      />
    </div>
  );
}

export default RecruitItem;
