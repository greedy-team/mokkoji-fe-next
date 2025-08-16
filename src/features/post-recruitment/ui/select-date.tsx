'use client';

import { useEffect, useMemo, useState } from 'react';

interface SelectDateProps {
  startDate: string; // 예: "2025-08-01T00:00:00" 또는 "20250801"
  endDate: string; // 예: "2025-08-31T00:00:00"   또는 "20250831"
  onChange: (field: 'recruitStart' | 'recruitEnd', value: string) => void;
  errors?: {
    recruitStart?: string;
    recruitEnd?: string;
  };
}

type YMD = { year: string; month: string; day: string };

export default function SelectDate({
  startDate,
  endDate,
  onChange,
  errors,
}: SelectDateProps) {
  const [start, setStart] = useState<YMD>({ year: '', month: '', day: '' });
  const [end, setEnd] = useState<YMD>({ year: '', month: '', day: '' });

  // 내부 유효성(시작>마감) 오류
  const [orderError, setOrderError] = useState<string>('');

  // ---------- Helpers ----------
  const toYMD = (dateStr: string): YMD => {
    // "YYYYMMDD" 또는 "YYYY-MM-DD..." 모두 지원
    const compact = dateStr.replaceAll('-', '').slice(0, 8);
    if (compact.length === 8) {
      return {
        year: compact.slice(0, 4),
        month: compact.slice(4, 6),
        day: compact.slice(6, 8),
      };
    }
    return { year: '', month: '', day: '' };
  };

  const pad2 = (s: string) => s.padStart(2, '0');

  const toIsoString = (d: YMD) => {
    if (!d.year || !d.month || !d.day) return '';
    return `${d.year}-${pad2(d.month)}-${pad2(d.day)}T00:00:00`;
  };

  const isComplete = (d: YMD) =>
    d.year.length === 4 && d.month.length >= 1 && d.day.length >= 1;

  const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

  const getMaxDay = (year: string, month: string) => {
    const y = Number(year || '0');
    const m = Number(month || '0');
    if ([1, 3, 5, 7, 8, 10, 12].includes(m)) return 31;
    if ([4, 6, 9, 11].includes(m)) return 30;
    if (m === 2) return isLeap(y) ? 29 : 28;
    return 31;
  };

  const ymdToDate = (d: YMD) => {
    if (!isComplete(d)) return null;
    const iso = `${d.year}-${pad2(d.month)}-${pad2(d.day)}T00:00:00`;
    const dt = new Date(iso);
    return Number.isNaN(dt.getTime()) ? null : dt;
  };

  // ---------- Sync from props ----------
  useEffect(() => {
    setStart(toYMD(startDate));
  }, [startDate]);

  useEffect(() => {
    setEnd(toYMD(endDate));
  }, [endDate]);

  // ---------- Compare dates ----------
  const startObj = useMemo(() => ymdToDate(start), [start]);
  const endObj = useMemo(() => ymdToDate(end), [end]);

  useEffect(() => {
    if (startObj && endObj) {
      if (startObj > endObj) {
        setOrderError('시작일이 마감일보다 늦습니다.');
      } else {
        setOrderError('');
      }
    } else {
      setOrderError('');
    }
  }, [startObj, endObj]);

  // ---------- Change handlers ----------
  const clampMonth = (raw: string) => {
    const clean = raw.replace(/[^0-9]/g, '').slice(0, 2);
    const num = Math.min(Number(clean || '0'), 12);
    return num === 0 ? '' : String(num);
  };

  const clampDay = (raw: string, year: string, month: string) => {
    const clean = raw.replace(/[^0-9]/g, '').slice(0, 2);
    const max = getMaxDay(year, month);
    const num = Math.min(Number(clean || '0'), max);
    return num === 0 ? '' : String(num);
  };

  const clampYear = (raw: string) => raw.replace(/[^0-9]/g, '').slice(0, 4);

  const handleDateChange = (
    type: 'start' | 'end',
    field: 'year' | 'month' | 'day',
    value: string,
  ) => {
    const curr = type === 'start' ? start : end;

    let nextPiece = value;
    if (field === 'year') nextPiece = clampYear(value);
    if (field === 'month') nextPiece = clampMonth(value);
    if (field === 'day') nextPiece = clampDay(value, curr.year, curr.month);

    const updated: YMD = { ...curr, [field]: nextPiece };

    // day를 입력했는데 month/year가 바뀐 경우 최대일 다시 보정
    if (field !== 'day' && updated.day) {
      updated.day = clampDay(updated.day, updated.year, updated.month);
    }

    if (type === 'start') setStart(updated);
    else setEnd(updated);

    // 부모로 값을 전달(완성된 경우만)
    if (isComplete(updated)) {
      const iso = toIsoString(updated);
      onChange(type === 'start' ? 'recruitStart' : 'recruitEnd', iso);
    }
  };

  const startInvalid = Boolean(errors?.recruitStart) || Boolean(orderError);
  const endInvalid = Boolean(errors?.recruitEnd) || Boolean(orderError);

  return (
    <div
      className={[
        'flex items-center justify-center gap-1 rounded-md border-2 py-3 text-xs text-gray-700 lg:gap-4 lg:px-4 lg:text-sm',
        startInvalid || endInvalid
          ? 'border-red-500'
          : 'focus-within:border-[#00E457]',
      ].join(' ')}
    >
      {/* 시작일 */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <input
            type="text"
            placeholder="YYYY"
            value={start.year}
            onChange={(e) => handleDateChange('start', 'year', e.target.value)}
            className="w-[30px] text-right focus:outline-none lg:w-[40px]"
            aria-invalid={startInvalid}
            inputMode="numeric"
          />
          <span>년 /</span>
          <input
            type="text"
            placeholder="MM"
            value={start.month}
            onChange={(e) => handleDateChange('start', 'month', e.target.value)}
            className="w-[22px] text-right focus:outline-none lg:w-[25px]"
            aria-invalid={startInvalid}
            inputMode="numeric"
          />
          <span>월 /</span>
          <input
            type="text"
            placeholder="DD"
            value={start.day}
            onChange={(e) => handleDateChange('start', 'day', e.target.value)}
            className="w-[18px] text-right focus:outline-none lg:w-[25px]"
            aria-invalid={startInvalid}
            inputMode="numeric"
          />
          <span>일</span>
        </div>
        {(errors?.recruitStart || orderError) && (
          <p className="text-[11px] text-red-500">
            {orderError || errors?.recruitStart}
          </p>
        )}
      </div>

      <span className="px-1">~</span>

      {/* 마감일 */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <input
            type="text"
            placeholder="YYYY"
            value={end.year}
            onChange={(e) => handleDateChange('end', 'year', e.target.value)}
            className="w-[30px] text-right focus:outline-none lg:w-[40px]"
            aria-invalid={endInvalid}
            inputMode="numeric"
          />
          <span>년 /</span>
          <input
            type="text"
            placeholder="MM"
            value={end.month}
            onChange={(e) => handleDateChange('end', 'month', e.target.value)}
            className="w-[22px] text-right focus:outline-none lg:w-[25px]"
            aria-invalid={endInvalid}
            inputMode="numeric"
          />
          <span>월 /</span>
          <input
            type="text"
            placeholder="DD"
            value={end.day}
            onChange={(e) => handleDateChange('end', 'day', e.target.value)}
            className="w-[18px] text-right focus:outline-none lg:w-[25px]"
            aria-invalid={endInvalid}
            inputMode="numeric"
          />
          <span>일</span>
        </div>
        {(errors?.recruitEnd || orderError) && (
          <p className="text-[11px] text-red-500">
            {orderError || errors?.recruitEnd}
          </p>
        )}
      </div>
    </div>
  );
}
