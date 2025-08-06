'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CommentType } from '@/widgets/recruit-detail/model/type';
import ClubDetailCommentEdit from './club-detail-comment-edit';
import CommentItem from './comment-item';

interface ClubDetailCommentProps {
  clubId: number;
  comments: CommentType[];
  accessToken: string | undefined;
}

export default function ClubDetailComment({
  clubId,
  comments,
  accessToken,
}: ClubDetailCommentProps) {
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
              <ClubDetailCommentEdit
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
