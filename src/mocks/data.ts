import dayjs from 'dayjs';
import type {
  ClubAffiliation,
  ClubCategory,
  RecruitStatus,
  UserRole,
} from '@/shared/model/type';
import type { University } from '@/entities/university/model/type';
import type { ClubComment } from '@/entities/club-detail/model/type';
import type UserInfoType from '@/entities/my/model/type';
import type {
  ClubApplicationType,
  MyClubMasterApplicationType,
} from '@/entities/my/model/type';
import type { AdminClub } from '@/entities/admin/model/types';
import type {
  AdminInfo,
  ClubApplication,
  ClubMasterApplication,
} from '@/features/admin/model/dashboard-types';

// 런타임에 enum을 import하면 SVG 자산까지 끌려와 Node 테스트가 깨지므로 enum 값의 문자열 유니온으로 다룬다
export type MockCategory = `${ClubCategory}`;
export type MockAffiliation = `${ClubAffiliation}`;
export type MockUserRole = `${UserRole}`;

const dateTime = (daysFromToday: number) =>
  dayjs().add(daysFromToday, 'day').format('YYYY-MM-DDTHH:mm:ss');

const placeholderImage = (size: string, text: string) =>
  `https://placehold.co/${size}/png?text=${encodeURIComponent(text)}`;

export const universities: University[] = [
  {
    id: 1,
    name: '세종대학교',
    code: 'SEJONG',
    logo: placeholderImage('120x120', 'SEJONG'),
  },
  {
    id: 2,
    name: '건국대학교',
    code: 'KONKUK',
    logo: placeholderImage('120x120', 'KONKUK'),
  },
  {
    id: 3,
    name: '한양대학교',
    code: 'HANYANG',
    logo: placeholderImage('120x120', 'HANYANG'),
  },
];

export interface MockClub {
  id: number;
  universityCode: string;
  name: string;
  category: MockCategory;
  affiliation: MockAffiliation;
  description: string;
  logo: string;
  instagram: string;
}

export interface MockRecruitment {
  id: number;
  clubId: number;
  title: string;
  content: string;
  recruitStart: string;
  recruitEnd: string;
  isAlwaysRecruiting: boolean;
  createdAt: string;
  imageUrls: string[];
  recruitForm: string;
}

interface ClubSeed {
  universityCode: string;
  name: string;
  category: MockCategory;
  affiliation: MockAffiliation;
  description: string;
  recruitPeriod: [startDay: number, endDay: number] | 'ALWAYS';
}

