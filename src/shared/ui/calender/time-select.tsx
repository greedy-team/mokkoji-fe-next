'use client';

import { useRef, useState, useEffect } from 'react';

interface TimeSelectProps {
  value: number;
  onChange: (value: number) => void;
  disabled: boolean;
  options: number[];
  unit: string;
  variant?: 'dark' | 'light';
}

function TimeSelect({
  value,
  onChange,
  disabled,
  options,
  unit,
  variant = 'light',
}: TimeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const formatTimeUnit = (num: number) => String(num).padStart(2, '0');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-14 rounded px-2 py-1 text-xs disabled:cursor-not-allowed ${
            variant === 'dark'
              ? 'bg-[#2A2A2A] text-white disabled:bg-gray-700'
              : 'bg-white text-black disabled:bg-gray-100'
          }`}
        >
          {formatTimeUnit(value)}
        </button>
        {isOpen && (
          <div
            className={`scrollbar-hide absolute bottom-full left-0 z-50 mb-1 max-h-32 w-14 overflow-y-auto rounded shadow-lg ${
              variant === 'dark' ? 'bg-[#2A2A2A]' : 'bg-white'
            }`}
          >
            {options.map((option) => {
              const isSelected = option === value;
              let textColor = 'text-black';
              if (!isSelected) {
                textColor = variant === 'dark' ? 'text-white' : 'text-black';
              }

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full px-2 py-1 text-left text-xs hover:bg-[#00D451] hover:text-white ${
                    isSelected ? 'bg-[#00D451] text-white' : textColor
                  }`}
                >
                  {formatTimeUnit(option)}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <span className={variant === 'dark' ? 'text-white' : 'text-black'}>
        {unit}
      </span>
    </>
  );
}

export default TimeSelect;
