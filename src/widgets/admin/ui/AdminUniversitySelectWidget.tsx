'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

interface UniversityOption {
  code: string;
  name: string;
}

interface AdminUniversitySelectWidgetProps {
  universities: UniversityOption[];
  selectedCode: string;
}

function AdminUniversitySelectWidget({
  universities,
  selectedCode,
}: AdminUniversitySelectWidgetProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeUniversity = (code: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('universityCode', code);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={selectedCode} onValueChange={changeUniversity}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="학교를 선택해주세요" />
      </SelectTrigger>
      <SelectContent>
        {universities.map((university) => (
          <SelectItem key={university.code} value={university.code}>
            {university.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default AdminUniversitySelectWidget;
