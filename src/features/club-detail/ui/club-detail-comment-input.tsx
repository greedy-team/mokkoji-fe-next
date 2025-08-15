'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/shared/ui/button';
import Textarea from '@/shared/ui/textarea';
import { revalidateComments, postComment } from '../api/postComment';
import StarRating from './rating-component';

interface ClubDetailCommentInputProps {
  clubId: number;
  count: number;
  accessToken?: string;
}

function ClubDetailCommentInput({
  clubId,
  count,
  accessToken,
}: ClubDetailCommentInputProps) {
  const [value, setValue] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accessToken) {
      toast.warn('로그인을 먼저 해주세요.', { toastId: 'unique-toast' });
      return;
    }

    if (!value || rating === 0) {
      toast.warn('내용과 별점을 모두 입력해주세요.', {
        toastId: 'unique-toast',
      });
      return;
    }

    try {
      await postComment(clubId, value, rating);
      toast.success('댓글이 등록되었습니다.', { toastId: 'unique-toast' });
      setValue('');
      setRating(0);
      revalidateComments(clubId);
    } catch (err) {
      let errorMessage = '댓글 등록 중 오류가 발생했습니다.';
      if (err instanceof Error) {
        if (err.message === '권한이 없습니다.') {
          errorMessage = '리뷰는 한 개만 작성 가능합니다!';
        } else {
          errorMessage = err.message;
        }
      }

      toast.error(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleAddComment}
      className="my-4 mb-15 flex flex-col gap-2"
    >
      <div className="mb-4 flex flex-col gap-1">
        <p className="font-semibold">이 동아리 어때요?</p>
        <StarRating value={rating} size="large" onChange={setRating} />
      </div>
      <p className="cursor-default text-base font-semibold">댓글 {count}</p>
      <Textarea
        value={value}
        onChange={handleChange}
        variant="comment"
        placeholder="허위사실, 욕설 등을 포함한 댓글은 별도의 안내 없이 삭제될 수 있어요."
      />
      <div className="flex justify-end">
        <Button
          variant="submit"
          type="submit"
          className="h-[43px] w-[113px]"
          disabled={!value || rating === 0}
        >
          댓글 남기기
        </Button>
      </div>
    </form>
  );
}

export default ClubDetailCommentInput;
