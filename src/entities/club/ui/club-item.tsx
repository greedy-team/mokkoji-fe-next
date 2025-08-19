'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import FavoriteButton from '@/shared/ui/favorite-button';

interface ClubItemProps {
  title: string;
  description: string;
  isFavorite?: boolean;
  logo?: string;
  category?: string;
  clubId: string;
}

function ClubItem({
  title,
  description,
  isFavorite,
  logo,
  category,
  clubId,
}: ClubItemProps) {
  return (
    <div className="relative flex min-h-[90px] w-[100%] flex-col gap-2 rounded-lg bg-[#F8F8F8] p-3 text-[#474747] transition-shadow duration-300 hover:shadow-[0_0_20px_1px_rgba(0,0,0,0.2)] lg:min-h-[180px] lg:w-auto lg:p-5">
      <div className="mb-2 flex flex-row items-center justify-between lg:mb-8">
        <div className="flex flex-row items-center gap-4">
          <Avatar className="size-10 lg:size-12">
            <AvatarImage src={logo} />
            <AvatarFallback />
          </Avatar>
          <div>
            <span className="text-[12px] font-bold lg:text-xs">
              {category} 동아리
            </span>
            <h1 className="text-[16px] font-bold lg:text-xl">{title}</h1>
          </div>
        </div>
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

export default ClubItem;
