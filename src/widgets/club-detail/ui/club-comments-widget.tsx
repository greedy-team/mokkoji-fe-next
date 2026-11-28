'use client';

import { useCallback, useEffect, useState } from 'react';
import { ClubComment } from '@/entities/club-detail/model/type';
import ClubDetailCommentInput from '@/features/club-detail/ui/club-detail-comment-input';
import ClubDetailComment from '@/features/club-detail/ui/club-detail-comment';
import fetchComments from '@/widgets/club-detail/api/fetchComments';

interface ClubCommentsWidgetProps {
  clubId: number;
}

function ClubCommentsWidget({ clubId }: ClubCommentsWidgetProps) {
  const [comments, setComments] = useState<ClubComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadComments = useCallback(async () => {
    const data = await fetchComments(clubId);
    setComments([...data].reverse());
    setIsLoading(false);
  }, [clubId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  if (isLoading) {
    return (
      <section className="flex w-full items-center justify-center py-20">
        <p className="text-sm text-gray-400">댓글을 불러오는 중...</p>
      </section>
    );
  }

  return (
    <section className="w-full">
      <ClubDetailCommentInput
        clubId={clubId}
        count={comments.length}
        onCommentChange={loadComments}
      />
      <ClubDetailComment
        comments={comments}
        clubId={clubId}
        onCommentChange={loadComments}
      />
    </section>
  );
}

export default ClubCommentsWidget;
