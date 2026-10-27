'use client';

import { useId, useMemo, useState } from 'react';
import type { InputHTMLAttributes, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { getClubNameListOptions } from '@/shared/api/queries';
import type { ClubName } from '@/shared/api/getClientClubNameList';
import filterClubNames from '@/shared/lib/filterClubNames';
import useUniversityCode from '@/shared/hooks/useUniversityCode';
import cn from '@/shared/lib/utils';

interface ClubNameAutocompleteInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'onFocus' | 'onBlur' | 'onKeyDown'
  > {
  value: string;
  onChange: (value: string) => void;
}

// 목록은 position: relative인 가장 가까운 조상 기준으로 input 아래에 붙는다
function ClubNameAutocompleteInput({
  value,
  onChange,
  ...inputAttributes
}: ClubNameAutocompleteInputProps) {
  const router = useRouter();
  const universityCode = useUniversityCode();
  const listId = useId();
  const [hasFocused, setHasFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [previousValue, setPreviousValue] = useState(value);

  if (value !== previousValue) {
    setPreviousValue(value);
    setActiveIndex(-1);
  }

  const { data: clubNames } = useQuery(
    getClubNameListOptions(universityCode, hasFocused),
  );

  const matchedClubs = useMemo(
    () => filterClubNames(clubNames ?? [], value),
    [clubNames, value],
  );
  const isListVisible = isOpen && matchedClubs.length > 0;

  const close = () => {
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const selectClub = (club: ClubName) => {
    close();
    router.push(`/${universityCode}/club/${club.id}`);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // 한글 조합 중 Enter/방향키가 두 번 처리되는 것을 막는다
    if (event.nativeEvent.isComposing || !isListVisible) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % matchedClubs.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) =>
        index <= 0 ? matchedClubs.length - 1 : index - 1,
      );
    } else if (event.key === 'Escape') {
      close();
    } else if (event.key === 'Enter') {
      if (activeIndex < 0) {
        close();
        return;
      }
      event.preventDefault();
      selectClub(matchedClubs[activeIndex]);
    }
  };

  return (
    <>
      <input
        type="text"
        {...inputAttributes}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          setHasFocused(true);
          setIsOpen(true);
        }}
        onBlur={close}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isListVisible}
        aria-controls={listId}
        aria-activedescendant={
          activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined
        }
        autoComplete="off"
      />
      <ul
        id={listId}
        role="listbox"
        hidden={!isListVisible}
        className="border-gray2 absolute top-full left-0 z-20 w-full overflow-hidden rounded-lg border bg-white py-2 shadow-md"
      >
        {matchedClubs.map((club, index) => (
          <li
            key={club.id}
            id={`${listId}-${index}`}
            role="option"
            aria-selected={index === activeIndex}
            // click은 input blur로 목록이 닫힌 뒤에 발생하므로 mousedown에서 선택한다
            onMouseDown={(event) => {
              event.preventDefault();
              selectClub(club);
            }}
            className={cn(
              'text-text-secondary hover:bg-gray4 flex cursor-pointer items-center gap-2 px-4 py-2 text-sm lg:text-base',
              index === activeIndex && 'bg-gray4 text-text-primary',
            )}
          >
            <Search aria-hidden className="text-gray size-4 shrink-0" />
            <span className="truncate">{club.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ClubNameAutocompleteInput;
