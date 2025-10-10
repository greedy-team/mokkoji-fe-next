'use client';

import { useSearchParams } from 'next/navigation';

function SaveClientInput() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <input
      required
      type="text"
      name="q"
      placeholder="동아리 명 또는 키워드를 입력해주세요."
      defaultValue={query}
      className="text-md border- w-full rounded-none border-b-2 pr-10 pb-3 indent-1 transition-all duration-300 ease-in-out outline-none focus-within:border-[#00E804] focus:ring-0 focus:outline-none lg:text-lg"
    />
  );
}

export default SaveClientInput;
