'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import ClubDescriptionEditor from '@/shared/ui/ClubDescriptionEditor';

interface Props {
  onSubmit: (description: string) => void;
  isSubmitting: boolean;
  initialContent?: string;
  onContentChange?: (html: string) => void;
}

function ClubCreateDescriptionStep({
  onSubmit,
  isSubmitting,
  initialContent,
  onContentChange,
}: Props) {
  const [content, setContent] = useState(initialContent ?? '');
  const [isEmpty, setIsEmpty] = useState(!initialContent);

  return (
    <div className="flex flex-col gap-6 py-8">
      <h2 className="text-base font-bold">동아리 소개</h2>

      <ClubDescriptionEditor
        initialContent={initialContent}
        onChange={(html, empty) => {
          setContent(html);
          setIsEmpty(empty);
          onContentChange?.(html);
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
