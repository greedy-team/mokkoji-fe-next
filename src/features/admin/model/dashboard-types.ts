export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type AdminRole = 'UNIVERSITY_ADMIN' | 'MOKKOJI_ADMIN';

export interface AdminInfo {
  role: AdminRole;
  universityCode: string | null;
}

export interface ClubMasterApplication {
  id: number;
  universityName: string;
  clubName: string;
  userName: string;
  status: ApplicationStatus;
  rejectReason: string | null;
  createdAt: string;
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
  rejectReason: string | null;
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
  clubMaster: {
    id: number;
    name: string;
    email: string;
  } | null;
}

export type ApplicationKind = 'club' | 'master';

export interface ApplicationCardItem {
  key: string;
  kind: ApplicationKind;
  applicationId: number;
  clubName: string;
  universityName: string;
  applicantName: string;
  status: ApplicationStatus;
  createdAt: string;
  category?: string;
  affiliation?: string;
  logo?: string;
  instagram?: string;
  description?: string;
}

export interface PaginationMeta {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}