const clubSeeds: ClubSeed[] = [
  {
    universityCode: 'SEJONG',
    name: '모꼬지',
    category: 'ACADEMIC_CULTURAL',
    affiliation: 'CENTRAL_CLUB',
    description: '동아리 통합 플랫폼을 만드는 개발 동아리입니다.',
    recruitPeriod: [-5, 20],
  },
  {
    universityCode: 'SEJONG',
    name: '그리디',
    category: 'ACADEMIC_CULTURAL',
    affiliation: 'CENTRAL_CLUB',
    description: '웹·앱 개발을 함께 공부하는 IT 동아리입니다.',
    recruitPeriod: [-10, 2],
  },
  {
    universityCode: 'SEJONG',
    name: 'EN#',
    category: 'ACADEMIC_CULTURAL',
    affiliation: 'DEPARTMENT_CLUB',
    description: '소프트웨어학과 학술 동아리입니다.',
    recruitPeriod: [5, 30],
  },
  {
    universityCode: 'SEJONG',
    name: '세종FC 축구부',
    category: 'SPORTS',
    affiliation: 'CENTRAL_CLUB',
    description: '매주 정기 경기를 하는 중앙 축구 동아리입니다.',
    recruitPeriod: [-3, 14],
  },
  {
    universityCode: 'SEJONG',
    name: '하이킥 농구부',
    category: 'SPORTS',
    affiliation: 'CENTRAL_CLUB',
    description: '교내외 리그에 참가하는 농구 동아리입니다.',
    recruitPeriod: [-40, -10],
  },
  {
    universityCode: 'SEJONG',
    name: '서브 테니스',
    category: 'SPORTS',
    affiliation: 'SMALL_GROUP',
    description: '초보자도 환영하는 테니스 소모임입니다.',
    recruitPeriod: 'ALWAYS',
  },
  {
    universityCode: 'SEJONG',
    name: '소리울림 밴드',
    category: 'CULTURAL_ART',
    affiliation: 'CENTRAL_CLUB',
    description: '정기 공연을 여는 락 밴드 동아리입니다.',
    recruitPeriod: [-1, 10],
  },
  {
    universityCode: 'SEJONG',
    name: '빛그림 사진부',
    category: 'CULTURAL_ART',
    affiliation: 'CENTRAL_CLUB',
    description: '출사와 전시회를 함께하는 사진 동아리입니다.',
    recruitPeriod: [-7, 1],
  },
  {
    universityCode: 'SEJONG',
    name: '무대 연극부',
    category: 'CULTURAL_ART',
    affiliation: 'DEPARTMENT_CLUB',
    description: '학기마다 정기 공연을 올리는 연극 동아리입니다.',
    recruitPeriod: [-30, -2],
  },
  {
    universityCode: 'SEJONG',
    name: '리듬 댄스크루',
    category: 'CULTURAL_ART',
    affiliation: 'SMALL_GROUP',
    description: '스트릿 댄스를 연습하는 소모임입니다.',
    recruitPeriod: 'ALWAYS',
  },
  {
    universityCode: 'SEJONG',
    name: '손길 봉사단',
    category: 'VOLUNTEER_SOCIAL',
    affiliation: 'CENTRAL_CLUB',
    description: '지역 아동센터 교육 봉사를 합니다.',
    recruitPeriod: [-2, 25],
  },
  {
    universityCode: 'SEJONG',
    name: '초록 환경동아리',
    category: 'VOLUNTEER_SOCIAL',
    affiliation: 'SMALL_GROUP',
    description: '캠퍼스 플로깅과 환경 캠페인을 진행합니다.',
    recruitPeriod: [10, 40],
  },
  {
    universityCode: 'SEJONG',
    name: 'CCC',
    category: 'RELIGIOUS',
    affiliation: 'CENTRAL_CLUB',
    description: '기독교 연합 동아리입니다.',
    recruitPeriod: 'ALWAYS',
  },
  {
    universityCode: 'SEJONG',
    name: '불교 학생회',
    category: 'RELIGIOUS',
    affiliation: 'CENTRAL_CLUB',
    description: '명상과 템플스테이를 함께합니다.',
    recruitPeriod: [-60, -30],
  },
  {
    universityCode: 'SEJONG',
    name: '주사위 보드게임',
    category: 'OTHER',
    affiliation: 'SMALL_GROUP',
    description: '매주 보드게임 모임을 엽니다.',
    recruitPeriod: [-4, 12],
  },
  {
    universityCode: 'SEJONG',
    name: '한입 요리부',
    category: 'OTHER',
    affiliation: 'CENTRAL_CLUB',
    description: '함께 요리하고 나눠 먹는 동아리입니다.',
    recruitPeriod: [-6, 18],
  },
  {
    universityCode: 'SEJONG',
    name: '토크 영어회화',
    category: 'ACADEMIC_CULTURAL',
    affiliation: 'SMALL_GROUP',
    description: '원어민과 함께하는 영어회화 스터디입니다.',
    recruitPeriod: [-8, 9],
  },
  {
    universityCode: 'SEJONG',
    name: '킥오프 축구 소모임',
    category: 'SPORTS',
    affiliation: 'SMALL_GROUP',
    description: '주말마다 가볍게 공을 차는 모임입니다.',
    recruitPeriod: [-2, 6],
  },
  {
    universityCode: 'SEJONG',
    name: '책갈피 독서모임',
    category: 'ACADEMIC_CULTURAL',
    affiliation: 'SMALL_GROUP',
    description: '한 달에 한 권 읽고 토론합니다.',
    recruitPeriod: [-20, -1],
  },
  {
    universityCode: 'SEJONG',
    name: '스타트 창업동아리',
    category: 'ACADEMIC_CULTURAL',
    affiliation: 'CENTRAL_CLUB',
    description: '아이디어를 실제 창업으로 연결합니다.',
    recruitPeriod: [-12, 3],
  },
  {
    universityCode: 'KONKUK',
    name: '쿠그리디',
    category: 'ACADEMIC_CULTURAL',
    affiliation: 'CENTRAL_CLUB',
    description: '건국대 개발 동아리입니다.',
    recruitPeriod: [-5, 15],
  },
  {
    universityCode: 'KONKUK',
    name: '쿠산악부',
    category: 'SPORTS',
    affiliation: 'CENTRAL_CLUB',
    description: '전국 명산을 함께 오릅니다.',
    recruitPeriod: [-3, 11],
  },
  {
    universityCode: 'KONKUK',
    name: '쿠합창단',
    category: 'CULTURAL_ART',
    affiliation: 'CENTRAL_CLUB',
    description: '정기 연주회를 여는 합창단입니다.',
    recruitPeriod: [7, 30],
  },
  {
    universityCode: 'HANYANG',
    name: '한양 로봇연구회',
    category: 'ACADEMIC_CULTURAL',
    affiliation: 'DEPARTMENT_CLUB',
    description: '로봇 대회에 출전하는 학술 동아리입니다.',
    recruitPeriod: [-4, 16],
  },
  {
    universityCode: 'HANYANG',
    name: '한양 야구부',
    category: 'SPORTS',
    affiliation: 'CENTRAL_CLUB',
    description: '대학 야구 리그에 참가합니다.',
    recruitPeriod: [-45, -15],
  },
  {
    universityCode: 'HANYANG',
    name: '한양 나눔봉사',
    category: 'VOLUNTEER_SOCIAL',
    affiliation: 'CENTRAL_CLUB',
    description: '연탄·도시락 나눔 봉사를 합니다.',
    recruitPeriod: [-1, 21],
  },
];

