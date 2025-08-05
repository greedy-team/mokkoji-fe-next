import getWeekdays from '@/features/favorite/util/get-week-days';

function formatNavigation({ date }: { date: Date }) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <div className="flex flex-row items-center gap-2 pl-2">
      <span className="text-sm font-bold text-gray-900">{`${year} ${month}월 ${day}일, `}</span>
      <span className="text-sm font-normal text-gray-600">
        {getWeekdays(date)}
      </span>
    </div>
  );
}

export default formatNavigation;
