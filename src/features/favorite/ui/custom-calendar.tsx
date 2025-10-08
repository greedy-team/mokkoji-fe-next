'use client';

import 'react-calendar/dist/Calendar.css';
import dynamic from 'next/dynamic';
import { FavoriteDateItem } from '@/views/favorite/model/type';
import RecruitEndModal from '@/entities/favorite/ui/recruit-end-modal';
import formatNavigation from '@/entities/favorite/ui/format-navigation';
import SharedLoading from '@/shared/ui/loading';
import { useEffect, useState } from 'react';
import getWeekdays from '../util/get-week-days';
import useCalendarDeadline from '../model/useCalendarDeadline';

const Calendar = dynamic(() => import('react-calendar'), {
  ssr: false,
  loading: () => <SharedLoading />,
});

interface CustomCalendarProps {
  value: Date;
  setValue: (value: Date) => void;
  data: FavoriteDateItem[];
}

function CustomCalendar({ value, setValue, data }: CustomCalendarProps) {
  const {
    modalOpen,
    setModalOpen,
    selectedClubs,
    handleDateClick,
    deadlineMap,
  } = useCalendarDeadline(data, setValue);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  return (
    <>
      <Calendar
        onChange={(val) => handleDateClick(val as Date)}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) {
            setValue(activeStartDate);
          }
        }}
        value={value}
        locale="ko-KR"
        className="h-[450px] !w-full rounded-xl border !border-[#F8F8F8] !bg-[#F8F8F8] !p-3 !text-xl text-gray-800 lg:!w-[700px]"
        nextLabel=">"
        prevLabel="<"
        navigationLabel={formatNavigation}
        formatShortWeekday={(locale, date) => getWeekdays(date, isMobile)}
        formatDay={(locale, date) => date.getDate().toString()}
        next2Label={null}
        prev2Label={null}
        tileClassName={({ date, view }) => {
          if (view !== 'month') return '';

          const dateKey = date.toDateString();
          const isSelected = value.toDateString() === dateKey;
          const isDeadline = deadlineMap.has(dateKey);

          let borderClass = '!border-transparent';
          let textClass = '!text-xl';
          let fontClass = '!font-bold !text-xl';

          if (isSelected) {
            borderClass = '!border-[#00E457]';
            textClass = '!text-[#00E457] !text-xl';
            fontClass = '!font-semibold !text-xl';
          } else if (isDeadline) {
            textClass = '!text-[#00E457] !text-xl';
          }

          return `
            !border-b-2
            ${borderClass}
            ${textClass}
            !bg-transparent
            hover:!bg-blue-100
            transition
            ${fontClass}
          `;
        }}
      />
      <RecruitEndModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        selectedClubs={selectedClubs}
        date={value}
      />
    </>
  );
}

export default CustomCalendar;
