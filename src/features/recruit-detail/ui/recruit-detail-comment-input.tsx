'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import Textarea from '@/shared/ui/textarea';
import StarRating from './rating-component';
import postComment from '../api/postComment';

interface RecruitDetailCommentInputProps {
  clubId: number;
}

function RecruitDetailCommentInput({ clubId }: RecruitDetailCommentInputProps) {
  const [value, setValue] = useState('');
  const [rating, setRating] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleAddComment = async () => {
    if (!value || rating === 0) {
      alert('내용과 별점을 모두 입력해주세요.');
      return;
    }

    try {
      await postComment(clubId, value, rating);
      alert('댓글이 등록되었습니다.');
      setValue('');
      setRating(0);
    } catch (err) {
      console.error(err);
      alert('댓글 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <form className="my-4 mb-15 flex flex-col items-end">
      <Textarea
        value={value}
        onChange={handleChange}
        variant="comment"
        placeholder="허위사실, 욕설 등을 포함한 댓글은 별도의 안내 없이 삭제될 수 있어요."
      />
      <div className="flex w-full items-center justify-between gap-4">
        <StarRating value={rating} onChange={setRating} />
        <Button
          variant="submit"
          onClick={handleAddComment}
          className="h-[43px] w-[113px]"
          disabled={!value || rating === 0}
        >
          댓글 남기기
        </Button>
      </div>
    </form>
  );
}

export default RecruitDetailCommentInput;
