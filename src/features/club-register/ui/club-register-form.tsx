'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import ClubInput from './club-input';

function ClubRegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    affiliation: '',
    description: '',
    leaderId: '',
    instagram: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('제출할 데이터: ', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <ClubInput
        label="동아리 이름"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <ClubInput
        label="카테고리"
        name="category"
        value={formData.category}
        onChange={handleChange}
      />
      <ClubInput
        label="소속"
        name="affiliation"
        value={formData.affiliation}
        onChange={handleChange}
      />
      <ClubInput
        label="동아리 회장 학번"
        name="leaderId"
        value={formData.leaderId}
        onChange={handleChange}
      />
      <ClubInput
        label="인스타그램"
        name="instagram"
        value={formData.instagram}
        onChange={handleChange}
      />
      <div className="flex flex-col gap-1">
        <label htmlFor="description">동아리 소개</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="rounded-md border p-2"
        />
      </div>
      <Button type="submit" variant="submit">
        등록
      </Button>
    </form>
  );
}

export default ClubRegisterForm;
