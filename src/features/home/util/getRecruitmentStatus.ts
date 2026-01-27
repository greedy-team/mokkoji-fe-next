export default function getRecruitmentStatus(
  startDate: string,
  endDate: string,
): string {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  if (today >= start && today <= end) {
    return '모집 중';
  }

  return '모집 마감';
}
