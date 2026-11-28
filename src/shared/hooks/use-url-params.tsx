'use client';

import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { toApiCode, toUrlCode } from '@/shared/lib/urlCodeConverter';

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

  const active = toApiCode(rawActive);

  const handleChange = (value: string) => {
    setRawActive(value === 'ALL' || value === '' ? null : toUrlCode(value));
    setPage(1);
  };

  return { handleChange, active };
}

export default useUrlParams;
