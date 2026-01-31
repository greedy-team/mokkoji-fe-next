import Link from 'next/link';
import ClubItem from '@/entities/club/ui/club-item';
import { Club } from '../model/type';

interface ClubItemClientListProps {
  clubs: Club[];
}

function ClubItemClientList({ clubs }: ClubItemClientListProps) {
  const uniqueClubs = Array.from(
    new Map(clubs.map((club) => [club.id, club])).values(),
  );

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {uniqueClubs.map((item) => (
        <Link key={item.id} href={`/club/${item.id}`} className="block">
          <ClubItem
            name={item.name}
            startDate={item.recruitmentPreviewResponse?.recruitStart}
            endDate={item.recruitmentPreviewResponse?.recruitEnd}
            description={item.description}
            favorite={item.favorite}
            logo={item.logo}
            id={item.id}
            recruitStatus={item.recruitmentPreviewResponse?.recruitStatus}
            isAlwaysRecruiting={
              item.recruitmentPreviewResponse?.isAlwaysRecruiting ?? false
            }
            height={150}
          />
        </Link>
      ))}
    </div>
  );
}

export default ClubItemClientList;
