'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/shared/ui/button';
import Textarea from '@/shared/ui/textarea';
import { useSession } from 'next-auth/react';
import StarRating from './rating-component';
import { patchComment } from '../api/postComment';

interface ClubDetailCommentEditProps {
  clubId: number;
  commentId: number;
  content: string;
  rate: number;
  onCancel: () => void;
}

function ClubDetailCommentEdit({
  clubId,
  commentId,
  content,
  rate,
  onCancel,
}: ClubDetailCommentEditProps) {
  const [value, setValue] = useState(content);
  const [rating, setRating] = useState(rate);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handlePatchComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value || rating === 0) {
      toast.warn('내용과 별점을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    const response = await patchComment(clubId, commentId, value, rating);
    if (!response.ok) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);
    setValue('');
    setRating(0);
    onCancel();
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handlePatchComment} className="flex w-full flex-col gap-2">
      <StarRating
        value={rating}
        size="small"
        onChange={setRating}
        disabled={!session}
      />
      <div className="flex w-full items-end gap-2">
        <Textarea
          value={value}
          onChange={handleChange}
          variant="comment"
          className="flex flex-1"
          placeholder="허위사실, 욕설 등을 포함한 댓글은 별도의 안내 없이 삭제될 수 있어요."
          disabled={!session}
        />
        <Button variant="disabled" onClick={onCancel} className="px-5 py-2">
          취소
        </Button>
        <Button
          variant="submit"
          type="submit"
          className="px-5 py-2"
          disabled={!value || rating === 0 || isSubmitting}
        >
          수정
        </Button>
      </div>
    </form>
  );
}

export default ClubDetailCommentEdit;
