/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export */
import { http, HttpResponse } from 'msw';
import type {
  ClubRecruitmentsResponse,
  RecruitmentDetail,
} from '@/entities/club-detail/model/type';
import type {
  RecruitmentData,
  RecruitmentDeleteData,
  RecruitmentFormData,
} from '@/features/admin-recruitment/model/type';
import {
  favoriteClubIds,
  latestRecruitmentOf,
  mockClubs,
  mockRecruitments,
  toRecruitStatus,
  type MockRecruitment,
} from '../data';
import {
  apiUrl,
  errorResponse,
  isAuthorized,
  storageUrl,
  type MockResponse,
} from '../response';

const toRecruitmentDetail = (
  request: Request,
  recruitment: MockRecruitment,
): RecruitmentDetail => {
  const club = mockClubs.find(({ id }) => id === recruitment.clubId);
  return {
    ...recruitment,
    status: toRecruitStatus(recruitment),
    isFavorite:
      isAuthorized(request) && favoriteClubIds.has(recruitment.clubId),
    instagramUrl: club?.instagram ?? '',
    category: club?.category ?? 'OTHER',
    clubName: club?.name ?? '',
    logo: club?.logo ?? '',
  };
};

const uploadUrlsFor = (recruitmentId: number, imageNames: string[] = []) =>
  imageNames.map((imageName) =>
    storageUrl(`recruitments/${recruitmentId}/${imageName}`),
  );

const posterUrlsFor = (recruitmentId: number, imageNames: string[] = []) =>
  imageNames.map(
    (imageName) =>
      `https://placehold.co/600x800/png?text=${encodeURIComponent(`${recruitmentId}-${imageName}`)}`,
  );

const notFound = () => errorResponse(404, '모집 공고를 찾을 수 없습니다.');

export const recruitmentHandlers = [
  http.get<{ clubId: string }, never, MockResponse<ClubRecruitmentsResponse>>(
    apiUrl('/recruitments/club/:clubId'),
    ({ params }) => {
      const recruitments = mockRecruitments
        .filter((recruitment) => recruitment.clubId === Number(params.clubId))
        .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
        .map((recruitment) => ({
          id: recruitment.id,
          title: recruitment.title,
          content: recruitment.content,
          recruitStart: recruitment.recruitStart,
          recruitEnd: recruitment.recruitEnd,
          status: toRecruitStatus(recruitment),
          createdAt: recruitment.createdAt,
          firstImage: recruitment.imageUrls[0],
          isAlwaysRecruiting: recruitment.isAlwaysRecruiting,
        }));
      return HttpResponse.json({ data: { recruitments } });
    },
  ),

  http.get<{ clubId: string }, never, MockResponse<RecruitmentDetail>>(
    apiUrl('/recruitments/club/recent/:clubId'),
    ({ request, params }) => {
      const recruitment = latestRecruitmentOf(Number(params.clubId));
      if (!recruitment) return notFound();
      return HttpResponse.json({
        data: toRecruitmentDetail(request, recruitment),
      });
    },
  ),

  http.get<{ id: string }, never, MockResponse<RecruitmentDetail>>(
    apiUrl('/recruitments/:id'),
    ({ request, params }) => {
      const recruitment = mockRecruitments.find(
        ({ id }) => id === Number(params.id),
      );
      if (!recruitment) return notFound();
      return HttpResponse.json({
        data: toRecruitmentDetail(request, recruitment),
      });
    },
  ),

  http.post<
    { clubId: string },
    Partial<RecruitmentFormData>,
    RecruitmentData | MockResponse<never>
  >(apiUrl('/recruitments/:clubId'), async ({ request, params }) => {
    const clubId = Number(params.clubId);
    if (!mockClubs.some(({ id }) => id === clubId)) {
      return errorResponse(404, '동아리를 찾을 수 없습니다.');
    }

    const body = await request.json();
    const id =
      Math.max(...mockRecruitments.map((recruitment) => recruitment.id)) + 1;
    const now = new Date().toISOString().slice(0, 19);
    mockRecruitments.push({
      id,
      clubId,
      title: body.title ?? '',
      content: body.content ?? '',
      recruitStart: body.recruitStart ?? now,
      recruitEnd: body.recruitEnd ?? now,
      isAlwaysRecruiting: body.isAlwaysRecruiting ?? false,
      createdAt: now,
      imageUrls: posterUrlsFor(id, body.imageNames),
      recruitForm: body.recruitForm ?? '',
    });
    return HttpResponse.json(
      { data: { id, uploadImageUrls: uploadUrlsFor(id, body.imageNames) } },
      { status: 201 },
    );
  }),

  http.patch<
    { id: string },
    Partial<RecruitmentFormData>,
    RecruitmentData | MockResponse<never>
  >(apiUrl('/recruitments/:id'), async ({ request, params }) => {
    const recruitment = mockRecruitments.find(
      ({ id }) => id === Number(params.id),
    );
    if (!recruitment) return notFound();

    const { imageNames, ...fields } = await request.json();
    Object.assign(recruitment, fields);
    if (imageNames) {
      recruitment.imageUrls = posterUrlsFor(recruitment.id, imageNames);
    }
    return HttpResponse.json({
      data: {
        id: recruitment.id,
        uploadImageUrls: uploadUrlsFor(recruitment.id, imageNames),
      },
    });
  }),

  http.delete<{ id: string }, never, MockResponse<RecruitmentDeleteData>>(
    apiUrl('/recruitments/:id'),
    ({ params }) => {
      const index = mockRecruitments.findIndex(
        ({ id }) => id === Number(params.id),
      );
      if (index < 0) return notFound();

      const [removed] = mockRecruitments.splice(index, 1);
      return HttpResponse.json({
        data: { id: removed.id, deleteImageUrls: [] },
      });
    },
  ),
];
