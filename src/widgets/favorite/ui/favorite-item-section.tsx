import ClubItem from '@/entities/club/ui/club-item';
import Link from 'next/link';
import { ClubType } from '@/shared/model/type';

interface FavoriteItemSectionProps {
  data: ClubType[];
}

async function FavoriteItemSection({ data }: FavoriteItemSectionProps) {
  return (
    <div>
      <h1 className="mb-5 text-base font-bold text-[#00E457]">
        즐겨찾기 한 동아리 {data.length}개
      </h1>
      <ul className="grid w-auto grid-cols-3 gap-4">
        {data.map((item) => (
          <Link href={`/club/${item.id}`} key={item.id}>
            <ClubItem
              key={item.id}
              title={item.name}
              description={item.description}
              clubId={String(item.id)}
              category={item.category}
              isFavorite={item.isFavorite}
              imgUrl={item.imageURL}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteItemSection;
