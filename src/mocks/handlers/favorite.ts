/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export */
import dayjs from 'dayjs';
import { http, HttpResponse } from 'msw';
import type { FavoriteList } from '@/shared/model/type';
import type { FavoriteDateItem } from '@/entities/favorite/model/type';
import { favoriteClubIds, mockClubs, mockRecruitments } from '../data';
import {
  apiUrl,
  errorResponse,
  isAuthorized,
  pageParams,
  paginate,
  type MockResponse,
} from '../response';
import { toClubType } from './club';

const unauthorized = () => errorResponse(401, '로그인이 필요합니다.');

export const favoriteHandlers = [
  http.get<never, never, MockResponse<FavoriteList>>(
    apiUrl('/favorites'),
    ({ request }) => {
      if (!isAuthorized(request)) return unauthorized();

      const { page, size } = pageParams(request);
      const favorites = mockClubs
        .filter((club) => favoriteClubIds.has(club.id))
        .map((club) => toClubType(request, club));
      const { items, pagination } = paginate(favorites, page, size);
      return HttpResponse.json({ data: { clubs: items, pagination } });
    },
  ),

  http.get<never, never, MockResponse<FavoriteDateItem[]>>(
    apiUrl('/favorites/recruit'),
    ({ request }) => {
      if (!isAuthorized(request)) return unauthorized();

      const yearMonth = new URL(request.url).searchParams.get('yearMonth');
      const monthStart = dayjs(yearMonth ?? undefined).startOf('month');
      const monthEnd = monthStart.endOf('month');

      const items = mockRecruitments
        .filter(
          (recruitment) =>
            favoriteClubIds.has(recruitment.clubId) &&
            !dayjs(recruitment.recruitEnd).isBefore(monthStart) &&
            !dayjs(recruitment.recruitStart).isAfter(monthEnd),
        )
        .map((recruitment) => ({
          clubId: recruitment.clubId,
          clubName:
            mockClubs.find(({ id }) => id === recruitment.clubId)?.name ?? '',
          recruitStart: recruitment.recruitStart,
          recruitEnd: recruitment.recruitEnd,
        }));
      return HttpResponse.json({ data: items });
    },
  ),

  http.post<{ clubId: string }>(
    apiUrl('/favorites/:clubId'),
    ({ request, params }) => {
      if (!isAuthorized(request)) return unauthorized();
      favoriteClubIds.add(Number(params.clubId));
      return new HttpResponse(null, { status: 201 });
    },
  ),

  http.delete<{ clubId: string }>(
    apiUrl('/favorites/:clubId'),
    ({ request, params }) => {
      if (!isAuthorized(request)) return unauthorized();
      favoriteClubIds.delete(Number(params.clubId));
      return new HttpResponse(null, { status: 204 });
    },
  ),
];
