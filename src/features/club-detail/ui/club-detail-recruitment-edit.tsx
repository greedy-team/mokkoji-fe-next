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
      content,
      recruitStart,
      recruitEnd,
      recruitForm,
      imageNames: imageUrls.map((url) => url.split('/').pop()!.split('?')[0]),
    },
    errors: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { formData, errors } = state;
  const {
    imageFiles,
    handleImageChange,
    handleImageRemove,
    inputRef,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    draggingId,
  } = useImageUpload(imageUrls);

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
      imageNames: imageFiles.map((file) => file.imageName),
    };

    const res = await patchRecruitmentForm(data, clubId!);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    const uploadUrls = res.data?.data?.uploadImageUrls ?? [];

    try {
      if (uploadUrls.length > 0) {
        await Promise.all(
          uploadUrls.map((url: string, i: number) =>
            ky.put(url, {
              body: imageFiles[i].file,
              headers: { 'Content-Type': imageFiles[i].file.type },
            }),
          ),
        );
      }
    } catch (error) {
      toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      return;
    }
    setIsEditing(false);
    toast.success('모집 공고가 성공적으로 수정되었습니다!');
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
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDragEnd={handleDragEnd}
        draggingId={draggingId}
        imageFiles={imageFiles}
        handleImageRemove={handleImageRemove}
        handleImageChange={handleImageChange}
        inputRef={inputRef}
      />
    </SafeForm>
  );
}

export default ClubDetailRecruitmentEdit;
