'use client';

import { useEffect, useReducer, useRef, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { Button } from '@/shared/ui/button';
import {
  ClubAffiliationLabel,
  ClubCategoryLabel,
  ClubInfoType,
} from '@/shared/model/type';
import ClubInput from './club-input';
import { ClubFormData, FormField } from '../model/type';
import { patchClubInfo } from '../api/postClubRegister';
import isFormValid from '../util/isFormVaild';
import reducer, { initialState } from '../model/reducer/clubFormReducer';

const fields: FormField[] = [
  { label: '동아리 이름', name: 'name', type: 'input' },
  { label: '카테고리', name: 'category', type: 'options' },
  { label: '소속', name: 'affiliation', type: 'options' },
  { label: '동아리 소개', name: 'description', type: 'textarea' },
  { label: '인스타그램', name: 'instagram', type: 'input' },
];

interface ClubInfoProp {
  clubInfo?: ClubInfoType;
  accessToken?: string;
  clubId?: number;
}

function getKeyByValue(obj: Record<string, string>, value: string) {
  return Object.keys(obj).find((key) => obj[key] === value);
}

function ClubEditForm({ clubInfo, accessToken, clubId }: ClubInfoProp) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formData, errors } = state;
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    if (clubInfo) {
      dispatch({
        type: 'UPDATE_MULTIPLE_FIELDS',
        payload: {
          name: clubInfo.name,
          category: getKeyByValue(ClubCategoryLabel, clubInfo.category) || '',
          affiliation:
            getKeyByValue(ClubAffiliationLabel, clubInfo.affiliation) || '',
          description: clubInfo.description ?? '',
          instagram: clubInfo.instagram ?? '',
        },
      });

      setPreview(clubInfo.logo);
    }
  }, [clubInfo]);

  const handleChange = (name: keyof ClubFormData, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', name, value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    const fileName = file.name;
    setLogoFile(file);

    dispatch({ type: 'UPDATE_FIELD', name: 'logo', value: fileName });
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleBlur = (name: keyof ClubFormData) => {
    dispatch({ type: 'VALIDATE_FIELD', name });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clubId) {
      toast.warn('조금 뒤에 다시 시도해주세요');
      return;
    }

    if (!accessToken) {
      toast.warn('로그인을 먼저 해주세요!');
      return;
    }

    const data = {
      name: formData.name,
      category: formData.category,
      affiliation: formData.affiliation,
      description: formData.description,
      instagram: formData.instagram,
      logo: formData.logo ?? '',
    };

    try {
      const res = await patchClubInfo(clubId, data, accessToken);
      const { updateLogo, deleteLogo } = res.data;

      if (logoFile && updateLogo) {
        await fetch(updateLogo, {
          method: 'PUT',
          body: logoFile,
          headers: {
            'Content-Type': logoFile.type,
          },
        });
      }

      if (deleteLogo) {
        await fetch(deleteLogo, { method: 'DELETE' });
      }
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
      <label htmlFor="imageURL" className="my-6 flex">
        <button
          type="button"
          onClick={handleClick}
          className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-[#F4F4F4]"
        >
          {preview ? (
            <Image
              src={preview}
              alt="미리보기 이미지"
              width={100}
              height={100}
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
      </label>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button type="submit" variant={isValid ? 'submit' : 'disabled'} size="lg">
        등록하기
      </Button>
    </form>
  );
}

export default ClubEditForm;
