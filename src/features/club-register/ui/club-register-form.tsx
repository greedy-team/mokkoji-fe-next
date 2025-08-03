'use client';

import { useEffect, useReducer, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { UserRole } from '@/shared/model/type';
import ClubInput from './club-input';
import { ClubFormData, FormField, ManageClub } from '../model/type';
import { patchClubManage, postClubRegister } from '../api/postClubRegister';
import reducer, { initialState } from '../model/reducer/clubFormReducer';
import isFormValid from '../util/isFormVaild';

interface RoleProps {
  role: string;
  accessToken: string;
  clubData?: ManageClub;
  clubInfoData?: ClubFormData;
  clubLogo?: string;
}

const fields: FormField[] = [
  { label: '동아리 이름', name: 'name', type: 'input' },
  { label: '카테고리', name: 'category', type: 'options' },
  { label: '소속', name: 'affiliation', type: 'options' },
  { label: '동아리 소개', name: 'description', type: 'textarea' },
  { label: '인스타그램', name: 'instagram', type: 'input' },
];

const fieldsForManager: FormField[] = [
  { label: '동아리 이름', name: 'name', type: 'input' },
  { label: '카테고리', name: 'category', type: 'options' },
  { label: '소속', name: 'affiliation', type: 'options' },
  { label: '동아리 회장 학번', name: 'leaderId', type: 'input' },
];

function ClubRegisterForm({
  role,
  accessToken,
  clubData,
  clubInfoData,
  clubLogo,
}: RoleProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formData, errors } = state;
  const selectedField =
    role === UserRole.CLUB_ADMIN ? fieldsForManager : fields;
  console.log(clubInfoData);
  useEffect(() => {
    if (!clubInfoData) return;

    Object.entries(clubInfoData).forEach(([key, value]) => {
      if (typeof value === 'string') {
        dispatch({
          type: 'UPDATE_FIELD',
          name: key as keyof ClubFormData,
          value,
        });
      }
    });

    if (clubLogo) {
      setPreview(clubLogo);
    }
  }, [clubInfoData]);

  const handleChange = (name: keyof ClubFormData, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', name, value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    dispatch({ type: 'UPDATE_LOGO', file });
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleBlur = (name: keyof ClubFormData) => {
    dispatch({ type: 'VALIDATE_FIELD', name });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('affiliation', formData.affiliation);

    if (formData.description && formData.instagram && formData.leaderId) {
      data.append('leaderId', formData.leaderId);
      data.append('description', formData.description);
      data.append('instagram', formData.instagram);
    }

    if (formData.logo) {
      data.append('image', formData.logo);
    }

    try {
      let res;
      if (accessToken) {
        if (role === UserRole.CLUB_MASTER)
          res = await patchClubManage(data, accessToken, clubData?.clubId);
        else res = await postClubRegister(data, accessToken);
      }
      console.log('등록 성공:', res);
      alert('등록 성공!');
    } catch (err) {
      console.error(err);
      alert('등록 실패!');
    }
  };

  const isValid = isFormValid({ formData, errors }, role);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {selectedField.map((field) => {
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
      {role === UserRole.CLUB_MASTER && (
        <label htmlFor="imageURL" className="my-6 flex">
          <button
            type="button"
            onClick={handleClick}
            className="relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#F4F4F4]"
          >
            {preview ? (
              <Image
                src={preview}
                alt="미리보기 이미지"
                fill
                style={{ objectFit: 'cover' }}
                sizes="80px"
              />
            ) : (
              <Image
                src="/club-register/cameraIcon.svg"
                alt="이미지 등록"
                width={20}
                height={16}
              />
            )}
          </button>
          <div className="flex flex-1 flex-col items-start justify-center gap-1 p-4">
            <p className="font-bold">동아리 로고 이미지</p>
            <span className="text-xs text-[#00D451]">
              PNG, JPG 형식의 이미지를 업로드해주세요!
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
      )}
      <Button type="submit" variant={isValid ? 'submit' : 'disabled'} size="lg">
        등록하기
      </Button>
    </form>
  );
}

export default ClubRegisterForm;
