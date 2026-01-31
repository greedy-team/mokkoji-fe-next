'use client';

import { useReducer } from 'react';
import { toast } from 'react-toastify';
import reducer, { initialState } from '../model/reducer/clubFormReducer';
import { ClubFormData } from '../model/type';

const BASIC_FIELDS: (keyof ClubFormData)[] = [
  'name',
  'category',
  'affiliation',
];

const DESCRIPTION_FIELDS: (keyof ClubFormData)[] = ['description'];

interface UseClubFormOptions {
  onNextStep: () => void;
  initialData?: Partial<ClubFormData>;
}

function useClubForm({ onNextStep, initialData }: UseClubFormOptions) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    formData: { ...initialState.formData, ...initialData },
  });
  const { formData, errors } = state;

  const handleChange = (name: keyof ClubFormData, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', name, value });
  };

  const handleBlur = (name: keyof ClubFormData) => {
    dispatch({ type: 'VALIDATE_FIELD', name });
  };

  const isBasicInfoValid = () => {
    return BASIC_FIELDS.every((field) => formData[field] && !errors[field]);
  };

  const isDescriptionValid = () => {
    return DESCRIPTION_FIELDS.every(
      (field) => formData[field] && !errors[field],
    );
  };

  const handleNextStep = () => {
    BASIC_FIELDS.forEach(handleBlur);
    if (isBasicInfoValid()) {
      onNextStep();
    } else {
      toast.error('모든 필수 항목을 입력해주세요.');
    }
  };

  const setFormData = (data: Partial<ClubFormData>) => {
    Object.entries(data).forEach(([key, value]) => {
      dispatch({
        type: 'UPDATE_FIELD',
        name: key as keyof ClubFormData,
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
    isDescriptionValid,
    handleNextStep,
    setFormData,
  };
}

export default useClubForm;
