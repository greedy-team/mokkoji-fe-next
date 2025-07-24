export interface ClubInputProps {
  label: string;
  name: keyof ClubFormData;
  value: string;
  type: string;
  onChange: (name: string, value: string) => void;
  error: string | undefined;
  onBlur: (name: keyof ClubFormData) => void;
}

export interface ClubFormData {
  name: string;
  category: string;
  affiliation: string;
  leaderId: string;
  instagram: string;
  description: string;
  logo?: File;
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
  | { type: 'UPDATE_LOGO'; file: File }
  | { type: 'RESET_FORM' };
