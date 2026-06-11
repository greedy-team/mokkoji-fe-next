'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { University } from '@/entities/university/model/type';
import getUniversities from '@/entities/university/api/getUniversities';
import patchUniversityCode from '@/features/my/api/patchUniversityCode';
import UniversitySelectModal from './university-select-modal';

interface UniversitySelectModalWrapperProps {
  defaultOpen?: boolean;
}

function UniversitySelectModalWrapper({
  defaultOpen = false,
}: UniversitySelectModalWrapperProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    getUniversities().then((res) => {
      if (res.data?.universities) {
        setUniversities(res.data.universities);
      }
    });
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-2 flex items-center gap-2 font-semibold text-gray-600 hover:underline"
      >
        학교 수정하기
        <Image src="/nextBlack.svg" alt="arrow" width={8} height={12} />
      </button>

      <UniversitySelectModal
        isOpen={isOpen}
        universities={universities}
        onConfirm={async (code) => {
          await patchUniversityCode(code === 'NONE' ? null : code);
          setIsOpen(false);
          router.refresh();
        }}
      />
    </>
  );
}

export default UniversitySelectModalWrapper;
