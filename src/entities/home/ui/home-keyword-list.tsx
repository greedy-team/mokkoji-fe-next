'use client';

import HomeKeyword from '@/features/home/ui/home-keyword';
import { useRouter } from 'next/navigation';

const KEYWORDS = [
  '밴드',
  '서예',
  '학술동아리',
  '프로그래밍',
  '봉사',
  '스포츠',
  '종교',
  '마케팅',
];

function HomeKeywordList() {
  const router = useRouter();

  const handleKeywordClick = (keyword: string) => {
    router.push(`/recruit?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="mb-10 flex flex-wrap justify-center gap-5 px-28">
      {KEYWORDS.map((keyword) => (
        <HomeKeyword
          key={keyword}
          keyword={keyword}
          onClick={() => handleKeywordClick(keyword)}
        />
      ))}
    </div>
  );
}

export default HomeKeywordList;
