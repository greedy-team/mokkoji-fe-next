import { ClubType } from '@/shared/model/type';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import Link from 'next/link';

interface ClubItemProps {
  club: ClubType;
}

function ClubSearchItem({ club }: ClubItemProps) {
  return (
    <Link href={`/club/${club.id}`}>
      <article className="mb-3 flex cursor-pointer items-center gap-6 rounded-lg border-2 border-gray-100 bg-white p-4 transition-colors hover:bg-gray-50">
        <Avatar className="size-12 lg:size-14">
          <AvatarImage src={club.logo} />
          <AvatarFallback />
        </Avatar>
        <div className="min-w-0">
          <header className="mb-2">
            <div className="flex items-center gap-2">
              <h1 className="cursor-pointer text-lg font-semibold">
                {club.name}
              </h1>
              <span className="text-xs text-[#9C9C9C]">
                {club.category ? `${club.category} 동아리` : '동아리'}
              </span>
            </div>
          </header>
          <p className="line-clamp-2 cursor-pointer overflow-hidden text-sm leading-relaxed break-words text-gray-600">
            {club.description}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default ClubSearchItem;
