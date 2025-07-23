export interface ClubInputProps {
  label: string;
  name: string;
  value: string;
  type: string;
  onChange: (name: string, value: string) => void;
  error: string | undefined;
}

export interface ClubFormData {
  name: string;
  category: string;
  affiliation: string;
  leaderId: string;
  instagram: string;
  description: string;
}

export interface FormField {
  label: string;
  name: keyof ClubFormData;
  type: string;
}