export const mockClubs: MockClub[] = clubSeeds.map((seed, index) => ({
  id: index + 1,
  universityCode: seed.universityCode,
  name: seed.name,
  category: seed.category,
  affiliation: seed.affiliation,
  description: `<p>${seed.description}</p><p>함께 활동할 새로운 부원을 기다립니다.</p>`,
  logo: placeholderImage('160x160', `Club ${index + 1}`),
  instagram: `https://instagram.com/mokkoji_mock_${index + 1}`,
}));

const toRecruitment = (
  id: number,
  club: MockClub,
  recruitPeriod: ClubSeed['recruitPeriod'],
  title: string,
): MockRecruitment => {
  const isAlwaysRecruiting = recruitPeriod === 'ALWAYS';
  const [startDay, endDay] = isAlwaysRecruiting ? [-90, 365] : recruitPeriod;
  return {
    id,
    clubId: club.id,
    title,
    content: `<p>${club.name}에서 새 부원을 모집합니다.</p><ul><li>정기 모임: 매주 수요일 18시</li><li>회비: 학기당 2만원</li></ul>`,
    recruitStart: dateTime(startDay),
    recruitEnd: dateTime(endDay),
    isAlwaysRecruiting,
    createdAt: dateTime(startDay),
    imageUrls: [placeholderImage('600x800', `${club.id}-poster`)],
    recruitForm: 'https://forms.gle/mokkoji-mock',
  };
};

export const mockRecruitments: MockRecruitment[] = [
  ...mockClubs.map((club, index) =>
    toRecruitment(
      club.id,
      club,
      clubSeeds[index].recruitPeriod,
      `${club.name} ${dayjs().year()}년 신입 부원 모집`,
    ),
  ),
  ...mockClubs
    .slice(0, 4)
    .map((club) =>
      toRecruitment(
        club.id + 100,
        club,
        [-200, -170],
        `${club.name} ${dayjs().year() - 1}년 신입 부원 모집`,
      ),
    ),
];

