// 동아리장이 본문과 폼 입력란에 같은 주소를 조금씩 다르게 적으므로 표기 차이는 무시한다.
const normalize = (rawUrl: string) => {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const { hostname, pathname } = new URL(trimmed);
    const host = hostname.toLowerCase().replace(/^www\./, '');
    const path = pathname.replace(/\/+$/, '');

    return `${host}${path}`;
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
