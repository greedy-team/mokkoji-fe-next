'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { Button } from '@/shared/ui/button';
import Textarea from '@/shared/ui/textarea';
import { postComment } from '../api/postComment';
import StarRating from './rating-component';

interface ClubDetailCommentInputProps {
  clubId: number;
  count: number;
}

function ClubDetailCommentInput({
  clubId,
  count,
}: ClubDetailCommentInputProps) {
  const [value, setValue] = useState('');
  const [rating, setRating] = useState(0);
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value || rating === 0) {
      toast.warn('내용과 별점을 모두 입력해주세요.');
      return;
    }
    setIsSubmitting(true);
    const response = await postComment(clubId, value, rating);
    if (!response.ok) {
      toast.error(response.message);
      return;
    }
    toast.success(response.message);
    setValue('');
    setRating(0);
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleAddComment}
      className="mb-15 flex w-full flex-col gap-2"
    >
      <div className="mb-4 flex flex-col gap-1">
        <p className="lg:font-semibold">이 동아리 어때요?</p>
        <StarRating
          value={rating}
          size="large"
          onChange={setRating}
          disabled={!session}
        />
      </div>
      <p className="cursor-default text-base lg:font-semibold">댓글 {count}</p>

      <Textarea
        value={value}
        onChange={handleChange}
        variant="comment"
        placeholder={
          session
            ? '허위사실, 욕설 등을 포함한 댓글은 별도의 안내 없이 삭제될 수 있어요.'
            : '로그인을 먼저 해주세요!'
        }
        disabled={!session}
      />
      {!session && (
        <p className="mb-5 text-xs font-medium text-[#00E457]">
          로그인 후 이용하실 수 있습니다.
        </p>
      )}
      <div className="flex justify-end">
        <Button
          variant="submit-default"
          type="submit"
          className="h-[43px] w-[113px]"
          disabled={!value || rating === 0 || isSubmitting}
        >
          댓글 남기기
        </Button>
      </div>
    </form>
  );
}

export default ClubDetailCommentInput;