export function toRecruitStatus(
  recruitment: Pick<
    MockRecruitment,
    'isAlwaysRecruiting' | 'recruitStart' | 'recruitEnd'
  >,
): RecruitStatus {
  if (recruitment.isAlwaysRecruiting) return 'ALWAYS';
  const now = dayjs();
  if (now.isBefore(recruitment.recruitStart)) return 'BEFORE';
  if (now.isAfter(recruitment.recruitEnd)) return 'CLOSED';
  if (dayjs(recruitment.recruitEnd).diff(now, 'day') < 3) return 'IMMINENT';
  return 'OPEN';
}

export const latestRecruitmentOf = (
  clubId: number,
): MockRecruitment | undefined =>
  mockRecruitments
    .filter((recruitment) => recruitment.clubId === clubId)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))[0];

const roles: MockUserRole[] = [
  'GREEDY_ADMIN',
  'CLUB_ADMIN',
  'CLUB_MASTER',
  'NORMAL',
];

// 서버 프로세스에서만 읽히는 값이라 NEXT_PUBLIC_ 접두사가 필요 없다
export const mockUserRole: MockUserRole =
  roles.find((role) => role === process.env.MOCK_USER_ROLE) ?? 'CLUB_MASTER';

// MOKKOJI_ADMIN은 학교가 없어 대시보드의 동아리 관리 탭이 비므로, 두 탭이 모두 채워지는 학교 관리자를 기본값으로 둔다
export const mockAdminInfo: AdminInfo =
  process.env.MOCK_ADMIN_ROLE === 'MOKKOJI_ADMIN'
    ? { role: 'MOKKOJI_ADMIN', universityCode: null }
    : { role: 'UNIVERSITY_ADMIN', universityCode: 'SEJONG' };

export const mockUser: UserInfoType = {
  id: 1,
  name: '모꼬지',
  email: 'mock@sejong.ac.kr',
  role: mockUserRole,
  emailOn: true,
  universityCode: 'SEJONG',
  userCode: 'MOCK-0001',
};

export const managedClubIds = [1, 2];

export const favoriteClubIds = new Set<number>([2, 4, 7]);

export interface MockComment extends ClubComment {
  clubId: number;
  writerId: number;
}

export const mockComments: MockComment[] = [
  {
    id: 1,
    clubId: 1,
    writerId: 2,
    content: '분위기가 정말 좋아요!',
    rate: 5,
    isModified: false,
    time: dateTime(-3),
    isWriter: false,
  },
  {
    id: 2,
    clubId: 1,
    writerId: 3,
    content: '활동이 체계적이라 많이 배웠습니다.',
    rate: 4,
    isModified: true,
    time: dateTime(-10),
    isWriter: false,
  },
  {
    id: 3,
    clubId: 2,
    writerId: 1,
    content: '개발 공부하기 좋은 동아리입니다.',
    rate: 5,
    isModified: false,
    time: dateTime(-5),
    isWriter: true,
  },
  {
    id: 4,
    clubId: 4,
    writerId: 2,
    content: '운동 좋아하면 강력 추천!',
    rate: 4,
    isModified: false,
    time: dateTime(-1),
    isWriter: false,
  },
];

export const adminClubs: AdminClub[] = mockClubs.map((club) => ({
  clubId: club.id,
  clubName: club.name,
  universityCode: club.universityCode,
  universityName:
    universities.find((university) => university.code === club.universityCode)
      ?.name ?? club.universityCode,
  category: club.category as ClubCategory,
  affiliation: club.affiliation as ClubAffiliation,
  logo: club.logo,
  masterId: club.id + 1000,
  masterName: `동아리장${club.id}`,
  masterEmail: `master${club.id}@mokkoji.site`,
}));

