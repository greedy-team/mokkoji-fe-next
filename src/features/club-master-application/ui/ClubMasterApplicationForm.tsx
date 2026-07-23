'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useUniversityCode from '@/shared/hooks/useUniversityCode';
import { useSession } from '@/shared/lib/session-context';
import { urlCodeToApiCode } from '@/shared/lib/universityMeta';
import { Button } from '@/shared/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import type { University } from '@/entities/university/model/type';
import getClubsByUniversity from '../api/getClubsByUniversity';
import postClubMasterApplication from '../api/postClubMasterApplication';
import type { ClubSummary } from '../model/type';

interface ClubMasterApplicationFormProps {
  universities: University[];
}

function ClubMasterApplicationForm({
  universities,
}: ClubMasterApplicationFormProps) {
  const router = useRouter();
  const universityCode = useUniversityCode();
  const { session } = useSession();
  const [isClubsLoading, setIsClubsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedUniversityCode, setSelectedUniversityCode] = useState(
    urlCodeToApiCode(universityCode),
  );
  const [selectedClubId, setSelectedClubId] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [clubs, setClubs] = useState<ClubSummary[]>([]);

  useEffect(() => {
    getClubsByUniversity(urlCodeToApiCode(universityCode)).then((result) => {
      setClubs(result);
      setIsClubsLoading(false);
    });
  }, [universityCode]);

  const handleUniversityChange = (value: string) => {
    setSelectedUniversityCode(value);
    setSelectedClubId('');
    setIsClubsLoading(true);
    getClubsByUniversity(value).then((result) => {
      setClubs(result);
      setIsClubsLoading(false);
    });
  };

  const isValid =
    selectedUniversityCode !== '' && selectedClubId !== '' && isConfirmed;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const result = await postClubMasterApplication({
      universityCode: selectedUniversityCode,
      clubId: Number(selectedClubId),
      userName: session?.user?.name ?? null,
    });
    setIsSubmitting(false);
    if (result.ok) {
      toast.success(
        <span>
          제출되었습니다.
          <br />
          마이페이지에서 현황을 확인하실 수 있습니다.
        </span>,
      );
      router.push(`/${universityCode}/my`);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 py-8">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="master-school" className="text-sm">
          학교
        </label>
        <Select
          value={selectedUniversityCode}
          onValueChange={handleUniversityChange}
        >
          <SelectTrigger
            id="master-school"
            className="h-auto w-full rounded-lg border border-[#D6D6D6] bg-white py-3 indent-1.5 text-sm transition-colors duration-200 focus:border-[#00E457] data-[placeholder]:text-[#9C9C9C]"
          >
            <SelectValue placeholder="모꼬지대학교" />
          </SelectTrigger>
          <SelectContent>
            {universities.map(({ code, name }) => (
              <SelectItem key={code} value={code}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="master-club" className="text-sm">
          동아리명
        </label>
        <Select
          value={selectedClubId}
          onValueChange={setSelectedClubId}
          disabled={!selectedUniversityCode || isClubsLoading}
        >
          <SelectTrigger
            id="master-club"
            className="h-auto w-full rounded-lg border border-[#D6D6D6] bg-white py-3 indent-1.5 text-sm transition-colors duration-200 focus:border-[#00E457] disabled:opacity-50 data-[placeholder]:text-[#9C9C9C]"
          >
            <SelectValue
              placeholder={
                isClubsLoading ? '불러오는 중...' : '동아리를 선택해주세요'
              }
            />
          </SelectTrigger>
          <SelectContent viewportClassName="h-auto max-h-48 overflow-y-auto">
            {clubs.map((club) => (
              <SelectItem key={club.id} value={String(club.id)}>
                {club.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed text-[#474747]">
          신청 전, 해당 동아리에 실제로 소속되어 있는지 확인해주세요.
          <br />
          허위 신청 시 승인이 제한될 수 있습니다.
        </p>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={() => setIsConfirmed(!isConfirmed)}
            className="h-4 w-4 cursor-pointer"
          />
          <span className="text-sm text-[#474747]">확인했어요.</span>
        </label>
      </div>

      <Button
        type="button"
        variant="submit-default"
        disabled={!isValid || isSubmitting}
        onClick={handleSubmit}
        className="mt-2 rounded-xl bg-[#4AF38A] py-6 font-normal text-[#474747] disabled:text-white"
      >
        {isSubmitting ? '제출 중...' : '신청하기'}
      </Button>
    </div>
  );
}

export default ClubMasterApplicationForm;
