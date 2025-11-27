'use client';

import { useRouter, useSearchParams } from 'next/navigation';

function useUrlParams(key: string) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === 'ALL') {
      newParams.delete(key);
    } else {
      newParams.set(key, value.toLowerCase());
    }

    router.push(`?${newParams.toString()}`);
  };

  return { handleChange, searchParams };
}

export default useUrlParams;
