'use client';

import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';

function useUrlParams(key: string) {
  const [rawActive, setRawActive] = useQueryState(
    key,
    parseAsString
      .withDefault('')
      .withOptions({ shallow: false, history: 'push' }),
  );
  const [, setPage] = useQueryState(
    'page',
    parseAsInteger.withOptions({ shallow: false, history: 'push' }),
  );

  const active = rawActive.toUpperCase();

  const handleChange = (value: string) => {
    setRawActive(value === 'ALL' || value === '' ? null : value.toLowerCase());
    setPage(1);
  };

  return { handleChange, active };
}

export default useUrlParams;
