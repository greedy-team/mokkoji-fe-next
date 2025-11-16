'use client';

import cn from '@/shared/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { WEEKDAYS } from './constants';
import getDateGrid from './getDateGrid';

interface CalenderBodyProps {
  onDateSelect: (date: Date) => void;
  startDate: string | null;
  endDate: string | null;
}

function CalenderBody({ onDateSelect, startDate, endDate }: CalenderBodyProps) {
  const [currentDate, setCurrentDateState] = useState(new Date());
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const allDate = getDateGrid({ currentDate, currentYear, currentMonth });

  const parseDateString = (dateString: string | null): Date | null => {
    if (!dateString) return null;
    return new Date(`${dateString}T00:00:00`);
  };

  const start = parseDateString(startDate);
  const end = parseDateString(endDate);

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isSelectedDay = (selectedDate: Date) => {
    if (start && isSameDay(selectedDate, start)) return true;
    if (end && isSameDay(selectedDate, end)) return true;
    return false;
  };

  const isInRange = (selectedDate: Date) => {
    if (!start || !end) return false;
    const time = selectedDate.getTime();
    return time > start.getTime() && time < end.getTime();
  };

  const handleMonthChange = (dir: number) => {
    setDirection(dir === 1 ? 'right' : 'left');
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth + dir);
    setCurrentDateState(newDate);
    setTimeout(() => setDirection(null), 300);
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex w-full justify-between">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => handleMonthChange(-1)}
        >
          <Image src="/calenderPrev.svg" alt="저번달" width={20} height={20} />
        </button>
        <h2 className="flex-1 cursor-default py-3 text-center font-bold">
          {currentYear}년 {currentMonth + 1}월
        </h2>
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => handleMonthChange(1)}
        >
          <Image
            src="/calenderPrev.svg"
            alt="다음달"
            width={20}
            height={20}
            className="rotate-180"
          />
        </button>
      </div>
      <div className="grid w-full grid-cols-7 gap-2 text-sm font-semibold text-[#878787]">
        {WEEKDAYS.map((day) => (
          <span
            key={day}
            className="flex cursor-default items-center justify-center p-2 text-center"
          >
            {day}
          </span>
        ))}
      </div>

      <div className="overflow-hidden">
        <div
          key={`${currentYear}-${currentMonth}`}
          className={cn(
            'grid w-full grid-cols-7 text-sm transition-all duration-300 ease-in-out',
            direction === 'left' && 'animate-slide-in-left',
            direction === 'right' && 'animate-slide-in-right',
          )}
        >
          {allDate.map((data) => (
            <div
              key={data?.getDate()}
              className={cn(
                'mb-4 flex items-center justify-center',
                data && isInRange(data) && 'bg-gray-100',
                start &&
                  end &&
                  data &&
                  isSameDay(data, start) &&
                  'rounded-l-full bg-gray-100',
                end &&
                  data &&
                  isSameDay(data, end) &&
                  'rounded-r-full bg-gray-100',
              )}
            >
              <button
                type="button"
                tabIndex={data ? 0 : -1}
                className={cn(
                  'w-full cursor-pointer rounded-full border-3 border-transparent p-2 text-center hover:border-[#00D451] hover:bg-gray-100 hover:text-black',
                  data && data.getMonth() !== currentMonth && 'text-gray-400',
                  data &&
                    isSelectedDay(data) &&
                    'rounded-full border-2 border-[#00D451] bg-[#00D451] font-bold text-white',
                  !data && 'pointer-events-none',
                )}
                onClick={() => data && onDateSelect(data)}
              >
                {data?.getDate()}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalenderBody;
