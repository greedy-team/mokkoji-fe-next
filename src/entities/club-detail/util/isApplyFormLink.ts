// 같은 폼을 공유·유입 경로에 따라 다르게 만드는 파라미터라 비교에서 뺀다.
const IGNORED_QUERY_KEYS = ['usp', 'fbclid', 'gclid', 'ref', 'source'];

const isIgnoredQueryKey = (key: string) =>
  IGNORED_QUERY_KEYS.includes(key) || key.startsWith('utm_');

// 동아리장이 본문과 폼 입력란에 같은 주소를 조금씩 다르게 적으므로 표기 차이는 무시한다.
// MS Forms처럼 쿼리로 폼을 구분하는 주소가 있어 남은 쿼리는 비교에 포함한다.
const normalize = (rawUrl: string) => {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const { hostname, pathname, searchParams } = new URL(trimmed);
    const host = hostname.toLowerCase().replace(/^www\./, '');
    const path = pathname.replace(/\/+$/, '');

    [...searchParams.keys()]
      .filter(isIgnoredQueryKey)
      .forEach((key) => searchParams.delete(key));
    searchParams.sort();

    const query = searchParams.toString();

    return query ? `${host}${path}?${query}` : `${host}${path}`;
  } catch {
    return null;
  }
};

const isApplyFormLink = (link: string, recruitForm: string) => {
  const normalizedLink = normalize(link);
  const normalizedForm = normalize(recruitForm);

  if (!normalizedLink || !normalizedForm) return false;

  return normalizedLink === normalizedForm;
};

export default isApplyFormLink;
