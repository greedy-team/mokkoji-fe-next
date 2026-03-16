'use server';

import api from '@/shared/api/auth-api';
import createErrorResponse from '@/shared/lib/error-message';

export async function postComment(
  clubId: number,
  content: string,
  rate: number,
) {
  try {
    await api
      .post(`comments/${clubId}`, {
        json: { content, rate },
      })
      .json();
    return { ok: true, message: '댓글이 등록되었습니다.', status: 200 };
  } catch (e) {
    return createErrorResponse(e as Error, [
      { status: 403, message: '댓글은 1개만 등록할 수 있습니다.' },
    ]);
  }
}

export async function patchComment(
  clubId: number,
  commentId: number,
  content: string,
  rate: number,
) {
  try {
    await api
      .patch(`comments/${commentId}`, {
        json: {
          content,
          rate,
        },
      })
      .json();
    return { ok: true, message: '댓글이 수정되었습니다.', status: 200 };
  } catch (e) {
    return createErrorResponse(e as Error);
  }
}

export async function deleteComment(clubId: number, commentId: number) {
  try {
    await api.delete(`comments/${commentId}`);
    return { ok: true, message: '댓글이 삭제되었습니다.', status: 200 };
  } catch (e) {
    return createErrorResponse(e as Error);
  }
}
