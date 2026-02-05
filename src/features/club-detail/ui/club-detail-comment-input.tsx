'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { Button } from '@/shared/ui/button';
import Textarea from '@/shared/ui/textarea';
import LoginModal from '@/widgets/login/ui/login-modal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setValue('');
    setRating(0);
    setIsSubmitting(false);
  };

  if (!session) {
    return (
      <div className="mb-15 flex w-full flex-col gap-2">
        <div className="flex flex-col items-center justify-center gap-4 rounded-[10px] bg-[#F4F4F4] py-8">
          <p className="text-sm font-bold">로그인이 필요한 서비스에요!</p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer font-semibold text-[#00E457] underline"
          >
            로그인하기
          </button>
          <LoginModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleAddComment}
      className="mb-15 flex w-full flex-col gap-2"
    >
      <div className="mb-4 flex flex-col gap-1">
        <p className="lg:font-semibold">이 동아리 어때요?</p>
        <StarRating value={rating} size="large" onChange={setRating} />
      </div>
      <p className="cursor-default text-base lg:font-semibold">댓글 {count}</p>
      <Textarea
        value={value}
        onChange={handleChange}
        variant="comment"
        placeholder="허위사실, 욕설 등을 포함한 댓글은 별도의 안내 없이 삭제될 수 있어요."
      />
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
