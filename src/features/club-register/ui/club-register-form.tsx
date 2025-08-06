'use client';

import { useReducer } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/shared/ui/button';
import ClubInput from './club-input';
import { ClubFormData, FormField } from '../model/type';
import { postClubRegister } from '../api/postClubRegister';
import reducer, { initialState } from '../model/reducer/clubFormReducer';
import isFormValid from '../util/isFormVaild';

const fields: FormField[] = [
  { label: '동아리 이름', name: 'name', type: 'input' },
  { label: '카테고리', name: 'category', type: 'options' },
  { label: '소속', name: 'affiliation', type: 'options' },
  { label: '동아리 회장 학번', name: 'clubMasterStudentId', type: 'input' },
];

interface ClubNameProp {
  accessToken?: string;
}

function ClubRegisterForm({ accessToken }: ClubNameProp) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formData, errors } = state;

  const handleChange = (name: keyof ClubFormData, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', name, value });
  };

  const handleBlur = (name: keyof ClubFormData) => {
    dispatch({ type: 'VALIDATE_FIELD', name });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessToken) {
      toast.warn('로그인을 먼저 해주세요!');
      return;
    }

    const data = {
      name: formData.name,
      category: formData.category,
      affiliation: formData.affiliation,
      clubMasterStudentId: formData.clubMasterStudentId,
    };

    try {
      await postClubRegister(data, accessToken);
      toast.success('등록 성공!');
    } catch (err) {
      console.error(err);
      toast.error('등록 실패!');
    }
  };

  const isValid = isFormValid({ formData, errors }, fields);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {fields.map((field) => {
        const value = formData[field.name];
        if (typeof value !== 'string') return null;

        return (
          <ClubInput
            key={field.name}
            label={field.label}
            name={field.name}
            value={value}
            type={field.type}
            onChange={(name, newValue) =>
              handleChange(name as keyof ClubFormData, newValue)
            }
            error={errors[field.name]}
            onBlur={handleBlur}
          />
        );
      })}
      <Button type="submit" variant={isValid ? 'submit' : 'disabled'} size="lg">
        등록하기
      </Button>
    </form>
  );
}

export default ClubRegisterForm;
