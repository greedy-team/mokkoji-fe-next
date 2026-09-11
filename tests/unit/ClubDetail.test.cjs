const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');

// API와 하위 UI를 테스트 대역으로 교체하고 실제 서버 컴포넌트 함수를 실행한다.
// Next 서버 없이 404·기본 탭·광고 표시 분기를 검증하며, 브라우저 렌더링은 검증하지 않는다.
function load(file, dependencies) {
  const source = readFileSync(path.resolve(file), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  });
  const exports = {};
  vm.runInNewContext(outputText, {
    exports,
    URLSearchParams,
    console,
    require(name) {
      if (name in dependencies) return dependencies[name];
      if (name === '@/shared/lib/stripHtmlTags')
        return load('src/shared/lib/stripHtmlTags.ts', {});
      if (name === 'react' || name === 'react/jsx-runtime')
        return require(name);
      throw new Error(`테스트 의존성이 설정되지 않았습니다: ${name}`);
    },
  });
  return exports.default;
}

function elements(node) {
  if (!React.isValidElement(node)) return [];
  return [
    node,
    ...React.Children.toArray(node.props.children).flatMap(elements),
  ];
}

const club = {
  id: 1,
  name: 'Club',
  category: 'OTHER',
  description: 'Club introduction',
  logo: '/logo.png',
  instagram: '',
  isFavorite: false,
};
const recruitment = {
  id: 2,
  clubId: 1,
  clubName: 'Old name',
  category: 'OTHER',
  content: 'Recruitment body',
  title: 'Recruitment',
  imageUrls: [],
  recruitForm: '',
  status: 'CLOSED',
  isAlwaysRecruiting: false,
};
const success = (data) => ({ ok: true, status: 200, data });
const missing = { ok: false, status: 404 };

async function page({
  clubResult = success(club),
  recent = success(recruitment),
  selected = success(recruitment),
  query = {},
} = {}) {
  const Page = load('src/views/club/ui/club-detail-page.tsx', {
    'next/navigation': {
      notFound() {
        throw new Error('NOT_FOUND');
      },
    },
    '@/entities/club-detail/ui/recruit-detail-header': 'header',
    '@/entities/club-detail/ui/recruit-history-section': 'history',
    '@/shared/ui/error-boundary-ui': 'error',
    '@/widgets/club-detail/ui/club-detail-tabs': 'tabs',
    '@/views/club/api/getRecentRecruitDetail': async () => recent,
    '@/entities/club-detail/api/getClubDetail': async () => clubResult,
    '@/shared/ui/scroll-progress-bar': 'progress',
    '@/shared/ui/GoogleAdSense': 'ad',
    '../api/getClubRecruitments': async () => success({ recruitments: [] }),
    '../api/getRecruitDetail': async (recruitmentId, clubId) => {
      // 과거 공고를 선택했는데 최근 공고 ID로 조회하는 오류도 검증한다.
      assert.equal(recruitmentId, selected.data?.id ?? 2);
      assert.equal(clubId, 1);
      return selected;
    },
  });
  return elements(
    await Page({
      params: Promise.resolve({ id: '1', universityCode: 'sejong' }),
      searchParams: Promise.resolve(query),
    }),
  );
}

test('모집공고가 없는 동아리는 404 대신 소개 탭을 표시한다', async () => {
  const result = await page({ recent: missing });
  assert.equal(
    result.find((item) => item.type === 'tabs').props.activeTab,
    'about',
  );
  assert.equal(
    result.find((item) => item.type === 'header').props.title,
    'Club',
  );
});

test('모집공고가 있으면 마감 여부와 관계없이 모집 탭이 기본이다', async () => {
  const result = await page();
  assert.equal(
    result.find((item) => item.type === 'tabs').props.activeTab,
    'recruit',
  );
});

test('모집공고가 없어도 지정한 탭을 유지하고 빈 모집 탭과 댓글에는 광고를 표시하지 않는다', async () => {
  for (const tab of ['about', 'recruit', 'comments']) {
    const result = await page({ recent: missing, query: { tab } });
    assert.equal(
      result.find((item) => item.type === 'tabs').props.activeTab,
      tab,
    );
    if (tab !== 'about')
      assert.equal(
        result.some((item) => item.type === 'ad'),
        false,
      );
  }
});

test('동아리 자체가 없을 때만 404를 반환하고 API 실패는 오류 화면으로 처리한다', async () => {
  await assert.rejects(page({ clubResult: missing }), /NOT_FOUND/);
  for (const options of [
    { clubResult: { ok: false, status: 500 } },
    { recent: { ok: false, status: 500 } },
    { selected: { ok: false, status: 500 } },
  ]) {
    const result = await page(options);
    assert.equal(
      result.some((item) => item.type === 'error'),
      true,
    );
    assert.equal(
      result.some((item) => item.type === 'ad'),
      false,
    );
  }
});

