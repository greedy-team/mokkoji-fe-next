function getWeekdays(date: Date, format: 'short' | 'long' = 'long') {
  const weekdays = {
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
  return weekdays[format][date.getDay()];
}

export default getWeekdays;
