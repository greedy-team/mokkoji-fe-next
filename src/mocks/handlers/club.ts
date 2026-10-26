/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export */
import { http, HttpResponse } from 'msw';
import type {
  ClubAffiliation,
  ClubCategory,
  ClubSearchResponse,
  ClubType,
} from '@/shared/model/type';
import type { Club, ClubsResponse } from '@/entities/club/model/type';
import type { ClubDetail } from '@/entities/club-detail/model/type';
import type { ClubEditLogoUrls } from '@/features/admin-club-description/model/type';
import {
  favoriteClubIds,
  latestRecruitmentOf,
  mockClubs,
  mockUser,
  toRecruitStatus,
  type MockAffiliation,
  type MockCategory,
  type MockClub,
} from '../data';
import {
  apiUrl,
  errorResponse,
  isAuthorized,
  pageParams,
  paginate,
  storageUrl,
  type MockResponse,
} from '../response';

const isFavoriteFor = (request: Request, clubId: number) =>
  isAuthorized(request) && favoriteClubIds.has(clubId);

const recruitPeriodOf = (clubId: number) => {
  const recruitment = latestRecruitmentOf(clubId);
  return {
    recruitment,
    recruitStart: recruitment?.recruitStart ?? '',
    recruitEnd: recruitment?.recruitEnd ?? '',
    isAlwaysRecruiting: recruitment?.isAlwaysRecruiting ?? false,
    recruitStatus: recruitment ? toRecruitStatus(recruitment) : 'CLOSED',
  } as const;
};

export const toClubType = (request: Request, club: MockClub): ClubType => {
  const period = recruitPeriodOf(club.id);
  return {
    id: club.id,
    name: club.name,
    category: club.category as ClubCategory,
    affiliation: club.affiliation as ClubAffiliation,
    description: club.description,
    recruitStartDate: period.recruitStart,
    recruitEndDate: period.recruitEnd,
    logo: club.logo,
    isFavorite: isFavoriteFor(request, club.id),
    isAlwaysRecruiting: period.isAlwaysRecruiting,
    recruitStatus: period.recruitStatus,
  };
};

const toClub = (request: Request, club: MockClub): Club => {
  const period = recruitPeriodOf(club.id);
  return {
    id: club.id,
    name: club.name,
    description: club.description,
    logo: club.logo,
    isFavorite: isFavoriteFor(request, club.id),
    recruitmentPreviewResponse: period.recruitment
      ? {
          id: period.recruitment.id,
          recruitStart: period.recruitStart,
          recruitEnd: period.recruitEnd,
          recruitStatus: period.recruitStatus,
          isAlwaysRecruiting: period.isAlwaysRecruiting,
        }
      : null,
  };
};

const filterClubs = (params: URLSearchParams) => {
  const universityCode = params.get('universityCode');
  const category = params.get('category');
  const affiliation = params.get('affiliation');
  const keyword = params.get('keyword')?.trim();

  return mockClubs.filter(
    (club) =>
      (!universityCode || club.universityCode === universityCode) &&
      (!category || club.category === category) &&
      (!affiliation || club.affiliation === affiliation) &&
      (!keyword || club.name.includes(keyword)),
  );
};

interface ClubRegisterBody {
  name: string;
  category: MockCategory;
  affiliation: MockAffiliation;
}

interface ClubUpdateBody {
  name?: string;
  category?: MockCategory;
  affiliation?: MockAffiliation;
  description?: string;
  instagram?: string;
}

export const clubHandlers = [
  http.get<never, never, MockResponse<ClubsResponse>>(
    apiUrl('/clubs'),
    ({ request }) => {
      const { params, page, size } = pageParams(request);
      const { items, pagination } = paginate(filterClubs(params), page, size);
      return HttpResponse.json({
        data: {
          clubs: items.map((club) => toClub(request, club)),
          page: pagination,
        },
      });
    },
  ),

  http.get<never, never, MockResponse<ClubSearchResponse>>(
    apiUrl('/clubs/search'),
    ({ request }) => {
      const { params, page, size } = pageParams(request);
      const recruitStatus = params.get('recruitStatus');
      const clubs = filterClubs(params)
        .map((club) => toClubType(request, club))
        .filter(
          (club) => !recruitStatus || club.recruitStatus === recruitStatus,
        );
      const { items, pagination } = paginate(clubs, page, size);
      return HttpResponse.json({ data: { clubs: items, pagination } });
    },
  ),

  http.get<{ id: string }, never, MockResponse<ClubDetail>>(
    apiUrl('/clubs/:id'),
    ({ request, params }) => {
      const club = mockClubs.find(({ id }) => id === Number(params.id));
      if (!club) return errorResponse(404, '동아리를 찾을 수 없습니다.');

      const period = recruitPeriodOf(club.id);
      return HttpResponse.json({
        data: {
          id: club.id,
          name: club.name,
          category: club.category,
          affiliation: club.affiliation,
          description: club.description,
          recruitStartDate: period.recruitStart,
          recruitEndDate: period.recruitEnd,
          logo: club.logo,
          isFavorite: isFavoriteFor(request, club.id),
          instagram: club.instagram,
          recruitPost: period.recruitment?.content ?? '',
          status: period.recruitStatus,
        },
      });
    },
  ),

  http.post<never, ClubRegisterBody>(apiUrl('/clubs'), async ({ request }) => {
    const body = await request.json();
    const id = Math.max(...mockClubs.map((club) => club.id)) + 1;
    mockClubs.push({
      id,
      universityCode: mockUser.universityCode ?? 'SEJONG',
      name: body.name ?? `새 동아리 ${id}`,
      category: body.category ?? 'OTHER',
      affiliation: body.affiliation ?? 'CENTRAL_CLUB',
      description: '',
      logo: mockClubs[0].logo,
      instagram: '',
    });
    return new HttpResponse(null, { status: 201 });
  }),

  http.patch<
    { clubId: string },
    ClubUpdateBody,
    ClubEditLogoUrls | MockResponse<never>
  >(apiUrl('/clubs/manage/:clubId'), async ({ request, params }) => {
    const club = mockClubs.find(({ id }) => id === Number(params.clubId));
    if (!club) return errorResponse(404, '동아리를 찾을 수 없습니다.');

    const { name, category, affiliation, description, instagram } =
      await request.json();
    // 요청의 logo는 업로드할 파일 이름이라 저장하면 이미지가 깨지므로 기존 logo를 유지한다
    Object.assign(club, {
      name: name ?? club.name,
      category: category ?? club.category,
      affiliation: affiliation ?? club.affiliation,
      description: description ?? club.description,
      instagram: instagram ?? club.instagram,
    });
    return HttpResponse.json({
      data: {
        id: club.id,
        updateLogo: storageUrl(`clubs/${club.id}/logo`),
        deleteLogo: storageUrl(`clubs/${club.id}/logo`),
      },
    });
  }),
];
