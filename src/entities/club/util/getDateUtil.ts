function getDateUtil(recruitEndDate: string | undefined) {
  if (recruitEndDate === undefined) {
    return false;
  }
  const koreaYearEnd = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);

  const recruitEnd = new Date(recruitEndDate);

  const isEndOfYear =
    recruitEnd.getFullYear() === koreaYearEnd.getFullYear() &&
    recruitEnd.getMonth() === koreaYearEnd.getMonth() &&
    recruitEnd.getDate() === koreaYearEnd.getDate();

  return isEndOfYear;
}

export function formatToMonthDay(dateStr: string | Date): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default getDateUtil;
