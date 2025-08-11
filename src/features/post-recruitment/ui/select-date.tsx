'use client';

import { useEffect, useState } from 'react';

interface SelectDateProps {
  startDate: string;
  endDate: string;
  onChange: (field: 'recruitStart' | 'recruitEnd', value: string) => void;
  errors?: {
    recruitStart?: string;
    recruitEnd?: string;
  };
}

export default function SelectDate({
  startDate,
  endDate,
  onChange,
  errors,
}: SelectDateProps) {
  const [start, setStart] = useState({ year: '', month: '', day: '' });
  const [end, setEnd] = useState({ year: '', month: '', day: '' });

  useEffect(() => {
    if (startDate.length === 8) {
      setStart({
        year: startDate.slice(0, 4),
        month: startDate.slice(4, 6),
        day: startDate.slice(6, 8),
      });
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate.length === 8) {
      setEnd({
        year: endDate.slice(0, 4),
        month: endDate.slice(4, 6),
        day: endDate.slice(6, 8),
      });
    }
  }, [endDate]);

  const handleDateChange = (
    type: 'start' | 'end',
    field: 'year' | 'month' | 'day',
    value: string,
  ) => {
    const target = type === 'start' ? start : end;
    const updated = { ...target, [field]: value };
    if (type === 'start') {
      setStart(updated);
    } else {
      setEnd(updated);
    }

    const toLocalDateTimeString = (dateObj: {
      year: string;
      month: string;
      day: string;
    }) => {
      const { year, month, day } = dateObj;
      return `${year.padStart(4, '0')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00`;
    };

    const dateStr = toLocalDateTimeString(updated);
    if (
      updated.year.length === 4 &&
      updated.month.length >= 1 &&
      updated.day.length >= 1
    ) {
      onChange(type === 'start' ? 'recruitStart' : 'recruitEnd', dateStr);
    }
  };

  const getMaxDay = (month: string) => {
    const m = Number(month);
    if ([1, 3, 5, 7, 8, 10, 12].includes(m)) return 31;
    if ([4, 6, 9, 11].includes(m)) return 30;
    if (m === 2) return 28;
    return 31;
  };

  return (
    <div className="flex items-center justify-center gap-1 rounded-md border-2 py-3 text-xs text-gray-700 focus-within:border-[#00E457] lg:gap-4 lg:px-4 lg:text-sm">
      <div className="flex items-center gap-1">
        <input
          type="text"
          placeholder="YYYY"
          value={start.year}
          onChange={(e) =>
            handleDateChange(
              'start',
              'year',
              e.target.value.replace(/[^0-9]/g, '').slice(0, 4),
            )
          }
          className="w-[30px] text-right focus:outline-none lg:w-[40px]"
        />
        <span>년 /</span>
        <input
          type="text"
          placeholder="MM"
          value={start.month}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
            const valid = Math.min(Number(raw), 12).toString();
            handleDateChange('start', 'month', valid);
          }}
          className="w-[22px] text-right focus:outline-none lg:w-[25px]"
        />
        <span>월 /</span>
        <input
          type="text"
          placeholder="DD"
          value={start.day}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
            const maxDay = getMaxDay(start.month);
            const dayNum = Math.min(Number(raw) || 0, maxDay);
            const valid = dayNum === 0 ? '' : dayNum.toString();
            handleDateChange('start', 'day', valid);
          }}
          className="w-[18px] text-right focus:outline-none lg:w-[25px]"
        />
        <span>일</span>
      </div>
      <span>~</span>
      <div className="flex items-center gap-1">
        <input
          type="text"
          placeholder="YYYY"
          value={end.year}
          onChange={(e) =>
            handleDateChange(
              'end',
              'year',
              e.target.value.replace(/[^0-9]/g, '').slice(0, 4),
            )
          }
          className="w-[30px] text-right focus:outline-none lg:w-[40px]"
        />
        <span>년 /</span>
        <input
          type="text"
          placeholder="MM"
          value={end.month}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
            const valid = Math.min(Number(raw), 12).toString();
            handleDateChange('end', 'month', valid);
          }}
          className="w-[22px] text-right focus:outline-none lg:w-[25px]"
        />
        <span>월 /</span>
        <input
          type="text"
          placeholder="DD"
          value={end.day}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
            const maxDay = getMaxDay(start.month);
            const dayNum = Math.min(Number(raw) || 0, maxDay);
            const valid = dayNum === 0 ? '' : dayNum.toString();
            handleDateChange('end', 'day', valid);
          }}
          className="w-[18px] text-right focus:outline-none lg:w-[25px]"
        />
        <span>일</span>
      </div>
    </div>
  );
}
