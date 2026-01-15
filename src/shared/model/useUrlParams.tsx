'use client';

import { useRouter, useSearchParams } from 'next/navigation';

function useUrlParams(key: string) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = searchParams.get(key) ?? '';

  const handleChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === 'ALL' || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    router.push(`?${newParams.toString()}`);
  };

  return { handleChange, active };
}

export default useUrlParams;
