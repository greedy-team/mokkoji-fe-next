'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import ClubInput from './club-input';
import { ClubFormData, FormField } from '../model/type';
import validateField from '../util/validateField';

const fields: FormField[] = [
  { label: '동아리 이름', name: 'name', type: 'input' },
  { label: '카테고리', name: 'category', type: 'options' },
  { label: '소속', name: 'affiliation', type: 'options' },
  { label: '동아리 소개', name: 'description', type: 'textarea' },
  { label: '동아리 회장 학번', name: 'leaderId', type: 'input' },
  { label: '인스타그램', name: 'instagram', type: 'input' },
];

function ClubRegisterForm() {
  const [formData, setFormData] = useState<ClubFormData>({
    name: '',
    category: '',
    affiliation: '',
    description: '',
    leaderId: '',
    instagram: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ClubFormData, string>>
  >({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    const errorMsg = validateField(name as keyof ClubFormData, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('제출할 데이터: ', formData);
  };

  const isFormValid =
    Object.values(formData).every((val) => val.trim() !== '') &&
    Object.values(errors).every((msg) => !msg);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {fields.map((field) => (
        <ClubInput
          key={field.name}
          label={field.label}
          name={field.name}
          value={formData[field.name]}
          type={field.type}
          onChange={handleChange}
          error={errors[field.name]}
        />
      ))}
      <Button
        type="submit"
        variant={isFormValid ? 'submit' : 'disabled'}
        size="lg"
      >
        등록하기
      </Button>
    </form>
  );
}

export default ClubRegisterForm;
