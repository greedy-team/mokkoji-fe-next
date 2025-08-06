function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = date.toLocaleDateString('ko-KR', {
    weekday: 'short',
  });
  return `${month}/${day}, ${weekday}`;
}

export default formatDate;
