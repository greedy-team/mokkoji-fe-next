'use client';

import { useEffect, useReducer, useRef, useState } from 'react';
import { ClubInfoType } from '@/shared/model/type';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import useImageUpload from '@/shared/model/useImageUpload';
import ky from 'ky';
import { Button } from '@/shared/ui/button';
import DotsPulseLoader from '@/shared/ui/DotsPulseLoader';
import { PrevButton } from '@/shared/ui/navigation-button';
import { RecruitmentDetail } from '@/views/club/model/type';
import { FormField, RecruitmentFormData } from '../model/type';
import reducer, { initialState } from '../model/reducer/recruitmentFormReducer';
import postRecruitmentForm from '../api/postRecruitmentForm';
import patchRecruitmentForm from '../api/patchRecruitmentForm';
import StepRecruitmentPostInfo from './steps/step-recruitment-post-info';
import StepRecruitmentBasicInfo from './steps/step-recruitment-basic-info';

interface ClubInfoProp {
  clubInfo?: ClubInfoType;
  clubId?: number;
  action?: 'create' | 'edit';
  initialData?: RecruitmentDetail | null;
}

const step1Fields: FormField[] = [
  { label: '제목', name: 'title', type: 'input' },
  { label: '모집 시작일', name: 'recruitStart', type: 'date' },
  { label: '모집 마감일', name: 'recruitEnd', type: 'date' },
  { label: '모집 폼 링크', name: 'recruitForm', type: 'input' },
];

const step2Fields: FormField[] = [
  { label: '모집 공고', name: 'content', type: 'textarea' },
];

function AdminRecruitmentForm({
  clubInfo,
  clubId,
  action = 'create',
  initialData,
}: ClubInfoProp) {
  const router = useRouter();
  const isLoadingRef = useRef(false);
  const [targetStep, setTargetStep] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getInitialState = () => {
    if (action === 'edit' && initialData) {
      return {
        formData: {
          title: initialData.title,
          content: initialData.content,
          recruitStart: initialData.recruitStart,
          recruitEnd: initialData.recruitEnd,
          recruitForm: initialData.recruitForm,
          imageNames: [],
        },
        errors: {},
      };
    }
    return initialState;
  };

  const [state, dispatch] = useReducer(reducer, getInitialState());
  const { formData, errors } = state;

  const initialImageUrls =
    action === 'edit' && initialData ? initialData.imageUrls : [];

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
  } = useImageUpload(initialImageUrls);

  useEffect(() => {
    if (targetStep !== currentStep) {
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setCurrentStep(targetStep);
        setIsTransitioning(false);
      }, 300);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [targetStep, currentStep]);

  const handleChange = <K extends keyof RecruitmentFormData>(
    name: K,
    value: RecruitmentFormData[K],
  ) => {
    dispatch({ type: 'UPDATE_FIELD', name, value });
  };

  const handleBlur = (name: keyof RecruitmentFormData) => {
    dispatch({ type: 'VALIDATE_FIELD', name });
  };

  const isBasicInfoValid = () => {
    return step1Fields.every((field) => {
      const value = formData[field.name];
      const error = errors[field.name];
      return value && !error;
    });
  };

  const isPostInfoValid = () => {
    return step2Fields.every((field) => {
      const value = formData[field.name];
      const error = errors[field.name];
      return value && !error;
    });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    step1Fields.forEach((field) => {
      handleBlur(field.name);
    });

    if (isBasicInfoValid()) {
      setTargetStep(2);
    } else {
      toast.error('모든 필수 항목을 입력해주세요.');
    }
  };

  const handlePrevStep = () => {
    setTargetStep(1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    const data = {
      title: formData.title,
      content: formData.content,
      recruitStart: formData.recruitStart,
      recruitEnd: formData.recruitEnd,
      recruitForm: formData.recruitForm,
      imageNames: imageFiles.map((file) => file.imageName),
    };

    const res =
      action === 'edit' && initialData
        ? await patchRecruitmentForm(data, initialData.id)
        : await postRecruitmentForm(data, clubId!);

    if (!res.ok) {
      toast.error(res.message);
      isLoadingRef.current = false;
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
      isLoadingRef.current = false;
      return;
    }
    isLoadingRef.current = false;
    router.push('/recruit');
    toast.success(
      action === 'edit'
        ? '모집 공고가 성공적으로 수정되었습니다!'
        : '모집 공고가 성공적으로 업로드되었습니다!',
    );
  };

  return (
    <form
      className="flex flex-col gap-2 py-8"
      onSubmit={async (e) => {
        e.preventDefault();
        if (currentStep === 1) {
          handleNextStep(e);
        } else {
          await handleSubmit(e);
        }
      }}
    >
      <div
        className={`transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {currentStep === 1 && (
          <>
            <StepRecruitmentBasicInfo
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onBlur={handleBlur}
              clubInfo={clubInfo}
              imageFiles={imageFiles}
              handleImageChange={handleImageChange}
              handleImageRemove={handleImageRemove}
              inputRef={inputRef}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDragEnd={handleDragEnd}
              draggingId={draggingId}
              onDragOver={onDragOver}
              onDrop={onDrop}
            />
            {isLoadingRef.current ? (
              <DotsPulseLoader wrapperClassName="flex justify-center flex-col items-center mt-4" />
            ) : (
              <Button
                type="submit"
                variant="next"
                size="none"
                disabled={!isBasicInfoValid()}
                className="mt-13 w-full"
              >
                다음
              </Button>
            )}
          </>
        )}

        {currentStep === 2 && (
          <>
            <PrevButton
              onClick={handlePrevStep}
              className="fixed top-16 left-4 z-50 sm:left-8 lg:left-[150px]"
            />
            <StepRecruitmentPostInfo
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {isLoadingRef.current ? (
              <DotsPulseLoader wrapperClassName="flex justify-center flex-col items-center mt-4" />
            ) : (
              <Button
                type="submit"
                variant="submit"
                disabled={!isPostInfoValid()}
                className="mt-4 w-full"
              >
                {action === 'edit' ? '수정하기' : '등록하기'}
              </Button>
            )}
          </>
        )}
      </div>
    </form>
  );
}

export default AdminRecruitmentForm;
