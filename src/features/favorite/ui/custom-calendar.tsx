'use client';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import getWeekdays from './util/get-week-days';

function CustomCalendar() {
  const [value, setValue] = useState<Date>(new Date());

  const formatNavigation = ({ date }: { date: Date }) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return (
      <div className="flex flex-row items-center gap-2 pl-2">
        <span className="text-sm font-bold text-gray-900">{`${year}     ${month}월 ${day}일, `}</span>
        <span className="text-sm font-normal text-gray-600">
          {getWeekdays(date)}
        </span>
      </div>
    );
  };

  return (
    <Calendar
      onChange={(val) => setValue(val as Date)} // 단일 Date만 처리
      value={value}
      locale="ko-KR"
      className="h-[350px]!rounded-xl w-[500px]! rounded-xl! border !border-[#F8F8F8] !bg-[#F8F8F8] p-3! text-gray-800"
      nextLabel=">"
      prevLabel="<"
      navigationLabel={formatNavigation}
      formatShortWeekday={(locale, date) => getWeekdays(date)}
      formatDay={(locale, date) => date.getDate().toString()}
      next2Label={null}
      prev2Label={null}
      tileClassName={({ date, view }) => {
        if (view === 'month') {
          const isSelected =
            value && date.toDateString() === value.toDateString();

          // 모든 날짜에 border-b-2(투명)로 높이 유지
          return `
            border-b-2!
            ${isSelected ? 'border-[#00E457]! text-[#00E457]! font-semibold!' : 'border-transparent!'}
            bg-transparent!
            hover:bg-blue-100!
            transition!
            font-bold!
          `;
        }
        return '';
      }}
    />
  );
}

export default CustomCalendar;
