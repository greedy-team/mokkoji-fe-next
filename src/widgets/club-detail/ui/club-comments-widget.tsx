'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSession } from '@/shared/lib/session-context';
import { ClubComment } from '@/entities/club-detail/model/type';
import ClubDetailCommentInput from '@/features/club-detail/ui/club-detail-comment-input';
import ClubDetailComment from '@/features/club-detail/ui/club-detail-comment';
import fetchComments from '@/widgets/club-detail/api/fetchComments';

interface ClubCommentsWidgetProps {
  clubId: number;
}

function ClubCommentsWidget({ clubId }: ClubCommentsWidgetProps) {
  const { session, status } = useSession();
  const [comments, setComments] = useState<ClubComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadComments = useCallback(async () => {
    const data = await fetchComments(clubId, session?.accessToken);
    setComments([...data].reverse());
    setIsLoading(false);
  }, [clubId, session?.accessToken]);

  useEffect(() => {
    if (status === 'loading') return;
    loadComments();
  }, [status, loadComments]);

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
