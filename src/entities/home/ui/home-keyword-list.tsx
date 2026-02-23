import Image from 'next/image';
import Link from 'next/link';
import {
  ClubCategory,
  ClubCategoryIcon,
  ClubCategoryLabel,
} from '@/shared/model/type';

const KEYWORDS: ClubCategory[] = [
  ClubCategory.CULTURAL_ART,
  ClubCategory.ACADEMIC_CULTURAL,
  ClubCategory.VOLUNTEER_SOCIAL,
  ClubCategory.SPORTS,
  ClubCategory.RELIGIOUS,
  ClubCategory.OTHER,
];

function HomeKeywordList() {
  return (
    <div className="mb-2 flex flex-col items-center gap-3 lg:mb-6 lg:gap-4">
      <div className="flex gap-3 lg:gap-4">
        {KEYWORDS.slice(0, 3).map((category) => (
          <Link
            key={category}
            href={`/search?category=${category.toLowerCase()}`}
            className="flex w-fit items-center gap-1 rounded-full bg-[#F2F4F6] px-4 py-[10px] text-xs font-semibold transition-colors hover:bg-[#dadddf] lg:px-5 lg:py-2 lg:text-xl"
          >
            {ClubCategoryLabel[category]}
            {ClubCategoryIcon[category] && (
              <Image
                src={ClubCategoryIcon[category]}
                alt={ClubCategoryLabel[category]}
                width={20}
                height={20}
              />
            )}
          </Link>
        ))}
      </div>
      <div className="flex gap-3 lg:gap-4">
        {KEYWORDS.slice(3).map((category) => (
          <Link
            key={category}
            href={`/search?category=${category.toLowerCase()}`}
            className="flex w-fit items-center gap-1 rounded-full bg-[#F2F4F6] px-4 py-[10px] text-xs font-semibold transition-colors hover:bg-[#dadddf] lg:px-5 lg:py-2 lg:text-xl"
          >
            {ClubCategoryLabel[category]}
            {ClubCategoryIcon[category] && (
              <Image
                src={ClubCategoryIcon[category]}
                alt={ClubCategoryLabel[category]}
                width={20}
                height={20}
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomeKeywordList;
