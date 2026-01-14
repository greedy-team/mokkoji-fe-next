'use client';

import cn from '@/shared/lib/utils';
import CalenderBody from './calender-body';
import useCalender from './useCalender';

interface DateRangePickerProps {
  startDate: string | null;
  endDate: string | null;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onRangeComplete?: () => void;
  label?: string;
  error?: string;
  variant?: 'dark' | 'light';
}

function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onRangeComplete,
  label = '날짜 범위',
  error,
  variant = 'light',
}: DateRangePickerProps) {
  const {
    isCalenderOpen,
    isCalenderClosing,
    calendarRef,
    closeCalender,
    toggleCalender,
    handleDateSelect: handleCalenderDateSelect,
    formatDateRange,
    timeEnabled,
    setTimeEnabled,
    startTime,
    endTime,
    setStartTime,
    setEndTime,
  } = useCalender({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onRangeComplete,
  });

  const handleDateSelect = (selectedDate: Date) => {
    handleCalenderDateSelect(selectedDate, startDate, endDate);
  };

  return (
    <fieldset className="relative" ref={calendarRef}>
      {label && (
        <label
          htmlFor="recruitPeriod"
          className="flex gap-2 text-base font-semibold"
        >
          {label}
          {error && (
            <p className="pt-1 text-xs font-medium text-red-500">{error}</p>
          )}
        </label>
      )}
      <button
        type="button"
        id="recruitPeriod"
        className={cn(
          'mt-1 flex w-full cursor-pointer items-center justify-center gap-1 rounded-md border-2 border-transparent bg-[#D9D9D920] py-3 text-xs text-white transition-colors duration-300 focus:border-[#00D451] lg:gap-1 lg:px-2 lg:text-sm',
          error && 'border-red-500',
        )}
        onClick={toggleCalender}
      >
        {formatDateRange(startDate, endDate)}
      </button>
      {isCalenderOpen && (
        <div
          className={cn(
            'absolute z-50 mt-1 min-w-full origin-top rounded-lg border bg-white p-4 text-center shadow-2xl',
            isCalenderClosing ? 'animate-scale-out' : 'animate-scale-in',
            variant === 'light'
              ? 'bg-white text-black'
              : 'bg-[#1B1B1B] text-white',
          )}
        >
          <CalenderBody
            onDateSelect={handleDateSelect}
            startDate={startDate}
            endDate={endDate}
            onClose={closeCalender}
            timeEnabled={timeEnabled}
            onTimeEnabledChange={setTimeEnabled}
            startTime={startTime}
            endTime={endTime}
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
            variant="dark"
          />
        </div>
      )}
    </fieldset>
  );
}

export default DateRangePicker;
