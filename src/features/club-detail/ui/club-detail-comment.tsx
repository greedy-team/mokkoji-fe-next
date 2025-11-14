'use client';

import { useState } from 'react';
import { CommentType } from '@/widgets/recruit-detail/model/type';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import ClubDetailCommentEdit from './club-detail-comment-edit';
import CommentItem from './comment-item';

interface ClubDetailCommentProps {
  clubId: number;
  comments: CommentType[];
}

export default function ClubDetailComment({
  clubId,
  comments,
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
            <Avatar className="size-12">
              <AvatarImage
                src={`/chat/profile-${Math.max(comment.id % 10, 1)}.png`}
                className="rounded-full"
              />
              <AvatarFallback />
            </Avatar>
            {isEditing ? (
              <ClubDetailCommentEdit
                clubId={clubId}
                commentId={comment.id}
                content={comment.content}
                rate={comment.rate}
                onCancel={() => setEdit(null)}
              />
            ) : (
              <CommentItem clubId={clubId} comment={comment} onEdit={setEdit} />
            )}
          </div>
        );
      })}
    </div>
  );
}