export const clubMasterApplications: ClubMasterApplication[] = [
  {
    id: 12,
    universityName: '건국대학교',
    clubName: '쿠그리디',
    userName: '홍길동',
    status: 'PENDING',
    rejectReason: null,
    createdAt: '2026-04-22T14:00:00',
  },
  {
    id: 13,
    universityName: '세종대학교',
    clubName: 'EN#',
    userName: '신혜빈',
    status: 'APPROVED',
    rejectReason: null,
    createdAt: '2026-04-20T09:30:00',
  },
  {
    id: 14,
    universityName: '세종대학교',
    clubName: '모꼬지',
    userName: '김철수',
    status: 'REJECTED',
    rejectReason: '제출하신 정보가 동아리 정보와 일치하지 않습니다.',
    createdAt: '2026-04-18T16:10:00',
  },
  {
    id: 17,
    universityName: '세종대학교',
    clubName: '소리울림 밴드',
    userName: '이민지',
    status: 'PENDING',
    rejectReason: null,
    createdAt: '2026-10-20T13:00:00',
  },
];

export const clubApplications: ClubApplication[] = [
  {
    applicationId: 12,
    universityName: '건국대학교',
    clubName: '쿠코딩',
    applicantName: '홍길동',
    category: 'ACADEMIC_CULTURAL',
    affiliation: 'CENTRAL_CLUB',
    description: '<p>개발 동아리입니다.</p>',
    logo: placeholderImage('120x120', 'Coding'),
    instagram: 'https://instagram.com/kucoding',
    status: 'PENDING',
    rejectReason: null,
    createdAt: '2026-04-22T14:00:00',
  },
  {
    applicationId: 18,
    universityName: '세종대학교',
    clubName: '세종 러닝크루',
    applicantName: '정다은',
    category: 'SPORTS',
    affiliation: 'SMALL_GROUP',
    description: '<p>매주 캠퍼스를 함께 달리는 러닝 모임입니다.</p>',
    logo: placeholderImage('120x120', 'Run'),
    instagram: 'https://instagram.com/sejong_run',
    status: 'PENDING',
    rejectReason: null,
    createdAt: '2026-10-22T10:00:00',
  },
  {
    applicationId: 15,
    universityName: '세종대학교',
    clubName: '코드잇',
    applicantName: '이영희',
    category: 'ACADEMIC_CULTURAL',
    affiliation: 'SMALL_GROUP',
    description: '<p>알고리즘 스터디 동아리.</p>',
    logo: placeholderImage('120x120', 'Codeit'),
    instagram: 'https://instagram.com/codeit',
    status: 'REJECTED',
    rejectReason: '동일한 이름의 동아리가 이미 존재합니다.',
    createdAt: '2026-04-15T11:25:00',
  },
  {
    applicationId: 16,
    universityName: '세종대학교',
    clubName: '알고리즘연구회',
    applicantName: '박민준',
    category: 'ACADEMIC_CULTURAL',
    affiliation: 'SMALL_GROUP',
    description: '<p>알고리즘 및 PS 연구 동아리.</p>',
    logo: placeholderImage('120x120', 'Algo'),
    instagram: 'https://instagram.com/algo',
    status: 'APPROVED',
    rejectReason: null,
    createdAt: '2026-04-10T09:00:00',
  },
];

export const myClubApplications: ClubApplicationType[] = [
  {
    clubApplicationId: 15,
    universityName: '세종대학교',
    clubName: '코드잇',
    status: 'REJECTED',
    rejectReason: '동일한 이름의 동아리가 이미 존재합니다.',
    createdAt: '2026-04-15T11:25:00',
  },
  {
    clubApplicationId: 16,
    universityName: '세종대학교',
    clubName: '알고리즘연구회',
    status: 'APPROVED',
    rejectReason: null,
    createdAt: '2026-04-10T09:00:00',
  },
];

export const myClubMasterApplications: MyClubMasterApplicationType[] = [
  {
    id: 1,
    universityName: '건국대학교',
    clubName: '쿠그리디',
    userName: mockUser.name ?? '',
    status: 'PENDING',
    rejectReason: null,
    createdAt: '2026-05-05T21:30:00',
  },
  {
    id: 2,
    universityName: '세종대학교',
    clubName: 'EN#',
    userName: mockUser.name ?? '',
    status: 'APPROVED',
    rejectReason: null,
    createdAt: '2026-05-01T10:00:00',
  },
];
