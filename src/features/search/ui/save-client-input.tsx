'use client';

import { useSearchParams } from 'next/navigation';

function SaveClientInput() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <input
      type="text"
      name="q"
      placeholder="동아리 명 또는 키워드를 입력해주세요."
      defaultValue={query}
      className="text-md w-full rounded-none border-0 border-b-2 border-b-gray-600 pr-10 pb-3 indent-1 focus:border-b-gray-800 focus:ring-0 focus:outline-none lg:text-lg"
    />
  );
}

export default SaveClientInput;
