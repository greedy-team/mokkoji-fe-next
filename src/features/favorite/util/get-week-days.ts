function getWeekdays(date: Date, isMobile?: boolean) {
  const weekdays = {
    short: ['일', '월', '화', '수', '목', '금', '토'],
    long: [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ],
  };
  return weekdays[isMobile ? 'short' : 'long'][date.getDay()];
}

export default getWeekdays;
