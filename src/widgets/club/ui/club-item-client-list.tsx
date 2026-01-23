import Link from 'next/link';
import ClubItem from '@/entities/club/ui/club-item';
import { Recruitment } from '../model/type';

interface ClubItemClientListProps {
  recruitments: Recruitment[];
}

function ClubItemClientList({ recruitments }: ClubItemClientListProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {recruitments.map((item) => (
        <Link key={item.id} href={`/club/${item.club.id}`}>
          <ClubItem
            title={item.title}
            name={item.club.name || ''}
            startDate={item.recruitStart}
            endDate={item.recruitEnd}
            description={item.club.description}
            isFavorite={item.isFavorite}
            logo={item.club.logo}
            clubId={String(item.club.id)}
            status={item.status}
            height={150}
          />
        </Link>
      ))}
    </div>
  );
}

export default ClubItemClientList;
