import { ClubType } from '@/shared/model/type';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import Link from 'next/link';

interface ClubItemProps {
  club: ClubType;
}

function ClubSearchItemTest({ club }: ClubItemProps) {
  return (
    <Link href={`/club/${club.id}`}>
      <article className="mb-3 flex cursor-pointer items-center justify-between gap-2 rounded-lg border-2 border-gray-100 bg-white p-4 transition-colors hover:bg-gray-50">
        <Avatar className="size-12 lg:size-14">
          <AvatarImage src={club.logo} alt={club.logo} />
          <AvatarFallback />
        </Avatar>
        <div>
          <header className="mb-2">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">{club.name}</h1>
              <span className="text-xs text-[#9C9C9C]">
                {club.category ? `${club.category} 동아리` : '동아리'}
              </span>
            </div>
          </header>
          <p className="line-clamp-2 overflow-hidden text-sm leading-relaxed break-words text-gray-600">
            {club.description}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default ClubSearchItemTest;
