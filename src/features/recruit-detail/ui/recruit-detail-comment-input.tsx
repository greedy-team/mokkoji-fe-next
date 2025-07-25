'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import Textarea from '@/shared/ui/textarea';

function RecruitDetailCommentInput() {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <form className="my-4 flex flex-col items-end">
      <Textarea
        value={value}
        onChange={handleChange}
        variant="comment"
        placeholder="허위사실, 욕설 등을 포함한 댓글은 별도의 안내 없이 삭제될 수 있어요."
      />
      <Button variant="submit" className="h-[43px] w-[113px]" disabled={!value}>
        댓글 남기기
      </Button>
    </form>
  );
}

export default RecruitDetailCommentInput;
