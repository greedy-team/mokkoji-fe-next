'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

function ClubPageSearchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') ?? '');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    const q = keyword.trim();
    if (!q) {
      params.delete('keyword');
    } else {
      params.set('keyword', keyword);
    }

    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col">
      <div className="group relative">
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-between gap-1 pb-5"
        >
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            required
            name="keyword"
            placeholder="어떤 동아리를 찾고 계신가요?"
            className="w-[90%] text-xs placeholder-gray-300 outline-none sm:text-base"
          />
          <button type="submit" className="mr-5 pb-3">
            <img
              src="/club/search.svg"
              alt="검색"
              width={24}
              height={24}
              className="h-[17px] w-[17px] cursor-pointer sm:h-[24px] sm:w-[24px]"
            />
          </button>
        </form>
        <span className="pointer-events-none absolute bottom-3 left-0 h-[1px] w-full bg-gray-200" />
        <span className="pointer-events-none absolute bottom-3 left-1/2 h-[1px] w-0 -translate-x-1/2 transform bg-gradient-to-r from-[#00E804] via-[#3AE2EB] to-[#3AA1EB] transition-all duration-300 ease-in-out group-focus-within:w-full" />
      </div>
    </div>
  );
}

export default ClubPageSearchbar;
