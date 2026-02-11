'use client';

import { useState, useRef, useEffect } from 'react';
import cn from '@/shared/lib/utils';
import CalenderBody from './calender-body';
import useCalender from './useCalender';
import {
  formatDateWithTime,
  formatDateInput,
  isValidDateFormat,
  formatDateToString,
  extractDateOnly,
} from './date-utils';

type FocusedField = 'start' | 'end' | null;

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
  const [focusedField, setFocusedField] = useState<FocusedField>(null);
  const [startInputValue, setStartInputValue] = useState('');
  const [endInputValue, setEndInputValue] = useState('');
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef(startDate);
  const endDateRef = useRef(endDate);
  startDateRef.current = startDate;
  endDateRef.current = endDate;

  const {
    isCalenderOpen,
    isCalenderClosing,
    calendarRef,
    closeCalender,
    openCalender,
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

  useEffect(() => {
    setStartInputValue(extractDateOnly(startDate));
  }, [startDate]);

  useEffect(() => {
    setEndInputValue(extractDateOnly(endDate));
  }, [endDate]);

  const handleStartInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value);
    setStartInputValue(formatted);

    if (isValidDateFormat(formatted)) {
      onStartDateChange(formatDateWithTime(formatted, false));
      setStartTime({ hour: 0, minute: 0, second: 0 });
    }
  };

  const handleEndInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value);
    setEndInputValue(formatted);

    if (isValidDateFormat(formatted)) {
      onEndDateChange(formatDateWithTime(formatted, true));
      setEndTime({ hour: 23, minute: 59, second: 59 });
    }
  };

  const handleStartInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter' && isValidDateFormat(startInputValue)) {
      setFocusedField('end');
      endInputRef.current?.focus();
    }
  };

  const handleEndInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isValidDateFormat(endInputValue)) {
      closeCalender();
      endInputRef.current?.blur();
      onRangeComplete?.();
    }
  };

  const handleStartInputFocus = () => {
    setFocusedField('start');
    openCalender();
  };

  const handleEndInputFocus = () => {
    setFocusedField('end');
    openCalender();
  };

  const handleDateSelect = (selectedDate: Date) => {
    const formattedDate = formatDateToString(selectedDate);

    if (focusedField === 'start' || (!focusedField && !startDate)) {
      onStartDateChange(formatDateWithTime(formattedDate, false));
      setStartTime({ hour: 0, minute: 0, second: 0 });
      setFocusedField('end');
      endInputRef.current?.focus();
    } else if (focusedField === 'end') {
      if (startDate && formattedDate < extractDateOnly(startDate)) {
        onStartDateChange(formatDateWithTime(formattedDate, false));
        setStartTime({ hour: 0, minute: 0, second: 0 });
      } else {
        onEndDateChange(formatDateWithTime(formattedDate, true));
        setEndTime({ hour: 23, minute: 59, second: 59 });
        onRangeComplete?.();
      }
    }
  };

  const handleInputBlur = (field: FocusedField) => {
    setTimeout(() => {
      if (field === 'start') {
        setStartInputValue((prev) =>
          isValidDateFormat(prev)
            ? prev
            : extractDateOnly(startDateRef.current),
        );
      }
      if (field === 'end') {
        setEndInputValue((prev) =>
          isValidDateFormat(prev) ? prev : extractDateOnly(endDateRef.current),
        );
      }
    }, 100);
  };

  return (
    <fieldset className="relative" ref={calendarRef}>
      {label && (
        <div className="flex items-center gap-3">
          <label
            htmlFor="recruitPeriodStart"
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

      {isAlwaysRecruiting ? (
        <div className="mt-1 flex w-full items-center justify-center rounded-md border-2 border-transparent bg-[#D9D9D920] py-3 text-sm text-white opacity-50">
          상시모집
        </div>
      ) : (
        <div className="mt-1 flex items-center gap-2">
          <input
            ref={startInputRef}
            type="text"
            id="recruitPeriodStart"
            placeholder="YYYY-MM-DD"
            value={startInputValue}
            onChange={handleStartInputChange}
            onKeyDown={handleStartInputKeyDown}
            onFocus={handleStartInputFocus}
            onBlur={() => handleInputBlur('start')}
            className={cn(
              'flex-1 rounded-md border-2 bg-[#D9D9D920] px-3 py-3 text-center text-xs text-white transition-colors duration-300 outline-none lg:text-sm',
              focusedField === 'start'
                ? 'border-[#00D451]'
                : 'border-transparent',
              error && 'border-red-500',
            )}
          />
          <span className="text-sm text-gray-400">~</span>
          <input
            ref={endInputRef}
            type="text"
            id="recruitPeriodEnd"
            placeholder="YYYY-MM-DD"
            value={endInputValue}
            onChange={handleEndInputChange}
            onKeyDown={handleEndInputKeyDown}
            onFocus={handleEndInputFocus}
            onBlur={() => handleInputBlur('end')}
            className={cn(
              'flex-1 rounded-md border-2 bg-[#D9D9D920] px-3 py-3 text-center text-xs text-white transition-colors duration-300 outline-none lg:text-sm',
              focusedField === 'end'
                ? 'border-[#00D451]'
                : 'border-transparent',
              error && 'border-red-500',
            )}
          />
        </div>
      )}

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
