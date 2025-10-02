'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import RadiusTag from '@/shared/ui/radius-tag';
import { RecruitStatus } from '@/shared/model/type';
import FavoriteButton from '@/shared/ui/favorite-button';
import { Session } from 'next-auth';
import PeriodSection from './period-section';

interface RecruitItemProps {
  title: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  isFavorite?: boolean;
  logo?: string;
  clubId: string;
  status: RecruitStatus;
  session: Session | null;
}

function RecruitItem({
  title,
  name,
  startDate,
  endDate,
  description,
  isFavorite,
  logo,
  clubId,
  status,
  session,
}: RecruitItemProps) {
  return (
    <div className="relative flex min-h-[90px] w-[100%] flex-col gap-2 rounded-lg bg-[#F8F8F8] p-3 text-[#474747] transition-shadow duration-300 hover:shadow-[0_0_20px_1px_rgba(0,0,0,0.2)] lg:min-h-[180px] lg:w-auto lg:p-5">
      <div className="mb-2 flex flex-row items-center justify-between lg:mb-8">
        <div className="flex flex-row items-center gap-4">
          <Avatar className="size-12 lg:size-14">
            <AvatarImage src={logo} />
            <AvatarFallback />
          </Avatar>
          <div>
            <PeriodSection startDate={startDate} endDate={endDate} />
            <h1 className="text-[16px] font-bold lg:text-xl">{name}</h1>
          </div>
        </div>
        <RadiusTag status={status} className="lg:text-[16px]" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <h2 className="overflow-hidden pr-7 text-[12px] font-bold break-words text-ellipsis whitespace-nowrap lg:text-xs">
          [{title}]
        </h2>
        <p className="overflow-hidden pr-7 text-[12px] break-words text-ellipsis whitespace-nowrap lg:text-xs">
          {description}
        </p>
      </div>
      <FavoriteButton
        isFavorite={isFavorite || false}
        clubId={clubId}
        customClass="absolute bottom-4 right-4 scale-80 lg:scale-100"
        session={session}
      />
    </div>
  );
}

export default RecruitItem;
