const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * 알림 목록의 상대 시간. 백엔드 createdAt은 타임존 없는 LocalDateTime 문자열이라
 * 브라우저가 UTC로 해석하지 않도록 로컬 시각으로 읽는다.
 */
function formatNotificationTime(createdAt: string, now: number = Date.now()) {
  const hasZone = /(?:Z|[+-]\d{2}:?\d{2})$/.test(createdAt);
  const parsed = new Date(hasZone ? createdAt : `${createdAt}Z`);
  if (Number.isNaN(parsed.getTime())) return '';

  const localOffset = hasZone ? 0 : parsed.getTimezoneOffset() * MINUTE;
  const elapsed = now - (parsed.getTime() + localOffset);

  if (elapsed < MINUTE) return '방금 전';
  if (elapsed < HOUR) return `${Math.floor(elapsed / MINUTE)}분 전`;
  if (elapsed < DAY) return `${Math.floor(elapsed / HOUR)}시간 전`;
  if (elapsed < 2 * DAY) return '어제';
  if (elapsed < 7 * DAY) return `${Math.floor(elapsed / DAY)}일 전`;

  const target = new Date(parsed.getTime() + localOffset);
  return `${target.getFullYear()}. ${target.getMonth() + 1}. ${target.getDate()}.`;
}

export default formatNotificationTime;
