import { useEffect, useRef, useState } from 'react';

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
}

export default function useCalender({
  onStartDateChange,
  onEndDateChange,
  onRangeComplete,
}: UseCalenderProps = {}): UseCalenderReturn {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [isCalenderClosing, setIsCalenderClosing] = useState(false);
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
    } else if (formattedDate < currentStart) {
      onStartDateChange?.(formattedDate);
    } else {
      onEndDateChange?.(formattedDate);
      onRangeComplete?.(currentStart, formattedDate);
    }
  };

  const formatDateRange = (
    start: string | null,
    end: string | null,
  ): string => {
    const formattedStart = start ? start.replace(/-/g, '.') : '시작일';
    const formattedEnd = end ? end.replace(/-/g, '.') : '마감일';

    if (start || end) {
      return `${formattedStart} ~ ${formattedEnd}`;
    }
    return '모집 기간을 선택해주세요';
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
  };
}
