import authApi from '@/shared/api/auth-api';

export async function postComment(
  clubId: number,
  content: string,
  rate: number,
) {
  try {
    const response = await authApi
      .post(`comments/${clubId}`, {
        json: {
          content,
          rate,
        },
      })
      .json();

    return response;
  } catch (error) {
    console.error('댓글 등록 실패:', error);
    throw error;
  }
}

export async function patchComment(
  commentId: number,
  content: string,
  rate: number,
) {
  try {
    const response = await authApi
      .patch(`comments/${commentId}`, {
        json: {
          content,
          rate,
        },
      })
      .json();

    return response;
  } catch (error) {
    console.error('댓글 수정 실패:', error);
    throw error;
  }
}

export async function deleteComment(commentId: number) {
  try {
    const response = await authApi.delete(`comments/${commentId}`).json();

    return response;
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
    throw error;
  }
}
