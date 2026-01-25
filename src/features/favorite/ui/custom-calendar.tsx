'use client';

import 'react-calendar/dist/Calendar.css';
import dynamic from 'next/dynamic';
import { FavoriteDateItem } from '@/views/favorite/model/type';
import RecruitEndModal from '@/entities/favorite/ui/recruit-end-modal';
import formatNavigation from '@/entities/favorite/ui/format-navigation';
import SharedLoading from '@/shared/ui/loading';
import Image from 'next/image';
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
        className="h-[574px] rounded-xl !border-none !bg-[#FBFBFB] !p-3 !text-xl text-gray-800 lg:!w-[700px]"
        nextLabel={
          <div className="flex items-center justify-center">
            <Image
              src="/favorite/next.svg"
              alt="다음달"
              width={12}
              height={23}
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
            />
          </div>
        }
        navigationLabel={formatNavigation}
        formatShortWeekday={(locale, date) => getWeekdays(date)}
        formatDay={(locale, date) => date.getDate().toString()}
        next2Label={null}
        prev2Label={null}
        tileClassName={({ date, view }) => {
          if (view !== 'month') return '';

          const dateKey = date.toDateString();
          const isSelected = value.toDateString() === dateKey;
          const isDeadline = deadlineMap.has(dateKey);

          let textClass = '!text-xl';
          let selectedClass = '';

          if (isSelected) {
            textClass = '!text-[#00E457] !text-xl';
            selectedClass = 'selected-date';
          } else if (isDeadline) {
            textClass = '!text-[#00E457] !text-xl';
          }

          return `
            ${textClass}
            !bg-transparent
            hover:!bg-blue-100
            transition
            !font-bold
            !mb-3
            ${selectedClass}
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
