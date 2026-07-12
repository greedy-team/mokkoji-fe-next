interface UserInfoType {
  id: number;
  name: string | null;
  email: string | null;
  role: string;
  emailOn: boolean;
  universityCode: string | null;
}

export type ClubApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ClubApplicationType {
  clubApplicationId: number;
  universityName: string;
  clubName: string;
  status: ClubApplicationStatus;
  rejectReason: string | null;
  createdAt: string;
}

export interface ClubApplicationListType {
  clubApplications: ClubApplicationType[];
}

export interface MyClubMasterApplicationType {
  id: number;
  universityName: string;
  clubName: string;
  userName: string;
  status: ClubApplicationStatus;
  rejectReason: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface ApplicationCardItem {
  id: number;
  clubName: string;
  universityName: string;
  status: ClubApplicationStatus;
  rejectReason: string | null;
  logo?: string | null;
  createdAt: string;
}

export default UserInfoType;
