'use client';

import { useParams } from 'next/navigation';

const DEFAULT_UNIVERSITY_CODE = 'sejong';

export default function useUniversityCode(): string {
  const params = useParams<{ universityCode?: string }>();
  return params.universityCode ?? DEFAULT_UNIVERSITY_CODE;
}
