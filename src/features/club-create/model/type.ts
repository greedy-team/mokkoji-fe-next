export interface ClubCreateFormData {
  universityCode: string;
  clubName: string;
  clubCategory: string;
  clubAffiliation: string;
  logo: string;
  instagram: string;
  description: string;
}

export interface ClubApplicationCreateData {
  applicationId: number;
  uploadLogoUrl: string;
}

export interface ClubApplicationCreateBody {
  data?: ClubApplicationCreateData;
}

export interface ClubApplicationCreateResponse {
  ok: boolean;
  message: string;
  data?: ClubApplicationCreateBody;
  status: number;
}
