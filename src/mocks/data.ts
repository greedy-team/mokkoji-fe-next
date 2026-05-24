export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ClubMasterApplication {
  applicationId: number;
  universityName: string;
  clubName: string;
  applicantName: string;
  status: ApplicationStatus;
  rejectReason?: string | null;
  createdAt: string;
}

export interface AdminClub {
  id: number;
  universityName: string;
  name: string;
  category: string;
  affiliation: string;
  description: string;
  logo: string;
  clubMaster: { id: number; name: string; email: string } | null;
}

export interface ClubApplication {
  applicationId: number;
  universityName: string;
  clubName: string;
  applicantName: string;
  category: string;
  affiliation: string;
  description: string;
  logo: string;
  instagram: string;
  status: ApplicationStatus;
  rejectReason?: string | null;
  createdAt: string;
}

export interface MyClubMasterApplication {
  id: number;
  universityCode: string;
  clubName: string;
  userName: string;
  status: ApplicationStatus;
  rejectReason?: string | null;
  createdAt: string;
}

export const clubMasterApplications: ClubMasterApplication[] = [
  {
    applicationId: 12,
    universityName: '건국대',
    clubName: '그리디',
    applicantName: '홍길동',
    status: 'PENDING',
    createdAt: '2026-04-22T14:00:00',
  },
  {
    applicationId: 13,
    universityName: '세종대',
    clubName: 'EN#',
    applicantName: '신혜빈',
    status: 'APPROVED',
    createdAt: '2026-04-20T09:30:00',
  },
  {
    applicationId: 14,
    universityName: '세종대',
    clubName: '모꼬지',
    applicantName: '김철수',
    status: 'REJECTED',
    rejectReason: '제출하신 정보가 동아리 정보와 일치하지 않습니다.',
    createdAt: '2026-04-18T16:10:00',
  },
];

export const adminClubs: AdminClub[] = [
  {
    id: 1,
    universityName: '건국대',
    name: '그리디',
    category: '학술/교양',
    affiliation: '중앙동아리',
    description: '개발 동아리입니다.',
    logo: 'https://placehold.co/120x120?text=Greedy',
    clubMaster: { id: 3, name: '홍길동', email: 'club@konkuk.ac.kr' },
  },
  {
    id: 2,
    universityName: '세종대',
    name: 'EN#',
    category: '학술/교양',
    affiliation: '중앙동아리',
    description: 'IT 학술 동아리입니다.',
    logo: 'https://placehold.co/120x120?text=EN',
    clubMaster: null,
  },
  {
    id: 3,
    universityName: '세종대',
    name: '모꼬지',
    category: '문화/예술',
    affiliation: '중앙동아리',
    description: '동아리 통합 플랫폼 팀.',
    logo: 'https://placehold.co/120x120?text=Mokkoji',
    clubMaster: { id: 7, name: '신혜빈', email: 'master@sejong.ac.kr' },
  },
];

export const clubApplications: ClubApplication[] = [
  {
    applicationId: 12,
    universityName: '건국대학교',
    clubName: '그리디',
    applicantName: '홍길동',
    category: '학술/교양',
    affiliation: '중앙동아리',
    description: '개발 동아리입니다.',
    logo: 'https://placehold.co/120x120?text=Greedy',
    instagram: 'https://instagram.com/greedy',
    status: 'PENDING',
    rejectReason: null,
    createdAt: '2026-04-22T14:00:00',
  },
  {
    applicationId: 15,
    universityName: '세종대학교',
    clubName: '코드잇',
    applicantName: '이영희',
    category: '학술/교양',
    affiliation: '소학회',
    description: '알고리즘 스터디 동아리.',
    logo: 'https://placehold.co/120x120?text=Codeit',
    instagram: 'https://instagram.com/codeit',
    status: 'REJECTED',
    rejectReason: '동일한 이름의 동아리가 이미 존재합니다.',
    createdAt: '2026-04-15T11:25:00',
  },
];

export const myClubMasterApplications: MyClubMasterApplication[] = [
  {
    id: 1,
    universityCode: 'KONKUK',
    clubName: '그리디',
    userName: '신혜빈',
    status: 'PENDING',
    rejectReason: null,
    createdAt: '2026-05-05T21:30:00',
  },
  {
    id: 2,
    universityCode: 'SEJONG',
    clubName: 'EN#',
    userName: '신혜빈',
    status: 'APPROVED',
    rejectReason: null,
    createdAt: '2026-05-01T10:00:00',
  },
];

export const knownApplicationIds = new Set<number>([12, 13, 14, 15]);
