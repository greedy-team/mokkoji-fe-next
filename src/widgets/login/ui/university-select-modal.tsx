'use client';

import { useState } from 'react';
import cn from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import type { University } from '@/entities/university/model/type';

interface UniversitySelectModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  universities: University[];
  universityCode: string | null;
  onConfirm: (universityCode: string) => void;
  onClose: () => void;
}

function UniversitySelectModal({
  isOpen,
  isLoading = false,
  universities,
  universityCode,
  onConfirm,
  onClose,
}: UniversitySelectModalProps) {
  const [selected, setSelected] = useState<string | null>(universityCode);

  return (
    <>
      <div
        role="presentation"
        className={cn(
          'fixed inset-0 z-40 bg-black/50',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          'fixed right-0 bottom-20 left-0 z-50 rounded-t-3xl bg-white p-5 px-6 md:bottom-0',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <h1 className="text-text-primary mb-2 text-center text-lg font-semibold">
          학교 선택하기
        </h1>
        <p className="text-text-secondary mb-6 text-center text-xs">
          학교를 변경하면 기존 즐겨찾기가 모두 삭제돼요.
        </p>

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
        </div>

        <Button
          type="button"
          variant="submit-default"
          disabled={selected === null || isLoading}
          onClick={() => selected && onConfirm(selected)}
          className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#4AF38A] py-6 font-normal text-[#474747] disabled:text-white"
        >
          {isLoading && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#474747] border-t-transparent" />
          )}
          확인
        </Button>
      </div>
    </>
  );
}

export default UniversitySelectModal;
