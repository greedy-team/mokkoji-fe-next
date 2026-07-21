'use client';

import 'react-calendar/dist/Calendar.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { FavoriteDateItem } from '@/entities/favorite/model/type';
import RecruitEndModal from '@/entities/favorite/ui/recruit-end-modal';
import DateNavigation from '@/entities/favorite/ui/format-navigation';
import SharedLoading from '@/shared/ui/loading';
import cn from '@/shared/lib/utils';
import Image from 'next/image';
import getWeekdays from '../util/get-week-days';
import useCalendarDeadline from '../model/useCalendarDeadline';

const getMonthIndex = (date: Date) => date.getFullYear() * 12 + date.getMonth();

const Calendar = dynamic(() => import('react-calendar'), {
  ssr: false,
  loading: () => <SharedLoading />,
});

interface CustomCalendarProps {
  value: Date;
  setValue: (value: Date) => void;
  activeStartDate: Date;
  setActiveStartDate: (value: Date) => void;
  data: FavoriteDateItem[];
}

function CustomCalendar({
  value,
  setValue,
  activeStartDate,
  setActiveStartDate,
  data,
}: CustomCalendarProps) {
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const {
    isModalOpen,
    setIsModalOpen,
    selectedClubs,
    handleDateClick,
    deadlineMap,
  } = useCalendarDeadline(data, setValue);

  const handleActiveStartDateChange = (nextActiveStartDate: Date | null) => {
    if (!nextActiveStartDate) return;
    setDirection(
      getMonthIndex(nextActiveStartDate) > getMonthIndex(activeStartDate)
        ? 'right'
        : 'left',
    );
    setActiveStartDate(nextActiveStartDate);
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-xl bg-[#FBFBFB] p-3 lg:w-[700px]">
        <div
          key={`${activeStartDate.getFullYear()}-${activeStartDate.getMonth()}`}
          className={cn(
            direction === 'left' && 'animate-slide-in-left',
            direction === 'right' && 'animate-slide-in-right',
          )}
        >
          <Calendar
            onChange={(val) => handleDateClick(val as Date)}
            activeStartDate={activeStartDate}
            onActiveStartDateChange={({
              activeStartDate: nextActiveStartDate,
            }) => handleActiveStartDateChange(nextActiveStartDate)}
            value={value}
            locale="ko-KR"
            className="!w-full !border-none !bg-transparent text-gray-800"
            nextLabel={
              <div className="flex items-center justify-center">
                <Image
                  src="/favorite/next.svg"
                  alt="다음달"
                  width={12}
                  height={23}
                  className="h-[12px] w-[6px] lg:h-[23px] lg:w-[12px]"
                />
              </div>
            }
            prevLabel={
              <div className="flex items-center justify-center">
                <Image
                  src="/favorite/prev.svg"
                  alt="저번달"
                  width={12}
                  height={23}
                  className="h-[12px] w-[6px] lg:h-[23px] lg:w-[12px]"
                />
              </div>
            }
            navigationLabel={DateNavigation}
            formatShortWeekday={(locale, date) => getWeekdays(date)}
            formatDay={(locale, date) => date.getDate().toString()}
            next2Label={null}
            prev2Label={null}
            tileClassName={({ date, view }) => {
              if (view !== 'month') return '';

              const dateKey = date.toDateString();
              const isSelected = value.toDateString() === dateKey;
              const isDeadline = deadlineMap.has(dateKey);

              let textClass = '!text-sm lg:!text-xl';
              let selectedClass = '';

              if (isSelected) {
                textClass = '!text-[#00E457] lg:!text-xl';
                selectedClass = 'selected-date';
              } else if (isDeadline) {
                textClass = '!text-[#00E457] lg:!text-xl';
              }

              return `
            ${textClass}
            !bg-transparent
            hover:!bg-blue-100
            transition
            !font-bold
            !mb-2
            lg:!mb-3
            ${selectedClass}
          `;
            }}
          />
        </div>
      </div>
      <RecruitEndModal
        modalOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        selectedClubs={selectedClubs}
        date={value}
      />
    </>
  );
}

export default CustomCalendar;
