'use client';

const TIME_UNITS = [
  { key: 'hour', unit: '시' },
  { key: 'minute', unit: '분' },
  { key: 'second', unit: '초' },
] as const;

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

  const timeConfigs = [
    {
      label: '시작 시간',
      show: hasStartDate,
      time: startTime,
      onChange: onStartTimeChange,
      defaults: { hour: 0, minute: 0, second: 0 },
    },
    {
      label: '마감 시간',
      show: hasEndDate,
      time: endTime,
      onChange: onEndTimeChange,
      defaults: { hour: 23, minute: 59, second: 59 },
    },
  ];

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
        {timeConfigs.map(
          ({ label, show, time, onChange, defaults }) =>
            show && (
              <div
                key={label}
                className="flex h-fit items-center justify-around"
              >
                <p className="text-xs font-medium text-gray-600">{label}</p>
                <div className="flex items-center gap-2 text-xs font-medium">
                  {TIME_UNITS.map(({ key, unit }) => {
                    let options: number[];
                    if (key === 'hour') {
                      options = hours;
                    } else if (key === 'minute') {
                      options = minutes;
                    } else {
                      options = seconds;
                    }

                    return (
                      <TimeSelect
                        key={key}
                        value={
                          time?.[key as keyof typeof time] ??
                          defaults[key as keyof typeof defaults]
                        }
                        onChange={(value) =>
                          onChange({
                            ...defaults,
                            ...time,
                            [key]: value,
                          })
                        }
                        disabled={!enabled}
                        options={options}
                        unit={unit}
                      />
                    );
                  })}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
}

export default TimePicker;
