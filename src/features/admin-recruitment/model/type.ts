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
  imageNames: string[];
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

interface BaseResponse<T> {
  ok: boolean;
  message: string;
  data?: T;
}

export interface RecruitmentData {
  data: {
    id: number;
    uploadImageUrls: string[];
  };
}

export interface RecruitmentDeleteData {
  id: number;
  deleteImageUrls: string[];
}

export type RecruitmentResponse = BaseResponse<RecruitmentData>;
export type RecruitmentPatchResponse = BaseResponse<RecruitmentData>;
export type RecruitmentDeleteResponse = BaseResponse<RecruitmentDeleteData>;

export type Step = '1' | '2';
