'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import RadiusTag from '@/shared/ui/radius-tag';
import PeriodSection from './period-section';
import FavoriteButton from './favorite-button';

interface RecruitItemProps {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  isFavorite?: boolean;
  imgUrl?: string;
}

function RecruitItem({
  title,
  startDate,
  endDate,
  description,
  isFavorite,
  imgUrl,
}: RecruitItemProps) {
  return (
    <div className="relative h-[200px] w-auto rounded-sm bg-[#F8F8F8] p-5">
      <div className="mb-8 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="size-12">
            <AvatarImage src={imgUrl} />
            <AvatarFallback>{title}</AvatarFallback>
          </Avatar>
          <div>
            <PeriodSection startDate={startDate} endDate={endDate} />
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
        </div>
        <RadiusTag label="모집중" className="bg-[#00E457] text-white" />
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-[250px] text-sm break-words whitespace-normal">
          {description}
        </div>
      </div>
      <FavoriteButton isFavorite={isFavorite || false} />
    </div>
  );
}

export default RecruitItem;
