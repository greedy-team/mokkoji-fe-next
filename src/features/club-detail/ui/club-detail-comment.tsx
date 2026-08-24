'use client';

import { useState } from 'react';
import { ClubComment } from '@/entities/club-detail/model/type';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import type { StaticImageData } from 'next/image';
import chatProfile1Image from '@/shared/assets/images/chat/profile-1.webp';
import chatProfile2Image from '@/shared/assets/images/chat/profile-2.webp';
import chatProfile3Image from '@/shared/assets/images/chat/profile-3.webp';
import chatProfile4Image from '@/shared/assets/images/chat/profile-4.webp';
import chatProfile5Image from '@/shared/assets/images/chat/profile-5.webp';
import chatProfile6Image from '@/shared/assets/images/chat/profile-6.webp';
import chatProfile7Image from '@/shared/assets/images/chat/profile-7.webp';
import chatProfile8Image from '@/shared/assets/images/chat/profile-8.webp';
import chatProfile9Image from '@/shared/assets/images/chat/profile-9.webp';
import ClubDetailCommentEdit from './club-detail-comment-edit';
import CommentItem from './comment-item';

const chatProfileImagesByNumber: Record<number, StaticImageData> = {
  1: chatProfile1Image,
  2: chatProfile2Image,
  3: chatProfile3Image,
  4: chatProfile4Image,
  5: chatProfile5Image,
  6: chatProfile6Image,
  7: chatProfile7Image,
  8: chatProfile8Image,
  9: chatProfile9Image,
};

interface ClubDetailCommentProps {
  clubId: number;
  comments: ClubComment[];
  onCommentChange: () => Promise<void>;
}

export default function ClubDetailComment({
  clubId,
  comments,
  onCommentChange,
}: ClubDetailCommentProps) {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3.5">
      {comments.map((comment) => {
        const isEditing = comment.id === editingCommentId;

        return (
          <div
            key={comment.id}
            className="flex gap-4 rounded-2xl border border-[#D6D6D6] p-5"
          >
            <Avatar className="size-12">
              <AvatarImage
                src={
                  chatProfileImagesByNumber[Math.max(comment.id % 10, 1)].src
                }
                className="rounded-full"
                alt="채팅 프로필"
              />
              <AvatarFallback />
            </Avatar>
            {isEditing ? (
              <ClubDetailCommentEdit
                clubId={clubId}
                commentId={comment.id}
                content={comment.content}
                rate={comment.rate}
                onCancel={() => setEditingCommentId(null)}
                onCommentChange={onCommentChange}
              />
            ) : (
              <CommentItem
                clubId={clubId}
                comment={comment}
                onEdit={setEditingCommentId}
                onCommentChange={onCommentChange}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
