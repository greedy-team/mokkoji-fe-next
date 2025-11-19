'use client';

import SafeForm from '@/shared/ui/safe-form';
import Input from '@/shared/ui/input';
import Textarea from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import CalenderBody from '@/shared/ui/calender/calender-body';
import useCalender from '@/shared/ui/calender/useCalender';
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
  content: string;
  recruitForm: string;
  recruitStart: string;
  recruitEnd: string;
  clubId: number;
  setIsEditing: (isEditing: boolean) => void;
}

function ClubDetailRecruitmentEdit({
  title,
  content,
  recruitForm,
  recruitStart,
  recruitEnd,
  clubId,
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
    onDragOver,
    onDrop,
  } = useImageUpload(imageUrls);

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
      <div className="relative" ref={calendarRef}>
        <label
          htmlFor="recruitPeriod"
          className="mt-4 flex gap-2 text-xl font-bold"
        >
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
      <label htmlFor="image" className="mt-4 text-xl font-bold">
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

export default ClubDetailRecruitmentEdit;
