'use client';

import { useReducer } from 'react';
import reducer, { initialState } from '../model/reducer/clubFormReducer';
import { ClubFormData } from '../model/type';

const REGISTER_FIELDS: (keyof ClubFormData)[] = [
  'name',
  'category',
  'affiliation',
  'clubMasterStudentId',
];

function useClubRegisterForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formData, errors } = state;

  const handleChange = (name: keyof ClubFormData, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', name, value });
  };

  const handleBlur = (name: keyof ClubFormData) => {
    dispatch({ type: 'VALIDATE_FIELD', name });
  };

  const isRegisterInfoValid = () => {
    return REGISTER_FIELDS.every((field) => formData[field] && !errors[field]);
  };

  const validateAll = () => {
    REGISTER_FIELDS.forEach(handleBlur);
  };

  return {
    formData,
    errors,
    handleChange,
    handleBlur,
    isRegisterInfoValid,
    validateAll,
  };
}

export default useClubRegisterForm;
