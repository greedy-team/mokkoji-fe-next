'use client';

import { useReducer } from 'react';
import { toast } from 'react-toastify';
import reducer, { initialState } from '../model/reducer/recruitmentFormReducer';
import { RecruitmentFormData } from '../model/type';

const BASIC_FIELDS: (keyof RecruitmentFormData)[] = [
  'title',
  'recruitStart',
  'recruitEnd',
  'recruitForm',
];

const CONTENT_FIELDS: (keyof RecruitmentFormData)[] = ['content'];

interface UseRecruitmentFormOptions {
  onNextStep: () => void;
}

function useRecruitmentForm({ onNextStep }: UseRecruitmentFormOptions) {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { formData, errors } = formState;

  const handleChange = <K extends keyof RecruitmentFormData>(
    name: K,
    value: RecruitmentFormData[K],
  ) => {
    dispatch({ type: 'UPDATE_FIELD', name, value });
  };

  const handleBlur = (name: keyof RecruitmentFormData) => {
    dispatch({ type: 'VALIDATE_FIELD', name });
  };

  const isBasicInfoValid = () => {
    const fieldsToValidate = formData.isAlwaysRecruiting
      ? BASIC_FIELDS.filter((f) => f !== 'recruitStart' && f !== 'recruitEnd')
      : BASIC_FIELDS;
    return fieldsToValidate.every((field) => formData[field] && !errors[field]);
  };

  const isContentValid = () => {
    return CONTENT_FIELDS.every((field) => formData[field] && !errors[field]);
  };

  const handleNextStep = () => {
    const fieldsToValidate = formData.isAlwaysRecruiting
      ? BASIC_FIELDS.filter((f) => f !== 'recruitStart' && f !== 'recruitEnd')
      : BASIC_FIELDS;
    fieldsToValidate.forEach(handleBlur);
    if (isBasicInfoValid()) {
      onNextStep();
    } else {
      toast.error('모든 필수 항목을 입력해주세요.');
    }
  };

  const setFormData = (data: Partial<RecruitmentFormData>) => {
    Object.entries(data).forEach(([key, value]) => {
      dispatch({
        type: 'UPDATE_FIELD',
        name: key as keyof RecruitmentFormData,
        value: value as string,
      });
    });
  };

  return {
    formData,
    errors,
    handleChange,
    handleBlur,
    isBasicInfoValid,
    isContentValid,
    handleNextStep,
    setFormData,
  };
}

export default useRecruitmentForm;
