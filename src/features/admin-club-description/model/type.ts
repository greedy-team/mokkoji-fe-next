export interface ClubInputProps {
  label: string;
  name: keyof ClubFormData;
  value: string;
  type: string;
  onChange: (name: string, value: string) => void;
  error: string | undefined;
  onBlur: (name: keyof ClubFormData) => void;
  placeholder?: string;
}

export interface ClubFormData {
  name: string;
  category: string;
  affiliation: string;
  clubMasterStudentId: string;
  instagram: string;
  description: string;
  logo?: string;
}

export interface ClubDescriptionFormField {
  label: string;
  name: keyof ClubFormData;
  type: string;
}

export interface ClubDescriptionFormState {
  formData: ClubFormData;
  errors: Partial<Record<keyof ClubFormData, string>>;
}

export type ClubDescriptionFormAction =
  | { type: 'UPDATE_FIELD'; name: keyof ClubFormData; value: string }
  | { type: 'VALIDATE_FIELD'; name: keyof ClubFormData }
  | { type: 'RESET_FORM' }
  | { type: 'UPDATE_MULTIPLE_FIELDS'; payload: Partial<ClubFormData> };

export interface ClubEditLogoUrls {
  data?: {
    updateLogo: string;
    deleteLogo: string;
  };
}

export interface ClubEditResponse {
  ok: boolean;
  message: string;
  data?: ClubEditLogoUrls;
  status: number;
}
