'use client';

import Image from 'next/image';
import { startTransition, useState } from 'react';
import { toast } from 'react-toastify';
import { CommentType } from '@/widgets/recruit-detail/model/type';
import revalidateComments from '@/app/actions/revalidate-comments';
import StarRating from '../../../entities/recruit-detail/ui/review-star';
import timeAgo from '../../../entities/recruit-detail/util/timeAgo';
import RecruitDetailCommentEdit from './recruit-detail-comment-edit';
import { deleteComment } from '../api/postComment';

interface RecruitDetailCommentProps {
  clubId: number;
  comments: CommentType[];
  accessToken: string | undefined;
}

export default function RecruitDetailComment({
  clubId,
  comments,
  accessToken,
}: RecruitDetailCommentProps) {
  const [edit, setEdit] = useState<number | null>(null);

  const handleDeleteComment = async (
    e: React.MouseEvent<HTMLButtonElement>,
    commentId: number,
  ) => {
    e.preventDefault();

    if (!accessToken) {
      toast.warn('로그인을 먼저 해주세요.');
      return;
    }

    try {
      await deleteComment(commentId, accessToken);
      toast.success('댓글이 삭제되었습니다.');

      startTransition(async () => {
        await revalidateComments(clubId);
      });
    } catch (err) {
      console.error(err);
      toast.error('댓글 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-3.5">
      {comments.map((comment) => {
        const isEditing = comment.id === edit;

        return (
          <div
            key={comment.id}
            className="flex gap-4 rounded-2xl border border-[#D6D6D6] p-5"
          >
            <div className="h-10 w-10 rounded-full bg-[rgb(244,244,244)] p-2">
              <Image
                src="/detail/profileIcon.svg"
                alt="프로필 이미지"
                width={35}
                height={35}
              />
            </div>
            {isEditing ? (
              <RecruitDetailCommentEdit
                clubId={clubId}
                commentId={comment.id}
                accessToken={accessToken}
                content={comment.content}
                rate={comment.rate}
                onCancel={() => setEdit(null)}
              />
            ) : (
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#A4A4A4]">
                    {timeAgo(comment.time)}
                  </span>
                  <StarRating rate={comment.rate} />
                  {comment.isWriter && (
                    <div className="flex h-5 w-fit items-center justify-center rounded-sm border border-[#D6D6D6] p-1">
                      <button
                        className="cursor-pointer px-1"
                        onClick={() => {
                          setEdit(comment.id);
                        }}
                      >
                        <Image
                          src="/detail/comment/correction.svg"
                          alt="수정 이미지"
                          width={10}
                          height={10}
                        />
                      </button>
                      <span className="mx-1 h-full border-l" />
                      <button
                        className="cursor-pointer px-1 text-[12px]"
                        onClick={(e) => handleDeleteComment(e, comment.id)}
                      >
                        X
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium">{comment.content}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
