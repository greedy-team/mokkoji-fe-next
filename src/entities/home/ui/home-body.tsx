'use client';

import Image from 'next/image';
import { useState } from 'react';

interface HomeBodyProps {
  onSearch: (keyword: string) => void;
}

function HomeBody({ onSearch }: HomeBodyProps) {
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(input);
    }
  };

  return (
    <div className="mb-[50px] flex flex-col items-center py-5">
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
          onClick={() => onSearch(input)}
        />
      </div>
    </div>
  );
}

export default HomeBody;
