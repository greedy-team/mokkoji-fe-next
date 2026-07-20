'use client';

import useUniversityCode from '@/shared/hooks/useUniversityCode';

import { useReducer } from 'react';
import { toast } from 'react-toastify';
import useServerAction from '@/shared/hooks/useServerAction';
import { ClubInfoType } from '@/shared/model/type';
import Input from '@/shared/ui/input';
import Textarea from '@/shared/ui/textarea';
import DateRangePicker from '@/shared/ui/calendar/date-range-picker';
import ky from 'ky';
import { useRouter } from 'next/navigation';
import SafeForm from '@/shared/ui/safe-form';
import useImageUpload from '@/shared/model/useImageUpload';
import ImageUploadSection from '@/shared/ui/image-upload-section';
import { RecruitmentFormField, RecruitmentFormData } from '../model/type';
import recruitmentFormReducer, {
  initialState,
} from '../model/reducer/recruitmentFormReducer';
import isFormValid from '../util/isFormValid';
import postRecruitmentForm from '../api/postRecruitmentForm';

interface ClubInfoProp {
  clubInfo?: ClubInfoType;
  clubId?: number;
}

const fields: RecruitmentFormField[] = [
  { label: '제목', name: 'title', type: 'input' },
  { label: '모집 공고', name: 'content', type: 'textarea' },
  { label: '모집 시작일', name: 'recruitStart', type: 'date' },
  { label: '모집 마감일', name: 'recruitEnd', type: 'date' },
  { label: '모집 폼 링크', name: 'recruitForm', type: 'input' },
];

function PostRecruitmentForm({ clubInfo, clubId }: ClubInfoProp) {
  const [state, dispatch] = useReducer(recruitmentFormReducer, initialState);
  const {
    imageFiles,
    handleImageChange,
    handleImageRemove,
    inputRef,
    handleSortEnd,
    onDragOver,
    onDrop,
  } = useImageUpload();
  const { formData, errors } = state;
  const router = useRouter();
  const universityCode = useUniversityCode();
  const { mutate, isPending } = useServerAction(postRecruitmentForm, {
    showSuccessToast: false,
    onSuccess: async (data) => {
      const uploadUrls = data?.data?.uploadImageUrls ?? [];

      try {
        if (uploadUrls.length > 0) {
          await Promise.all(
            uploadUrls.map((url: string, index: number) =>
              ky.put(url, {
                body: imageFiles[index].file,
                headers: { 'Content-Type': imageFiles[index].file.type },
              }),
            ),
          );
        }
      } catch {
        toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        return;
      }
      router.push(`/${universityCode}/club`);
      toast.success('모집 공고가 성공적으로 업로드되었습니다!');
    },
  });

  const handleChange = (name: keyof RecruitmentFormData, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', name, value });
  };

  const handleBlur = (name: keyof RecruitmentFormData) => {
    dispatch({ type: 'VALIDATE_FIELD', name });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;

    await mutate(
      {
        title: formData.title,
        content: formData.content,
        recruitStart: formData.recruitStart,
        recruitEnd: formData.recruitEnd,
        recruitForm: formData.recruitForm,
        imageNames: imageFiles.map((file) => file.imageName),
      },
      clubId!,
    );
  };

  const isValid = isFormValid({ formData, errors }, fields);

  return (
    <SafeForm
      onSubmit={handleSubmit}
      submitLabel="등록하기"
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
      <DateRangePicker
        startDate={formData.recruitStart}
        endDate={formData.recruitEnd}
        onStartDateChange={(date) => handleChange('recruitStart', date)}
        onEndDateChange={(date) => handleChange('recruitEnd', date)}
        onRangeComplete={() => {
          handleBlur('recruitStart');
          handleBlur('recruitEnd');
        }}
        label="모집 기간"
      />
      <ImageUploadSection
        imageFiles={imageFiles}
        handleImageRemove={handleImageRemove}
        handleImageChange={handleImageChange}
        inputRef={inputRef}
        handleSortEnd={handleSortEnd}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    </SafeForm>
  );
}

export default PostRecruitmentForm;
