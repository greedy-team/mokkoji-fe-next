function startOfLocalDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function getDaysLeftFromToday(endDateString: string) {
  const today = startOfLocalDay(new Date());
  const end = startOfLocalDay(new Date(endDateString));
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const diff = Math.floor((end.getTime() - today.getTime()) / MS_PER_DAY);
  return diff;
}

export default getDaysLeftFromToday;
