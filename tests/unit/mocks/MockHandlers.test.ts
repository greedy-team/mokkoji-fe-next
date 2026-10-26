import assert from 'node:assert/strict';
import { after, before, describe, test } from 'node:test';
import type { setupServer } from 'msw/node';

const API_URL = 'https://api.mock.test/api';
process.env.NEXT_PUBLIC_API_URL = API_URL;

let server: ReturnType<typeof setupServer>;
let data: typeof import('@/mocks/data');
let accessToken: string;

const request = (path: string, init?: RequestInit) =>
  fetch(`${API_URL}/${path}`, init);

const authorized = (init?: RequestInit): RequestInit => ({
  ...init,
  headers: { Authorization: `Bearer ${accessToken}`, ...init?.headers },
});

const jsonBody = (body: unknown): RequestInit => ({
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

before(async () => {
  // 핸들러가 import 시점에 NEXT_PUBLIC_API_URL을 읽으므로 환경변수 설정 뒤에 불러온다
  const msw = await import('msw/node');
  const { handlers } = await import('@/mocks/handlers');
  data = await import('@/mocks/data');

  server = msw.setupServer(...handlers);
  server.listen({ onUnhandledRequest: 'error' });

  const loginBody = await request('users/auth/kakao', {
    method: 'POST',
    ...jsonBody({ code: 'mock', universityCode: 'SEJONG' }),
  })
    .then((response) => response.json())
    .catch(() => null);
  accessToken = loginBody?.data?.accessToken ?? '';
});

after(() => server.close());

describe('every endpoint the app calls has a mock handler', () => {
  const endpoints: [method: string, path: string][] = [
    ['GET', 'universities'],
    ['GET', 'clubs?universityCode=SEJONG&page=1&size=10'],
    ['GET', 'clubs/search?keyword=&universityCode=SEJONG&page=1&size=10'],
    ['GET', 'clubs/1'],
    ['GET', 'comments/1'],
    ['GET', 'recruitments/1'],
    ['GET', 'recruitments/club/1'],
    ['GET', 'recruitments/club/recent/1'],
    ['GET', 'users'],
    ['GET', 'users/roles'],
    ['GET', 'users/manage/clubs'],
    ['GET', 'favorites?page=1&size=10'],
    ['GET', 'favorites/recruit?yearMonth=2026-10'],
    ['GET', 'club-applications/me'],
    ['GET', 'club-master-applications/me'],
    ['GET', 'admin/me'],
    ['GET', 'admin/clubs?page=1&size=10'],
    ['GET', 'admin/club-applications?status=PENDING&page=1&size=10'],
    ['GET', 'admin/club-master-applications?page=1&size=10'],
    ['POST', 'users/auth/refresh'],
    ['POST', 'admin/auth/login'],
    ['POST', 'feedbacks'],
    ['POST', 'comments/1'],
    ['PATCH', 'comments/1'],
    ['DELETE', 'comments/1'],
    ['PATCH', 'users'],
    ['POST', 'clubs'],
    ['PATCH', 'clubs/manage/1'],
    ['POST', 'recruitments/1'],
    ['PATCH', 'recruitments/1'],
    ['POST', 'club-applications'],
    ['POST', 'club-master-applications'],
    ['POST', 'club-master-transfers'],
    ['PATCH', 'club-master-transfers/1/approve'],
    ['PATCH', 'admin/club-applications/12/approve'],
    ['PATCH', 'admin/club-applications/12/reject'],
    ['PATCH', 'admin/club-master-applications/12/approve'],
    ['PATCH', 'admin/club-master-applications/12/reject'],
    ['DELETE', 'admin/clubs/1'],
  ];

  endpoints.forEach(([method, path]) => {
    test(`${method} ${path}`, async () => {
      const response = await request(
        path,
        authorized({ method, ...(method === 'GET' ? {} : jsonBody({})) }),
      );
      assert.ok(response.ok, `status ${response.status}`);
    });
  });
});

describe('clubs', () => {
  test('filters by university, category, affiliation and keyword', async () => {
    const query =
      'universityCode=SEJONG&category=SPORTS&affiliation=CENTRAL_CLUB&keyword=축&page=1&size=50';
    const body = await (await request(`clubs?${query}`)).json();

    const expected = data.mockClubs
      .filter(
        (club) =>
          club.universityCode === 'SEJONG' &&
          club.category === 'SPORTS' &&
          club.affiliation === 'CENTRAL_CLUB' &&
          club.name.includes('축'),
      )
      .map((club) => club.id);

    assert.ok(expected.length > 0, 'fixture should contain a matching club');
    assert.deepEqual(
      body.data.clubs.map((club: { id: number }) => club.id),
      expected,
    );
  });

  test('paginates with the requested page size', async () => {
    const total = data.mockClubs.filter(
      (club) => club.universityCode === 'SEJONG',
    ).length;
    const body = await (
      await request('clubs?universityCode=SEJONG&page=2&size=5')
    ).json();

    assert.equal(body.data.clubs.length, Math.min(5, total - 5));
    assert.deepEqual(body.data.page, {
      page: 2,
      size: 5,
      totalPages: Math.ceil(total / 5),
      totalElements: total,
    });
  });

  test('search filters by recruit status', async () => {
    const body = await (
      await request(
        'clubs/search?keyword=&universityCode=SEJONG&recruitStatus=OPEN&page=1&size=50',
      )
    ).json();

    assert.ok(body.data.clubs.length > 0);
    body.data.clubs.forEach((club: { recruitStatus: string }) =>
      assert.equal(club.recruitStatus, 'OPEN'),
    );
  });

  test('returns 404 for an unknown club or recruitment', async () => {
    assert.equal((await request('clubs/99999')).status, 404);
    assert.equal((await request('recruitments/99999')).status, 404);
  });
});

describe('favorites', () => {
  test('rejects requests without a token', async () => {
    assert.equal((await request('favorites?page=1&size=10')).status, 401);
  });

  test('reflects add and remove in the list and in club detail', async () => {
    const clubId = data.mockClubs[0].id;
    const listIds = async () => {
      const body = await (
        await request('favorites?page=1&size=100', authorized())
      ).json();
      return body.data.clubs.map((club: { id: number }) => club.id);
    };

    await request(`favorites/${clubId}`, authorized({ method: 'POST' }));
    assert.ok((await listIds()).includes(clubId));
    const detail = await (
      await request(`clubs/${clubId}`, authorized())
    ).json();
    assert.equal(detail.data.isFavorite, true);

    await request(`favorites/${clubId}`, authorized({ method: 'DELETE' }));
    assert.ok(!(await listIds()).includes(clubId));
  });
});

describe('mutations return the upload targets the UI uses', () => {
  test('recruitment create returns one upload URL per image that accepts PUT', async () => {
    const response = await request(
      'recruitments/1',
      authorized({
        method: 'POST',
        ...jsonBody({ title: '새 공고', imageNames: ['a.png', 'b.png'] }),
      }),
    );
    const body = await response.json();

    assert.equal(body.data.uploadImageUrls.length, 2);
    const upload = await fetch(body.data.uploadImageUrls[0], {
      method: 'PUT',
      body: 'image',
    });
    assert.ok(upload.ok);

    const created = await (
      await request(`recruitments/${body.data.id}`)
    ).json();
    assert.equal(created.data.title, '새 공고');
  });

  test('club edit returns logo URLs', async () => {
    const response = await request(
      'clubs/manage/1',
      authorized({ method: 'PATCH', ...jsonBody({ name: '수정된 이름' }) }),
    );
    const body = await response.json();

    assert.equal(typeof body.data.updateLogo, 'string');
    assert.equal(typeof body.data.deleteLogo, 'string');
  });

  test('club application returns a logo upload URL', async () => {
    const body = await (
      await request(
        'club-applications',
        authorized({ method: 'POST', ...jsonBody({ clubName: '신규' }) }),
      )
    ).json();

    assert.equal(typeof body.data.uploadLogoUrl, 'string');
  });
});

describe('mock login', () => {
  test('issues an access token whose expiry is far in the future', async () => {
    const { default: getTokenExpiration } = await import(
      '@/shared/lib/getTokenExpiration'
    );
    const expiresAt = getTokenExpiration(accessToken);

    assert.ok(expiresAt);
    assert.ok(expiresAt > Date.now() + 1000 * 60 * 60 * 24);
  });

  test('keeps the expiry within the setTimeout limit so the session reload timer does not fire immediately', async () => {
    const { default: getTokenExpiration } = await import(
      '@/shared/lib/getTokenExpiration'
    );
    const MAX_TIMEOUT_DELAY = 2 ** 31 - 1;
    const expiresAt = getTokenExpiration(accessToken) ?? 0;

    assert.ok(expiresAt - Date.now() <= MAX_TIMEOUT_DELAY);
  });

  test('returns the role configured for the mock user', async () => {
    const body = await (await request('users/roles', authorized())).json();
    assert.equal(body.data.role, data.mockUserRole);
  });
});

describe('mocking switch', () => {
  test('never enables mocking in production', async () => {
    const { shouldEnableMocking } = await import('@/mocks/config');

    assert.equal(shouldEnableMocking('development', 'enabled'), true);
    assert.equal(shouldEnableMocking('development', 'disabled'), false);
    assert.equal(shouldEnableMocking('production', 'enabled'), false);
  });
});
