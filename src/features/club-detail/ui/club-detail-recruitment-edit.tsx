'use client';

import SafeForm from '@/shared/ui/safe-form';
import Input from '@/shared/ui/input';
import Textarea from '@/shared/ui/textarea';
import SelectDate from '@/features/post-recruitment/ui/select-date';
import reducer from '@/features/post-recruitment/model/reducer/recruitmentFormReducer';
import { useReducer } from 'react';
import {
  RecruitmentFormData,
  StateProp,
} from '@/features/post-recruitment/model/type';
import { toast } from 'react-toastify';
import ky from 'ky';
import patchRecruitmentForm from '@/features/club-detail/api/patchRecruitment';
import useImageUpload from '@/shared/model/useImageUpload';
import ImageUploadSection from '@/shared/ui/image-upload-section';

interface RecruitDetailEditProps {
  title: string;
  clubName: string;
  category: string;
  content: string;
  recruitForm: string;
  recruitStart: string;
  recruitEnd: string;
  clubId: number;
  imageUrls: string[];
  setIsEditing: (isEditing: boolean) => void;
}

function ClubDetailRecruitmentEdit({
  title,
  clubName,
  category,
  content,
  recruitForm,
  recruitStart,
  recruitEnd,
  clubId,
  imageUrls,
  setIsEditing,
}: RecruitDetailEditProps) {
  const initialState: StateProp = {
    formData: {
      title,
      imageCount: imageUrls.length,
      content,
      recruitStart,
      recruitEnd,
      recruitForm,
    },
    errors: {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const { formData, errors } = state;
  const { imageFiles, handleImageChange, handleImageRemove, inputRef } =
    useImageUpload();

  const handleChange = (name: keyof RecruitmentFormData, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', name, value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title: formData.title,
      content: formData.content,
      recruitStart: formData.recruitStart,
      recruitEnd: formData.recruitEnd,
      recruitForm: formData.recruitForm,
      imageCount: formData.imageCount,
    };

    const res = await patchRecruitmentForm(data, clubId!);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    await Promise.all([
      ...(res.data?.deleteImageUrls?.map((url: string) => ky.delete(url)) ??
        []),
      ...(res.data?.uploadImageUrls?.map((url: string, i: number) =>
        ky.put(url, {
          body: imageFiles[i].file,
          headers: { 'Content-Type': imageFiles[i].file.type },
        }),
      ) ?? []),
    ]);
    toast.success('모집 공고가 성공적으로 업로드되었습니다!');
    setIsEditing(false);
  };

  return (
    <SafeForm
      onSubmit={handleSubmit}
      buttonClassName="mt-2"
      title="수정하기"
      formClassName="flex flex-col gap-2 my-1 max-w-[600px]"
    >
      <label htmlFor="title" className="indent-1 text-xl font-bold">
        제목
      </label>
      <Input
        id="title"
        name="title"
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
      />
      <label htmlFor="content" className="indent-1 text-xl font-bold">
        모집 공고
      </label>
      <Textarea
        id="content"
        name="content"
        value={formData.content}
        onChange={(e) => handleChange('content', e.target.value)}
        maxLength={5000}
      />
      <label htmlFor="recruitForm" className="indent-1 text-xl font-bold">
        모집폼 URL
      </label>
      <Input
        id="recruitForm"
        name="recruitForm"
        value={formData.recruitForm}
        onChange={(e) => handleChange('recruitForm', e.target.value)}
      />
      <label
        htmlFor="recruitPeriod"
        className="mt-4 flex gap-2 text-xl font-bold"
      >
        모집 기간
      </label>
      <SelectDate
        startDate={formData.recruitStart}
        endDate={formData.recruitEnd}
        onChange={handleChange}
      />
      <ImageUploadSection
        imageFiles={imageFiles}
        handleImageRemove={handleImageRemove}
        handleImageChange={handleImageChange}
        inputRef={inputRef}
      />
    </SafeForm>
  );
}

export default ClubDetailRecruitmentEdit;
