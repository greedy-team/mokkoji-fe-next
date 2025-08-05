'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/shared/ui/button';
import Textarea from '@/shared/ui/textarea';
import revalidateComments from '@/app/actions/revalidate-comments';
import StarRating from './rating-component';
import { patchComment } from '../api/postComment';

interface RecruitDetailCommentEditProps {
  clubId: number;
  commentId: number;
  content: string;
  rate: number;
  accessToken?: string;
  onCancel: () => void;
}

function RecruitDetailCommentEdit({
  clubId,
  commentId,
  content,
  rate,
  accessToken,
  onCancel,
}: RecruitDetailCommentEditProps) {
  const [value, setValue] = useState(content);
  const [rating, setRating] = useState(rate);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handlePatchComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accessToken) {
      toast.warn('로그인을 먼저 해주세요.');
      return;
    }

    if (!value || rating === 0) {
      toast.warn('내용과 별점을 모두 입력해주세요.');
      return;
    }

    try {
      await patchComment(commentId, value, rating, accessToken);
      toast.success('댓글이 수정되었습니다.');
      setValue('');
      setRating(0);
      onCancel();
      revalidateComments(clubId);
    } catch (err) {
      console.error(err);
      toast.error('댓글 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handlePatchComment} className="flex w-full flex-col gap-2">
      <StarRating value={rating} size="small" onChange={setRating} />
      <div className="flex w-full items-end gap-2">
        <Textarea
          value={value}
          onChange={handleChange}
          variant="comment"
          className="flex flex-1"
          placeholder="허위사실, 욕설 등을 포함한 댓글은 별도의 안내 없이 삭제될 수 있어요."
        />
        <Button variant="disabled" onClick={onCancel} className="px-5 py-2">
          취소
        </Button>
        <Button
          variant="submit"
          type="submit"
          className="px-5 py-2"
          disabled={!value || rating === 0}
        >
          수정
        </Button>
      </div>
    </form>
  );
}

export default RecruitDetailCommentEdit;
