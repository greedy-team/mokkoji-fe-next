function formatNavigation({ date }: { date: Date }) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const weekdaysKorean = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  const dayOfWeek = weekdaysKorean[date.getDay()];

  return (
    <span className="flex gap-6 text-sm font-bold whitespace-nowrap text-gray-900 lg:text-xl">
      <span>{year}년</span>
      <span>{`${month}월 ${date.getDate()}일, ${dayOfWeek}`}</span>
    </span>
  );
}

export default formatNavigation;
