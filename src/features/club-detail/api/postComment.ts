'use server';

import authApi from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';
import { revalidatePath } from 'next/cache';

export async function postComment(
  clubId: number,
  content: string,
  rate: number,
) {
  const api = await authApi();

  try {
    await api
      .post(`comments/${clubId}`, {
        json: { content, rate },
      })
      .json();
    revalidatePath(`/recruit/${clubId}`);
    return { ok: true, message: '댓글이 등록되었습니다.' };
  } catch (e) {
    return ErrorHandler(e as Error, [
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
    await (
      await authApi()
    )
      .patch(`comments/${commentId}`, {
        json: {
          content,
          rate,
        },
      })
      .json();
    revalidatePath(`/recruit/${clubId}`);
    return { ok: true, message: '댓글이 수정되었습니다.' };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export async function deleteComment(clubId: number, commentId: number) {
  try {
    await (await authApi()).delete(`comments/${commentId}`);
    revalidatePath(`/recruit/${clubId}`);
    return { ok: true, message: '댓글이 삭제되었습니다.' };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}
