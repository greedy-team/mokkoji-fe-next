import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ApplicationCardItem } from '@/entities/my/model/type';
import { sortByLatest } from '@/entities/my/lib/application-card';
import ClubApplicationCard from './club-application-card';

type ClubApplicationListProps = {
  title: string;
  items: ApplicationCardItem[];
  universityCode: string;
};

function ClubApplicationList({
  title,
  items,
  universityCode,
}: ClubApplicationListProps) {
  const myHref = `/${universityCode}/my`;
  const sortedItems = sortByLatest(items);

  return (
    <div className="flex flex-col gap-5">
      <div className="text-text-tertiary flex items-center gap-0.5 text-sm">
        <Link href={myHref}>마이페이지</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-text-secondary">{title}</span>
      </div>

      <Link href={myHref} className="flex items-center gap-1 font-semibold">
        <ChevronLeft className="size-4" />
        {title}
      </Link>

      {sortedItems.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {sortedItems.map((item) => (
            <ClubApplicationCard key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <p className="text-text-tertiary py-10 text-center text-sm">
          신청 내역이 없습니다.
        </p>
      )}
    </div>
  );
}

export default ClubApplicationList;
