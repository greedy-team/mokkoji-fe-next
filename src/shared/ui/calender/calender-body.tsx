'use client';

import cn from '@/shared/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { WEEKDAYS } from './constants';
import getDateGrid from './getDateGrid';
import TimePicker from './time-picker';
import type { TimeValue } from './useCalender';

interface CalenderBodyProps {
  onDateSelect: (date: Date) => void;
  startDate: string | null;
  endDate: string | null;
  onClose: () => void;
  timeEnabled: boolean;
  onTimeEnabledChange: (enabled: boolean) => void;
  startTime: TimeValue | null;
  endTime: TimeValue | null;
  onStartTimeChange: (time: TimeValue) => void;
  onEndTimeChange: (time: TimeValue) => void;
  variant?: 'dark' | 'light';
}

function CalenderBody({
  onDateSelect,
  startDate,
  endDate,
  onClose,
  timeEnabled,
  onTimeEnabledChange,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  variant = 'light',
}: CalenderBodyProps) {
  const [currentDate, setCurrentDateState] = useState(new Date());
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const allDate = getDateGrid({ currentYear, currentMonth });

  const parseDateString = (dateString: string | null): Date | null => {
    if (!dateString) return null;
    const date = dateString.split('T')[0];
    return new Date(`${date}T00:00:00`);
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
      {/* 캘린더 헤더 영역 */}
      <div className="mb-2 flex w-full justify-between">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => handleMonthChange(-1)}
        >
          <Image
            src="/calenderPrev.svg"
            alt="저번달"
            width={20}
            height={20}
            className={variant === 'dark' ? 'invert' : ''}
          />
        </button>
        <h1 className="flex-1 cursor-default py-3 text-center font-bold">
          {currentYear}년 {currentMonth + 1}월
        </h1>
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
            className={`rotate-180 ${variant === 'dark' ? 'invert' : ''}`}
          />
        </button>
      </div>
      {/* 캘린더 요일 영역 */}
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
      {/* 캘린더 날짜 영역 */}
      <div className="overflow-hidden">
        <div
          key={`${currentYear}-${currentMonth}`}
          className={cn(
            'grid w-full grid-cols-7 text-sm transition-all duration-300 ease-in-out',
            direction === 'left' && 'animate-slide-in-left',
            direction === 'right' && 'animate-slide-in-right',
          )}
        >
          {allDate.map((data) => {
            const isCurrent = Boolean(data);
            const inRange = isCurrent && data && isInRange(data);
            const isStart = start && data && isSameDay(data, start);
            const isEnd = end && data && isSameDay(data, end);
            const isSelected = isCurrent && data && isSelectedDay(data);
            const isOtherMonth =
              isCurrent && data && data.getMonth() !== currentMonth;

            return (
              <div
                key={data?.getDate()}
                className={cn(
                  'mb-4 flex items-center justify-center',
                  inRange &&
                    (variant === 'dark' ? 'bg-[#3b7551]' : 'bg-gray-100'),
                  isStart &&
                    (variant === 'dark'
                      ? 'rounded-l-full bg-[#3b7551]'
                      : 'rounded-l-full bg-gray-100'),
                  isEnd &&
                    (variant === 'dark'
                      ? 'rounded-r-full bg-[#3b7551]'
                      : 'rounded-r-full bg-gray-100'),
                )}
              >
                <button
                  type="button"
                  tabIndex={data ? 0 : -1}
                  className={cn(
                    'w-full cursor-pointer rounded-full border-3 border-transparent p-2 text-center hover:border-[#00D451] hover:bg-gray-100 hover:text-black',
                    isOtherMonth && 'text-gray-400',
                    isSelected &&
                      'rounded-full border-2 border-[#00D451] bg-[#00D451] font-bold text-white',
                    !data && 'pointer-events-none',
                  )}
                  onClick={() => data && onDateSelect(data)}
                >
                  {data?.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {/* 시간 선택 영역 */}
      <TimePicker
        enabled={timeEnabled}
        onEnabledChange={onTimeEnabledChange}
        startTime={startTime}
        endTime={endTime}
        onStartTimeChange={onStartTimeChange}
        onEndTimeChange={onEndTimeChange}
        hasStartDate={!!startDate}
        hasEndDate={!!endDate}
        variant={variant}
      />
      <button
        type="button"
        className="mt-5 w-full cursor-pointer rounded-md bg-[#00D451] py-2 font-bold text-white hover:bg-[#00d451cf]"
        onClick={onClose}
      >
        닫기
      </button>
    </div>
  );
}

export default CalenderBody;
