'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import ClubDescriptionEditor from '@/shared/ui/ClubDescriptionEditor';

interface Props {
  onSubmit: (description: string) => void;
  isSubmitting: boolean;
}

function ClubCreateDescriptionStep({ onSubmit, isSubmitting }: Props) {
  const [content, setContent] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);

  return (
    <div className="flex flex-col gap-6 py-8">
      <h2 className="text-base font-bold">동아리 소개</h2>

      <ClubDescriptionEditor
        onChange={(html, empty) => {
          setContent(html);
          setIsEmpty(empty);
        }}
      />

      <Button
        type="button"
        variant="submit-default"
        disabled={isEmpty || isSubmitting}
        onClick={() => onSubmit(content)}
        className="mt-2 rounded-xl bg-[#4AF38A] py-6 font-normal text-[#474747] disabled:text-white"
      >
        {isSubmitting ? '제출 중입니다...' : '제출하기'}
      </Button>
    </div>
  );
}

export default ClubCreateDescriptionStep;
