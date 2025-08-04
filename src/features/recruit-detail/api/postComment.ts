import serverApi from '@/shared/api/server-api';

export async function postComment(
  clubId: number,
  content: string,
  rate: number,
  accessToken: string,
) {
  try {
    const response = await serverApi
      .post(`comments/${clubId}`, {
        json: {
          content,
          rate,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
  accessToken: string,
) {
  try {
    const response = await serverApi
      .patch(`comments/${commentId}`, {
        json: {
          content,
          rate,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .json();

    return response;
  } catch (error) {
    console.error('댓글 수정 실패:', error);
    throw error;
  }
}

export async function deleteComment(commentId: number, accessToken: string) {
  try {
    const response = await serverApi
      .delete(`comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .json();

    return response;
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
    throw error;
  }
}
