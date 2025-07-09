'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function HomeSearch() {
  const router = useRouter();
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(input);
    }
  };

  const handleSearch = (keyword: string) => {
    router.push(`/recruit?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="flex w-[619px] items-center justify-between gap-1 border-b-3 text-xl transition-colors focus-within:border-[#00E804]">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="어떤 동아리를 찾고 계신가요?"
        className="w-[90%] py-5 indent-2 outline-none focus:placeholder-gray-300"
      />
      <Image
        src="/header/search.svg"
        alt="검색"
        width={25}
        height={25}
        className="cursor-pointer"
        onClick={() => handleSearch(input)}
      />
    </div>
  );
}

export default HomeSearch;
