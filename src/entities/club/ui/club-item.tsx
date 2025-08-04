'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import FavoriteButton from '@/entities/recruit/ui/favorite-button';

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
    <div className="relative h-[170px] w-auto rounded-sm bg-[#F8F8F8] p-5">
      <div className="mb-8 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="size-12">
            <AvatarImage src={logo} />
            <AvatarFallback>{title}</AvatarFallback>
          </Avatar>
          <div>
            <span className="text-xs font-bold">{category} 동아리</span>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-[280px] text-xs break-words whitespace-normal">
          {description}
        </div>
      </div>
      <FavoriteButton isFavorite={isFavorite || false} clubId={clubId} />
    </div>
  );
}

export default ClubItem;
