'use client';

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { CommentType } from '@/widgets/recruit-detail/model/type';
import revalidateComments from '@/app/actions/revalidate-comments';
import StarRating from '../../../entities/recruit-detail/ui/review-star';
import timeAgo from '../../../entities/recruit-detail/util/timeAgo';
import RecruitDetailCommentEdit from './recruit-detail-comment-edit';
import { deleteComment } from '../api/postComment';
import CommentItem from './comment-item';

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
                content={comment.content}
                rate={comment.rate}
                accessToken={accessToken}
                onCancel={() => setEdit(null)}
              />
            ) : (
              <CommentItem
                clubId={clubId}
                comment={comment}
                onEdit={setEdit}
                accessToken={accessToken}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
