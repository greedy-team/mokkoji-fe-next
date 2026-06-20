'use client';

import { useState, useEffect } from 'react';
import { ClubComment } from '@/entities/club-detail/model/type';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import ClubDetailCommentEdit from './club-detail-comment-edit';
import CommentItem from './comment-item';

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
  const [highlightedCommentId, setHighlightedCommentId] = useState('');

  useEffect(() => {
    setHighlightedCommentId(window.location.hash.slice(1));
  }, []);

  return (
    <div className="flex flex-col gap-3.5">
      {comments.map((comment) => {
        const isEditing = comment.id === editingCommentId;

        return (
          <div
            key={comment.id}
            id={`comment-${comment.id}`}
            className={`flex gap-4 rounded-2xl border p-5 ${highlightedCommentId === `comment-${comment.id}` ? 'border-blue-500' : 'border-[#D6D6D6]'}`}
          >
            <Avatar className="size-12">
              <AvatarImage
                src={`/chat/profile-${Math.max(comment.id % 10, 1)}.png`}
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
