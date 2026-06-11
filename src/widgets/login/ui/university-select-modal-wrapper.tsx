'use client';

import { useState } from 'react';
import UniversitySelectModal from './university-select-modal';

function UniversitySelectModalWrapper() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <UniversitySelectModal isOpen={isOpen} onConfirm={() => setIsOpen(false)} />
  );
}

export default UniversitySelectModalWrapper;
