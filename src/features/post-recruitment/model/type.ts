export interface RecruitmentInputProps {
  label: string;
  name: keyof RecruitmentFormData;
  value: string;
  type: string;
  onChange: (name: string, value: string) => void;
  error: string | undefined;
  onBlur: (name: keyof RecruitmentFormData) => void;
}

export interface RecruitmentFormData {
  title: string;
  imageUrls: string[];
  content: string;
  recruitStart: string;
  recruitEnd: string;
  recruitForm: string;
}

export interface FormField {
  label: string;
  name: keyof RecruitmentFormData;
  type: string;
}

export interface StateProp {
  formData: RecruitmentFormData;
  errors: Partial<Record<keyof RecruitmentFormData, string>>;
}

export type Action =
  | {
      type: 'UPDATE_FIELD';
      name: keyof RecruitmentFormData;
      value: string | string[];
    }
  | { type: 'VALIDATE_FIELD'; name: keyof RecruitmentFormData }
  | { type: 'UPDATE_IMAGE'; file: File }
  | { type: 'RESET_FORM' };

export interface RecruitmentResponse {
  data: {
    id: number;
    imageUrls: string[];
  };
}
