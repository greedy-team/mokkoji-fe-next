'use server';

import authApi from '@/shared/api/auth-api';
import { revalidatePath } from 'next/cache';

export async function postComment(
  clubId: number,
  content: string,
  rate: number,
) {
  try {
    const response = await (
      await authApi()
    )
      .post(`comments/${clubId}`, {
        json: {
          content,
          rate,
        },
      })
      .json();
    revalidatePath(`/recruit/${clubId}`);

    return response;
  } catch (error) {
    console.error('댓글 등록 실패:', error);
    throw error;
  }
}

export async function patchComment(
  clubId: number,
  commentId: number,
  content: string,
  rate: number,
) {
  try {
    const response = await (
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
    return response;
  } catch (error) {
    console.error('댓글 수정 실패:', error);
    throw error;
  }
}

export async function deleteComment(clubId: number, commentId: number) {
  try {
    const response = await (await authApi()).delete(`comments/${commentId}`);
    revalidatePath(`/recruit/${clubId}`);
    return response;
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
    throw error;
  }
}

export async function revalidateComments(clubId: number) {
  revalidatePath(`/recruit/${clubId}`);
}
