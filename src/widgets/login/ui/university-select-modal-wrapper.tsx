'use client';

import { useState, useEffect } from 'react';
import type { University } from '@/entities/university/model/type';
import getUniversities from '@/entities/university/api/getUniversities';
import patchUniversityCode from '@/features/my/api/patchUniversityCode';
import UniversitySelectModal from './university-select-modal';

function UniversitySelectModalWrapper() {
  const [isOpen, setIsOpen] = useState(true);
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    getUniversities().then((res) => {
      if (res.data?.universities) {
        setUniversities(res.data.universities);
      }
    });
  }, []);

  return (
    <UniversitySelectModal
      isOpen={isOpen}
      universities={universities}
      onConfirm={async (code) => {
        await patchUniversityCode(code === 'NONE' ? null : code);
        setIsOpen(false);
      }}
    />
  );
}

export default UniversitySelectModalWrapper;