test('소개 내용이 비어 있으면 광고를 표시하지 않는다', async () => {
  const result = await page({
    recent: missing,
    clubResult: success({ ...club, description: '' }),
  });
  assert.equal(
    result.some((item) => item.type === 'ad'),
    false,
  );
});

test('모집공고 조회가 성공했지만 데이터가 없으면 소개 탭을 표시한다', async () => {
  const result = await page({ recent: success(undefined) });
  assert.equal(
    result.find((item) => item.type === 'tabs').props.activeTab,
    'about',
  );
});

test('잘못된 탭은 기본 탭으로 대체하고 과거 공고를 지정하면 해당 모집공고를 표시한다', async () => {
  const empty = await page({ recent: missing, query: { tab: 'unknown' } });
  assert.equal(
    empty.find((item) => item.type === 'tabs').props.activeTab,
    'about',
  );
  // 최근 공고와 다른 ID를 사용해 과거 공고 선택이 무시되는 회귀를 잡는다.
  const past = await page({
    query: { recruit: '10' },
    selected: success({
      ...recruitment,
      id: 10,
      content: '지난 학기 모집 안내',
    }),
  });
  assert.equal(
    past.find((item) => item.type === 'tabs').props.activeTab,
    'recruit',
  );
  assert.equal(
    past.find((item) => item.type === 'tabs').props.selectedRecruitmentId,
    10,
  );
  assert.equal(
    past.find((item) => item.type === 'tabs').props.recruitData.content,
    '지난 학기 모집 안내',
  );
});

test('선택한 탭에 본문 텍스트가 있어야 광고를 표시하며 제목이나 빈 HTML만으로는 표시하지 않는다', async () => {
  for (const options of [
    { query: { tab: 'comments' } },
    {
      query: { tab: 'about' },
      clubResult: success({ ...club, description: '<p>&nbsp;</p>' }),
    },
    { selected: success({ ...recruitment, content: '<p><br></p>' }) },
  ]) {
    assert.equal(
      (await page(options)).some((item) => item.type === 'ad'),
      false,
    );
  }
  assert.equal(
    (await page()).some((item) => item.type === 'ad'),
    true,
  );
});

test('최근 모집공고 조회는 정상 빈 응답과 실패 응답의 상태를 구분해서 반환한다', async () => {
  for (const response of [
    success(undefined),
    { ok: false, status: 500, data: undefined },
  ]) {
    const api = { get: () => ({ json: async () => response }) };
    const getRecent = load('src/views/club/api/getRecentRecruitDetail.ts', {
      '@/shared/lib/error-message': () => ({ ok: false, status: 500 }),
      '@/shared/api/auth-api': api,
      '@/shared/api/server-api': api,
      '@/shared/lib/cookie-session': { getSession: async () => null },
    });
    const result = await getRecent(1);
    assert.equal(result.ok, response.ok);
    assert.equal(result.status, response.status);
  }
});

test('모집 탭 링크에 tab=recruit를 명시하고 존재하지 않는 공고 ID를 넣지 않는다', () => {
  const Tabs = load('src/widgets/club-detail/ui/club-detail-tabs.tsx', {
    'next/link': 'a',
    '@/widgets/club-detail/ui/club-recruit-widget': 'recruitment',
    '@/widgets/club-detail/ui/club-description-widget': 'description',
    '@/widgets/club-detail/ui/club-comments-widget': 'comments',
  });
  const result = elements(
    Tabs({ activeTab: 'about', clubId: 1, universityCode: 'sejong' }),
  );
  const links = result.filter((item) => item.type === 'a');
  assert.equal(links[0].props.href, '/sejong/club/1?tab=recruit');
  assert.equal(
    links.some((item) => item.props.href.includes('undefined')),
    false,
  );
});

test('사이트맵은 모든 페이지에서 소개만 있는 동아리를 포함하고 빈 동아리는 제외한다', async () => {
  const sitemap = load('src/app/sitemap.ts', {
    '@/shared/api/server-api': {
      get(_url, options) {
        return {
          json: async () =>
            success({
              clubs:
                options.searchParams.page === '1'
                  ? [
                      {
                        id: 1,
                        description: 'Introduction',
                        recruitmentPreviewResponse: null,
                      },
                      {
                        id: 2,
                        description: '',
                        recruitmentPreviewResponse: null,
                      },
                    ]
                  : [
                      {
                        id: 3,
                        description: 'Second page introduction',
                        recruitmentPreviewResponse: null,
                      },
                    ],
              page: { totalPages: 2 },
            }),
        };
      },
    },
    '@/shared/lib/universityMeta': {
      universityDisplayName: { SEJONG: 'Sejong' },
    },
    '@/shared/lib/urlCodeConverter': {
      toUrlCode: (value) => value.toLowerCase(),
    },
  });
  const urls = (await sitemap()).map((item) => item.url);
  assert.equal(urls.includes('https://mokkoji.site/sejong/club/1'), true);
  assert.equal(urls.includes('https://mokkoji.site/sejong/club/2'), false);
  assert.equal(urls.includes('https://mokkoji.site/sejong/club/3'), true);
});
