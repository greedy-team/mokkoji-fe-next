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

export interface FormField {
  label: string;
  name: keyof ClubFormData;
  type: string;
}

export interface StateProp {
  formData: ClubFormData;
  errors: Partial<Record<keyof ClubFormData, string>>;
}

export type Action =
  | { type: 'UPDATE_FIELD'; name: keyof ClubFormData; value: string }
  | { type: 'VALIDATE_FIELD'; name: keyof ClubFormData }
  | { type: 'RESET_FORM' }
  | { type: 'UPDATE_MULTIPLE_FIELDS'; payload: Partial<ClubFormData> };

export interface EditResponseField {
  data?: {
    updateLogo: string;
    deleteLogo: string;
  };
}

export interface EditResponse {
  ok: boolean;
  message: string;
  data?: EditResponseField;
  status: number;
}
