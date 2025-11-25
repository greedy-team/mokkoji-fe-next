'use client';

interface TimePickerProps {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  startTime: { hour: number; minute: number; second: number } | null;
  endTime: { hour: number; minute: number; second: number } | null;
  onStartTimeChange: (time: {
    hour: number;
    minute: number;
    second: number;
  }) => void;
  onEndTimeChange: (time: {
    hour: number;
    minute: number;
    second: number;
  }) => void;
  hasStartDate: boolean;
  hasEndDate: boolean;
}

interface TimeSelectProps {
  value: number;
  onChange: (value: number) => void;
  disabled: boolean;
  options: number[];
  unit: string;
}

function TimeSelect({
  value,
  onChange,
  disabled,
  options,
  unit,
}: TimeSelectProps) {
  const formatTimeUnit = (num: number) => String(num).padStart(2, '0');

  return (
    <>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="flex-1 rounded border border-gray-300 px-2 py-1 focus:border-[#00D451] focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {formatTimeUnit(option)}
          </option>
        ))}
      </select>
      {unit}
    </>
  );
}

function TimePicker({
  enabled,
  onEnabledChange,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  hasStartDate,
  hasEndDate,
}: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const seconds = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="mt-4 border-t pt-4">
      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onEnabledChange(e.target.checked)}
          className="h-4 w-4 cursor-pointer accent-[#00D451]"
        />
        <span className={`text-sm font-medium ${!enabled && 'text-gray-400'}`}>
          모집 시각 지정
        </span>
      </label>

      <div
        className={`mt-3 space-y-3 transition-opacity ${!enabled && 'opacity-50'}`}
      >
        {/* 시작 시간 */}
        {hasStartDate && (
          <div className="flex h-fit items-center justify-around">
            <p className="text-xs font-medium text-gray-600">시작 시간</p>
            <div className="flex items-center gap-2 text-xs font-medium">
              {[
                { key: 'hour', options: hours, unit: '시', default: 0 },
                { key: 'minute', options: minutes, unit: '분', default: 0 },
                { key: 'second', options: seconds, unit: '초', default: 0 },
              ].map(({ key, options, unit, default: defaultValue }) => (
                <TimeSelect
                  key={key}
                  value={
                    startTime?.[key as keyof typeof startTime] ?? defaultValue
                  }
                  onChange={(value) =>
                    onStartTimeChange({
                      ...{ hour: 0, minute: 0, second: 0, ...startTime },
                      [key]: value,
                    })
                  }
                  disabled={!enabled}
                  options={options}
                  unit={unit}
                />
              ))}
            </div>
          </div>
        )}

        {/* 마감 시간 */}
        {hasEndDate && (
          <div className="flex h-fit items-center justify-around">
            <p className="text-xs font-medium text-gray-600">마감 시간</p>
            <div className="flex items-center gap-2 text-xs font-medium">
              {[
                { key: 'hour', options: hours, unit: '시', default: 23 },
                { key: 'minute', options: minutes, unit: '분', default: 59 },
                { key: 'second', options: seconds, unit: '초', default: 59 },
              ].map(({ key, options, unit, default: defaultValue }) => (
                <TimeSelect
                  key={key}
                  value={endTime?.[key as keyof typeof endTime] ?? defaultValue}
                  onChange={(value) =>
                    onEndTimeChange({
                      ...{ hour: 23, minute: 59, second: 59, ...endTime },
                      [key]: value,
                    })
                  }
                  disabled={!enabled}
                  options={options}
                  unit={unit}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimePicker;
