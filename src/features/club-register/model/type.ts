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
