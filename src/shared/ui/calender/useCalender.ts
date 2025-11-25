import { useEffect, useRef, useState } from 'react';

export interface TimeValue {
  hour: number;
  minute: number;
  second: number;
}

interface UseCalenderProps {
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
  onRangeComplete?: (start: string, end: string) => void;
}

interface UseCalenderReturn {
  isCalenderOpen: boolean;
  isCalenderClosing: boolean;
  calendarRef: React.RefObject<HTMLDivElement | null>;
  openCalender: () => void;
  closeCalender: () => void;
  toggleCalender: () => void;
  handleDateSelect: (
    selectedDate: Date,
    currentStart: string | null,
    currentEnd: string | null,
  ) => void;
  formatDateRange: (start: string | null, end: string | null) => string;
  timeEnabled: boolean;
  setTimeEnabled: (enabled: boolean) => void;
  startTime: TimeValue | null;
  endTime: TimeValue | null;
  setStartTime: (time: TimeValue) => void;
  setEndTime: (time: TimeValue) => void;
  getFormattedDateTime: (date: string | null, time: TimeValue | null) => string;
}

export default function useCalender({
  onStartDateChange,
  onEndDateChange,
  onRangeComplete,
}: UseCalenderProps = {}): UseCalenderReturn {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [isCalenderClosing, setIsCalenderClosing] = useState(false);
  const [timeEnabled, setTimeEnabled] = useState(false);
  const [startTime, setStartTime] = useState<TimeValue | null>(null);
  const [endTime, setEndTime] = useState<TimeValue | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const closeCalender = () => {
    setIsCalenderClosing(true);
    setTimeout(() => {
      setIsCalenderOpen(false);
      setIsCalenderClosing(false);
    }, 150);
  };

  const openCalender = () => {
    setIsCalenderOpen(true);
  };

  const toggleCalender = () => {
    setIsCalenderOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isCalenderOpen &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        closeCalender();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalenderOpen]);

  const handleDateSelect = (
    selectedDate: Date,
    currentStart: string | null,
    currentEnd: string | null,
  ) => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    if (!currentStart || currentEnd) {
      onStartDateChange?.(formattedDate);
      onEndDateChange?.('');
      setStartTime({ hour: 0, minute: 0, second: 0 });
      setEndTime({ hour: 23, minute: 59, second: 59 });
    } else if (formattedDate < currentStart) {
      onStartDateChange?.(formattedDate);
      setStartTime({ hour: 0, minute: 0, second: 0 });
    } else {
      onEndDateChange?.(formattedDate);
      setEndTime({ hour: 23, minute: 59, second: 59 });
      onRangeComplete?.(currentStart, formattedDate);
    }
  };

  const formatDateRange = (
    start: string | null,
    end: string | null,
  ): string => {
    const formatDateTime = (date: string | null, time: TimeValue | null) => {
      if (!date) return null;
      const dateStr = date.replace(/-/g, '.');

      if (!timeEnabled || !time) {
        return dateStr;
      }

      const hour = String(time.hour).padStart(2, '0');
      const minute = String(time.minute).padStart(2, '0');
      const second = String(time.second).padStart(2, '0');

      return `${dateStr} ${hour}:${minute}:${second}`;
    };

    const formattedStart = formatDateTime(start, startTime) || '시작일';
    const formattedEnd = formatDateTime(end, endTime) || '마감일';

    if (start || end) {
      return `${formattedStart} ~ ${formattedEnd}`;
    }
    return '모집 기간을 선택해주세요';
  };

  const getFormattedDateTime = (
    date: string | null,
    time: TimeValue | null,
  ): string => {
    if (!date) return '';

    // 시간이 지정되지 않았거나 체크박스 미선택 시 time 값의 기본값 사용
    const finalTime = time || { hour: 0, minute: 0, second: 0 };
    const hour = String(finalTime.hour).padStart(2, '0');
    const minute = String(finalTime.minute).padStart(2, '0');
    const second = String(finalTime.second).padStart(2, '0');

    return `${date}T${hour}:${minute}:${second}`;
  };

  return {
    isCalenderOpen,
    isCalenderClosing,
    calendarRef,
    openCalender,
    closeCalender,
    toggleCalender,
    handleDateSelect,
    formatDateRange,
    timeEnabled,
    setTimeEnabled,
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    getFormattedDateTime,
  };
}
