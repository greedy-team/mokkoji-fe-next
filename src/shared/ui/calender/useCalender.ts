import { useEffect, useRef, useState } from 'react';

export interface TimeValue {
  hour: number;
  minute: number;
  second: number;
}

interface UseCalenderProps {
  startDate?: string | null;
  endDate?: string | null;
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
}

export default function useCalender({
  startDate,
  endDate,
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
    const isClickOutside = (event: MouseEvent) => {
      return (
        isCalenderOpen &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      );
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (isClickOutside(event)) {
        closeCalender();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalenderOpen]);

  const getFormattedDateTime = (
    date: string | null,
    time: TimeValue | null,
  ): string => {
    if (!date) return '';

    const finalTime = time || { hour: 0, minute: 0, second: 0 };
    const hour = String(finalTime.hour).padStart(2, '0');
    const minute = String(finalTime.minute).padStart(2, '0');
    const second = String(finalTime.second).padStart(2, '0');

    return `${date}T${hour}:${minute}:${second}`;
  };

  useEffect(() => {
    if (startDate && startTime) {
      const dateOnly = startDate.split('T')[0];
      const formatted = getFormattedDateTime(dateOnly, startTime);
      if (formatted !== startDate) {
        onStartDateChange?.(formatted);
      }
    }
  }, [startTime]);

  useEffect(() => {
    if (endDate && endTime) {
      const dateOnly = endDate.split('T')[0];
      const formatted = getFormattedDateTime(dateOnly, endTime);
      if (formatted !== endDate) {
        onEndDateChange?.(formatted);
      }
    }
  }, [endTime]);

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
      const newStartTime = { hour: 0, minute: 0, second: 0 };
      const newEndTime = { hour: 23, minute: 59, second: 59 };
      setStartTime(newStartTime);
      setEndTime(newEndTime);

      const startDateTime = `${formattedDate}T00:00:00`;
      onStartDateChange?.(startDateTime);
      onEndDateChange?.('');
    } else if (formattedDate < currentStart) {
      const newStartTime = { hour: 0, minute: 0, second: 0 };
      setStartTime(newStartTime);

      const startDateTime = `${formattedDate}T00:00:00`;
      onStartDateChange?.(startDateTime);
    } else {
      const newEndTime = { hour: 23, minute: 59, second: 59 };
      setEndTime(newEndTime);

      const endDateTime = `${formattedDate}T23:59:59`;
      onEndDateChange?.(endDateTime);
      onRangeComplete?.(currentStart, formattedDate);
    }
  };

  const formatDateRange = (
    start: string | null,
    end: string | null,
  ): string => {
    const formatDateTime = (dateTimeStr: string | null) => {
      if (!dateTimeStr) return null;

      const [dateStr, timeStr] = dateTimeStr.split('T');
      const [year, month, day] = dateStr.split('-');
      const displayDate = `${year}년 ${month}월 ${day}일`;

      if (!timeEnabled || !timeStr) {
        return displayDate;
      }

      const [hour, minute, second] = timeStr.split(':');
      return `${displayDate} ${hour}:${minute}:${second}`;
    };

    const formattedStart = formatDateTime(start) || 'YYYY년 / MM월 / DD일';
    const formattedEnd = formatDateTime(end) || 'YYYY년 / MM월 / DD일';

    if (start || end) {
      return `${formattedStart} ~ ${formattedEnd}`;
    }
    return 'YYYY년 / MM월 / DD일 ~ YYYY년 / MM월 / DD일';
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
  };
}
