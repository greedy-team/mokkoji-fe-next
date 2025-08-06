export default function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays}일 전`;
  }
  if (diffHours > 0) {
    return `${diffHours}시간 전`;
  }
  if (diffMins > 0) {
    return `${diffMins}분 전`;
  }
  return '방금 전';
}
