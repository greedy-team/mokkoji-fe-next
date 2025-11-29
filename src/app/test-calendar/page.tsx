'use client';

import { useState } from 'react';
import DateRangePicker from '@/shared/ui/calender/date-range-picker';

function TestCalendarPage() {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleRangeComplete = () => {
    setShowResult(true);
    setTimeout(() => setShowResult(false), 3000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          DateRangePicker 테스트
        </h1>

        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(date) => {
            setStartDate(date);
            console.log('시작일 변경:', date);
          }}
          onEndDateChange={(date) => {
            setEndDate(date);
            console.log('종료일 변경:', date);
          }}
          onRangeComplete={handleRangeComplete}
          label="테스트 날짜 범위"
        />

        <div className="mt-8 rounded-md bg-gray-100 p-4">
          <h2 className="mb-2 font-semibold text-gray-700">선택된 날짜:</h2>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">시작일:</span>{' '}
              <span className="text-green-600">
                {startDate || '선택되지 않음'}
              </span>
            </p>
            <p>
              <span className="font-medium">종료일:</span>{' '}
              <span className="text-green-600">
                {endDate || '선택되지 않음'}
              </span>
            </p>
          </div>
        </div>

        {showResult && (
          <div className="animate-fade-in mt-4 rounded-md bg-green-100 p-3 text-center text-sm font-medium text-green-800">
            ✓ 날짜 범위 선택 완료!
          </div>
        )}

        <div className="mt-6 space-y-2 rounded-md bg-blue-50 p-4 text-xs text-gray-600">
          <h3 className="font-semibold text-blue-800">테스트 방법:</h3>
          <ul className="ml-4 list-disc space-y-1">
            <li>날짜 범위 버튼을 클릭하면 캘린더가 열립니다</li>
            <li>첫 번째 날짜를 선택하면 시작일이 설정됩니다</li>
            <li>두 번째 날짜를 선택하면 종료일이 설정됩니다</li>
            <li>외부를 클릭하면 캘린더가 닫힙니다</li>
            <li>닫기 버튼으로도 캘린더를 닫을 수 있습니다</li>
          </ul>
        </div>

        <button
          type="button"
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
          }}
          className="mt-4 w-full rounded-md bg-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
        >
          날짜 초기화
        </button>
      </div>
    </div>
  );
}

export default TestCalendarPage;
