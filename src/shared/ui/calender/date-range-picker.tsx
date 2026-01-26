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
  isAlwaysRecruiting?: boolean;
  onAlwaysRecruitingChange?: (value: boolean) => void;
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
  isAlwaysRecruiting = false,
  onAlwaysRecruitingChange,
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
        <div className="flex items-center gap-3">
          <label
            htmlFor="recruitPeriod"
            className="flex gap-2 text-base font-medium lg:font-semibold"
          >
            {label}
            {error && (
              <p className="pt-1 text-xs font-medium text-red-500">{error}</p>
            )}
          </label>
          {onAlwaysRecruitingChange && (
            <button
              type="button"
              onClick={() => onAlwaysRecruitingChange(!isAlwaysRecruiting)}
              className="flex cursor-pointer items-center gap-1 text-sm"
            >
              <span
                className={cn(
                  'flex h-5 w-5 items-center justify-center rounded-full border-none transition-colors',
                  isAlwaysRecruiting ? 'bg-[#00D451]' : 'bg-[#3a3a3a]',
                )}
              >
                <svg
                  className={cn(
                    'h-3 w-3 transition-colors',
                    isAlwaysRecruiting ? 'text-white' : 'text-[#858585]',
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              상시모집
            </button>
          )}
        </div>
      )}
      <button
        type="button"
        id="recruitPeriod"
        disabled={isAlwaysRecruiting}
        className={cn(
          'mt-1 flex w-full items-center justify-center gap-1 rounded-md border-2 border-transparent bg-[#D9D9D920] py-3 text-xs text-white transition-colors duration-300 focus:border-[#00D451] lg:gap-1 lg:px-2 lg:text-sm',
          error && 'border-red-500',
          isAlwaysRecruiting
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer',
        )}
        onClick={toggleCalender}
      >
        {isAlwaysRecruiting ? '상시모집' : formatDateRange(startDate, endDate)}
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
