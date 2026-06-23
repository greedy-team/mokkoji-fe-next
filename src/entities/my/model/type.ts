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

export default UserInfoType;
