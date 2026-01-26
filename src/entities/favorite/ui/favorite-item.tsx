'use client';

import { RecruitStatus } from '@/shared/model/type';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import FavoriteButton from '@/shared/ui/favorite-button';
import RadiusTag from '@/shared/ui/radius-tag';

interface ClubItemProps {
  title: string;
  description?: string;
  isFavorite?: boolean;
  logo?: string;
  category?: string;
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
  category,
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
          <div>
            <span className="hidden text-[12px] font-bold lg:flex lg:text-xs">
              {category} 동아리
            </span>
            <h1 className="text-xl font-bold lg:text-xl">{title}</h1>
            <span className="text-xs text-[#7F7F7F] lg:hidden">
              {isAlwaysRecruiting
                ? '상시모집'
                : `모집기한 · ${recruitStartDate}~${recruitEndDate}`}
            </span>
          </div>
          <RadiusTag status={status} className="lg:text-[16px]" />
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="line-clamp-2 overflow-hidden pr-7 text-sm break-words lg:text-xs lg:text-[12px]">
          {description || '동아리 소개 정보가 없습니다.'}
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

export default FavoriteItem;
