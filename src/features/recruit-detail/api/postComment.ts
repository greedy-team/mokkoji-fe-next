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
        headers: {
          Authorization: 'Bearer ', // 나중에 여기에 로그인 토큰 추가
        },
      })
      .json();

    return response;
  } catch (error) {
    console.error('댓글 등록 실패:', error);
    throw error;
  }
}
