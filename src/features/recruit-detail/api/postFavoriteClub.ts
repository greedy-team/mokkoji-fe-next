import serverApi from '@/shared/api/server-api';

export default async function postFavoriteClub(clubId: number) {
  const response = await serverApi.post(`favorites/${clubId}`).json();

  return response;
}
