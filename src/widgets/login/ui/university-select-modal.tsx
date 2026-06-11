'use client';

import { useState } from 'react';
import cn from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import type { University } from '@/entities/university/model/type';

interface UniversitySelectModalProps {
  isOpen: boolean;
  universities: University[];
  universityCode: string | null;
  onConfirm: (universityCode: string) => void;
}

function UniversitySelectModal({
  isOpen,
  universities,
  universityCode,
  onConfirm,
}: UniversitySelectModalProps) {
  const [selected, setSelected] = useState<string | null>(universityCode);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <div
        className={cn(
          'fixed right-0 bottom-20 left-0 z-50 rounded-t-3xl bg-white p-5 px-6 md:bottom-0',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <h1 className="text-text-primary mb-6 text-center text-lg font-semibold">
          학교 선택하기
        </h1>

        <div className="mb-30 flex flex-wrap gap-3">
          {universities.map(({ code, name }) => {
            const isSelected = selected === code;
            return (
              <Button
                key={code}
                type="button"
                variant={isSelected ? 'optionsSelected' : 'options'}
                size="none"
                onClick={() => setSelected(code)}
                className={`px-4 py-2.5 text-sm ${isSelected ? 'border-[#22CF64] text-[#22CF64]' : 'border-[#F8F8F8] bg-[#F8F8F8] text-[#8B95A1]'}`}
              >
                {name}
              </Button>
            );
          })}
          <Button
            type="button"
            variant={selected === 'NONE' ? 'optionsSelected' : 'options'}
            size="none"
            onClick={() => setSelected('NONE')}
            className={`px-4 py-2.5 text-sm ${selected === 'NONE' ? 'border-[#22CF64] text-[#22CF64]' : 'border-[#F8F8F8] bg-[#F8F8F8] text-[#8B95A1]'}`}
          >
            학교없음
          </Button>
        </div>

        <Button
          type="button"
          variant="submit-default"
          disabled={selected === null}
          onClick={() => selected && onConfirm(selected)}
          className="mt-2 rounded-xl bg-[#4AF38A] py-6 font-normal text-[#474747] disabled:text-white"
        >
          확인
        </Button>
      </div>
    </>
  );
}

export default UniversitySelectModal;
