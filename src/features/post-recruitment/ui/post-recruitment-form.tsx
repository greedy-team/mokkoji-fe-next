'use client';

import { useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import { ClubInfoType } from '@/shared/model/type';
import Input from '@/shared/ui/input';
import Textarea from '@/shared/ui/textarea';
import cn from '@/shared/lib/utils';
import ky from 'ky';
import { useRouter } from 'next/navigation';
import SafeForm from '@/shared/ui/safe-form';
import { FormField, RecruitmentFormData } from '../model/type';
import reducer, { initialState } from '../model/reducer/recruitmentFormReducer';
import SelectDate from './select-date';
import isFormValid from '../util/isFormVaild';
import postRecruitmentForm from '../api/postRecruitmentForm';

interface ClubInfoProp {
  clubInfo?: ClubInfoType;
  clubId?: number;
}

const fields: FormField[] = [
  { label: '제목', name: 'title', type: 'input' },
  { label: '모집 공고', name: 'content', type: 'textarea' },
  { label: '모집 시작일', name: 'recruitStart', type: 'date' },
  { label: '모집 마감일', name: 'recruitEnd', type: 'date' },
  { label: '모집 폼 링크', name: 'recruitForm', type: 'input' },
  { label: '이미지', name: 'images', type: 'image' },
];

function PostRecruitmentForm({ clubInfo, clubId }: ClubInfoProp) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { formData, errors } = state;
  const router = useRouter();

  const handleChange = (name: keyof RecruitmentFormData, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', name, value });
  };

  const handleBlur = (name: keyof RecruitmentFormData) => {
    dispatch({ type: 'VALIDATE_FIELD', name });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    const newFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFiles]);

    const newFileNames = newFiles.map(
      (file) =>
        `recruitment-image/${clubId}/${crypto.randomUUID()}.${file.name.split('.').pop()}`,
    );

    dispatch({
      type: 'UPDATE_FIELD',
      name: 'images',
      value: [...formData.images, ...newFileNames],
    });
  };

  const handleImageRemove = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const data = {
      title: formData.title,
      content: formData.content,
      recruitStart: formData.recruitStart,
      recruitEnd: formData.recruitEnd,
      recruitForm: formData.recruitForm,
      images: formData.images,
    };

    const res = await postRecruitmentForm(data, clubId!);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    if (Array.isArray(res.data?.uploadImageUrls)) {
      await Promise.all(
        res.data.uploadImageUrls.map((url: string, i: number) =>
          ky.put(url, {
            body: imageFiles[i],
            headers: { 'Content-Type': imageFiles[i].type },
          }),
        ),
      );
    }
    toast.success('모집 공고가 성공적으로 업로드되었습니다!');
    router.push('/recruit');
    setIsSubmitting(false);
  };

  const isValid = isFormValid({ formData, errors }, fields);

  return (
    <SafeForm
      onSubmit={handleSubmit}
      title="등록하기"
      disabled={!isValid}
      formClassName="flex flex-col gap-2 py-8"
    >
      <label htmlFor="name" className="mt-4 font-bold">
        동아리 이름
      </label>
      <Input
        id="name"
        name="name"
        variant={errors.title ? 'error' : 'default'}
        value={clubInfo?.name}
        readOnly
      />
      <label htmlFor="title" className="mt-4 flex gap-2 font-bold">
        제목
        {errors.title && (
          <p className="pt-1 text-xs font-medium text-red-500">
            {errors.title}
          </p>
        )}
      </label>
      <Input
        id="title"
        name="title"
        value={formData.title}
        variant={errors.title ? 'error' : 'default'}
        onChange={(e) => handleChange('title', e.target.value)}
        onBlur={() => handleBlur('title')}
      />
      <label htmlFor="content" className="mt-4 flex gap-2 font-bold">
        모집 공고
        {errors.content && (
          <p className="pt-1 text-xs font-medium text-red-500">
            {errors.content}
          </p>
        )}
      </label>
      <p className="text-xs text-[#00D451]">5000자 이내로 작성해주세요!</p>
      <Textarea
        id="content"
        name="content"
        value={formData.content}
        onChange={(e) => handleChange('content', e.target.value)}
        variant={errors.content ? 'error' : 'default'}
        maxLength={5000}
        className="transition-colors duration-300"
        onBlur={() => handleBlur('content')}
      />
      <p className="text-end text-xs text-[#474747]">
        {formData.content.length}{' '}
        <span className="text-[#CCCCCC]">/ 5000자</span>
      </p>
      <label htmlFor="recruitForm" className="mt-4 flex gap-2 font-bold">
        모집 폼 링크
        {errors.recruitForm && (
          <p className="pt-1 text-xs font-medium text-red-500">
            {errors.recruitForm}
          </p>
        )}
      </label>
      <Input
        id="recruitForm"
        name="recruitForm"
        placeholder="https://example.com"
        value={formData.recruitForm}
        variant={errors.recruitForm ? 'error' : 'default'}
        onChange={(e) => handleChange('recruitForm', e.target.value)}
        onBlur={() => handleBlur('recruitForm')}
      />
      <label htmlFor="recruitPeriod" className="mt-4 flex gap-2 font-bold">
        모집 기간
      </label>
      <SelectDate
        startDate={formData.recruitStart}
        endDate={formData.recruitEnd}
        onChange={handleChange}
        errors={{
          recruitStart: errors.recruitStart,
          recruitEnd: errors.recruitEnd,
        }}
      />
      <label htmlFor="image" className="mt-4 font-bold">
        이미지 파일 업로드
      </label>
      <div
        className={cn(
          'mt-2 rounded-md border-2 px-4 py-3',
          imageFiles.length > 0 && 'border-[#00D451]',
        )}
      >
        <input
          name="image"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="flex cursor-pointer items-center justify-center text-sm"
        />

        {imageFiles.length > 0 && (
          <ul className="mt-2 list-inside list-disc text-sm text-gray-700">
            {imageFiles.map((file, index) => (
              <li key={file.name} className="flex items-center justify-between">
                <span>{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="ml-4 cursor-pointer text-red-500 hover:underline"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SafeForm>
  );
}

export default PostRecruitmentForm;
