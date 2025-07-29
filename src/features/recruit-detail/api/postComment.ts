import serverApi from '@/shared/api/server-api';

export default async function postComment(
  clubId: number,
  content: string,
  rate: number,
) {
  try {
    const response = await serverApi
      .post(`/comments/${clubId}`, {
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
