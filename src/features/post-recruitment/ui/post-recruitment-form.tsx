'use client';

import { useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import { ClubInfoType } from '@/shared/model/type';
import Input from '@/shared/ui/input';
import Textarea from '@/shared/ui/textarea';
import CalenderBody from '@/shared/ui/calender/calender-body';
import useCalender from '@/shared/ui/calender/useCalender';
import cn from '@/shared/lib/utils';
import ky from 'ky';
import { useRouter } from 'next/navigation';
import SafeForm from '@/shared/ui/safe-form';
import useImageUpload from '@/shared/model/useImageUpload';
import ImageUploadSection from '@/shared/ui/image-upload-section';
import { FormField, RecruitmentFormData } from '../model/type';
import reducer, { initialState } from '../model/reducer/recruitmentFormReducer';
import isFormValid from '../util/isFormValid';
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
];

function PostRecruitmentForm({ clubInfo, clubId }: ClubInfoProp) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    imageFiles,
    handleImageChange,
    handleImageRemove,
    inputRef,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    draggingId,
    onDragOver,
    onDrop,
  } = useImageUpload();
  const { formData, errors } = state;
  const router = useRouter();

  const handleChange = (name: keyof RecruitmentFormData, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', name, value });
  };

  const {
    isCalenderOpen,
    isCalenderClosing,
    calendarRef,
    closeCalender,
    toggleCalender,
    handleDateSelect: handleCalenderDateSelect,
    formatDateRange,
  } = useCalender({
    onStartDateChange: (date) => handleChange('recruitStart', date),
    onEndDateChange: (date) => handleChange('recruitEnd', date),
    onRangeComplete: () => {
      handleBlur('recruitStart');
      handleBlur('recruitEnd');
    },
  });

  const handleDateSelect = (selectedDate: Date) => {
    handleCalenderDateSelect(
      selectedDate,
      formData.recruitStart,
      formData.recruitEnd,
    );
  };

  const handleBlur = (name: keyof RecruitmentFormData) => {
    dispatch({ type: 'VALIDATE_FIELD', name });
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
      imageNames: imageFiles.map((file) => file.imageName),
    };

    const res = await postRecruitmentForm(data, clubId!);

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
    setIsSubmitting(false);
    router.push('/recruit');
    toast.success('모집 공고가 성공적으로 업로드되었습니다!');
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
      <div className="relative" ref={calendarRef}>
        <label htmlFor="recruitPeriod" className="mt-4 flex gap-2 font-bold">
          모집 기간
        </label>
        <button
          type="button"
          className="mt-1 flex w-full cursor-pointer items-center justify-center gap-1 rounded-md border-2 py-3 text-xs text-gray-700 transition-colors duration-300 focus:border-[#00D451] lg:gap-1 lg:px-2 lg:text-sm"
          onClick={toggleCalender}
        >
          {formatDateRange(formData.recruitStart, formData.recruitEnd)}
        </button>
        {isCalenderOpen && (
          <div
            className={cn(
              'absolute z-50 mt-1 min-w-full origin-top rounded-lg border bg-white p-4 text-center shadow-2xl',
              isCalenderClosing ? 'animate-scale-out' : 'animate-scale-in',
            )}
          >
            <CalenderBody
              onDateSelect={handleDateSelect}
              startDate={formData.recruitStart}
              endDate={formData.recruitEnd}
            />
            <button
              type="button"
              className="mt-5 w-[90%] cursor-pointer rounded-md bg-[#00D451] py-2 font-bold text-white hover:bg-[#00d451cf]"
              onClick={closeCalender}
            >
              닫기
            </button>
          </div>
        )}
      </div>
      <ImageUploadSection
        imageFiles={imageFiles}
        handleImageRemove={handleImageRemove}
        handleImageChange={handleImageChange}
        inputRef={inputRef}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDragEnd={handleDragEnd}
        draggingId={draggingId}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    </SafeForm>
  );
}

export default PostRecruitmentForm;
