import { ClubType } from '@/shared/model/type';
import Link from 'next/link';

interface ClubItemProps {
  club: ClubType;
}

function ClubSearchItem({ club }: ClubItemProps) {
  return (
    <Link href={`/club/${club.id}`}>
      <article className="mb-3 cursor-pointer rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50">
        <header className="mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{club.name}</h3>
            <span className="text-sm text-[#9C9C9C]">
              {club.category ? `${club.category} 동아리` : '동아리'}
            </span>
          </div>
        </header>
        <p className="text-sm leading-relaxed text-gray-600">
          {club.description}
        </p>
      </article>
    </Link>
  );
}

export default ClubSearchItem;
