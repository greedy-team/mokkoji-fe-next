'use client';

import { useCallback, useReducer } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import useDebouncedSubmit from '@/shared/model/useDebounceSubmit';
import ClubInput from './club-input';
import { ClubFormData, FormField } from '../model/type';
import { postClubRegister } from '../api/postClubRegister';
import isFormValid from '../util/isFormVaild';
import reducer, { initialState } from '../model/reducer/clubFormReducer';

const fields: FormField[] = [
  { label: '동아리 이름', name: 'name', type: 'input' },
  { label: '카테고리', name: 'category', type: 'options' },
  { label: '소속', name: 'affiliation', type: 'options' },
  { label: '동아리 회장 학번', name: 'clubMasterStudentId', type: 'input' },
];

function ClubRegisterForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const { formData, errors } = state;

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const data = {
        name: formData.name,
        category: formData.category,
        affiliation: formData.affiliation,
        clubMasterStudentId: formData.clubMasterStudentId,
      };

      const res = await postClubRegister(data);
      if (!res.ok) {
        toast.error(res.message);
        return;
      }
      toast.success('등록 성공!');
      router.replace('/club');
    },
    [formData],
  );

  const { handleSubmit, isSubmitting } = useDebouncedSubmit(onSubmit);

  const handleChange = (name: keyof ClubFormData, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', name, value });
  };

  const handleBlur = (name: keyof ClubFormData) => {
    dispatch({ type: 'VALIDATE_FIELD', name });
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
      <Button type="submit" disabled={isSubmitting || !isValid} size="lg">
        등록하기
      </Button>
    </form>
  );
}

export default ClubRegisterForm;
