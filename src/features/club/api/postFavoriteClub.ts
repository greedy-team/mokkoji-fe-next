import serverApi from '@/shared/api/server-api';

export default async function postFavoriteClub(clubId: number) {
  const response = await serverApi
    .post(`favorites/${clubId}`, {
      headers: {
        Authorization: 'Bearer ', // 나중에 여기에 로그인 토큰 추가
      },
    })
    .json();

  return response;
}
