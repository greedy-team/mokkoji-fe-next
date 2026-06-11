'use client';

import useUniversityCode from '@/shared/hooks/useUniversityCode';

import Link from 'next/link';

import ClubItem from '@/entities/club/ui/club-item';
import ClubApplicationBanner from './club-application-banner';
import { Club } from '../model/type';

const BANNER_INTERVAL = 4;

interface ClubItemClientListProps {
  clubs: Club[];
}

function ClubItemClientList({ clubs }: ClubItemClientListProps) {
  const universityCode = useUniversityCode();
  const uniqueClubs = Array.from(
    new Map(clubs.map((club) => [club.id, club])).values(),
  );

  const items: React.ReactNode[] = [];
  uniqueClubs.forEach((item, index) => {
    items.push(
      <Link
        key={item.id}
        href={`/${universityCode}/club/${item.id}`}
        className="block"
      >
        <ClubItem
          name={item.name}
          startDate={item.recruitmentPreviewResponse?.recruitStart}
          endDate={item.recruitmentPreviewResponse?.recruitEnd}
          description={item.description}
          isFavorite={item.isFavorite}
          logo={item.logo}
          id={item.id}
          recruitStatus={item.recruitmentPreviewResponse?.recruitStatus}
          isAlwaysRecruiting={
            item.recruitmentPreviewResponse?.isAlwaysRecruiting ?? false
          }
          height={150}
        />
      </Link>,
    );

    if ((index + 1) % BANNER_INTERVAL === 0) {
      items.push(
        <div
          key={`banner-${Math.floor(index / BANNER_INTERVAL)}`}
          className="sm:hidden"
        >
          <ClubApplicationBanner universityCode={universityCode} />
        </div>,
      );
    }
  });

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {items}
    </div>
  );
}

export default ClubItemClientList;
