'use client';

import { useRouter } from 'next/navigation';
import HomeBody from '@/entities/home/ui/home-body';
import HomeKeywordList from '@/entities/home/ui/home-keyword-list';

function HomeSearchWidget() {
  const router = useRouter();

  const handleSearch = (keyword: string) => {
    router.push(`/recruit?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <>
      <HomeBody onSearch={handleSearch} />
      <HomeKeywordList onKeywordClick={handleSearch} />
    </>
  );
}

export default HomeSearchWidget;
