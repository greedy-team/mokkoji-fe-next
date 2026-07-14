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

export interface PaginationMeta {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface DashboardSummary {
  clubMasterApplications: ClubMasterApplication[];
  clubApplications: ClubApplication[];
  totalClubs: number;
  pendingMasterCount: number;
  pendingClubCount: number;
  totalMasters: number;
}
