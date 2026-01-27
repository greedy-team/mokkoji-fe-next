'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ky from 'ky';
import { ClubInfoType } from '@/shared/model/type';
import useImageUpload from '@/shared/model/useImageUpload';
import { Button } from '@/shared/ui/button';
import { PrevButton } from '@/shared/ui/navigation-button';
import DotsPulseLoader from '@/shared/ui/DotsPulseLoader';
import useRecruitmentForm from '@/features/admin-recruitment/util/useRecruitmentForm';
import postRecruitmentForm from '@/features/admin-recruitment/api/postRecruitmentForm';
import StepRecruitmentBasicInfo from '@/features/admin-recruitment/ui/steps/step-recruitment-basic-info';
import StepRecruitmentPostInfo from '@/features/admin-recruitment/ui/steps/step-recruitment-post-info';

import AdminPageHeader from '@/features/admin/ui/components/admin-page-header';
import useCreateFlow from './use-create-flow';

interface Props {
  clubId: number;
  clubInfo: ClubInfoType;
}

function CreateFlowContainer({ clubId, clubInfo }: Props) {
  const router = useRouter();
  const flow = useCreateFlow();
  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    isBasicInfoValid,
    isContentValid,
    handleNextStep,
  } = useRecruitmentForm({ onNextStep: flow.nextStep });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayStep, setDisplayStep] = useState(flow.currentStep);

  const imageUpload = useImageUpload([]);

  useEffect(() => {
    if (flow.currentStep !== displayStep) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayStep(flow.currentStep);
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [flow.currentStep, displayStep]);

  const handleSubmit = async () => {
    flow.setIsSubmitting(true);

    const data = {
      ...formData,
      imageNames: imageUpload.imageFiles.map((f) => f.imageName),
    };

    const res = await postRecruitmentForm(data, clubId);

    if (!res.ok) {
      toast.error(res.message);
      flow.setIsSubmitting(false);
      return;
    }

    const uploadUrls = res.data?.data?.uploadImageUrls ?? [];

    try {
      if (uploadUrls.length > 0) {
        await Promise.all(
          uploadUrls.map((url: string, i: number) =>
            ky.put(url, {
              body: imageUpload.imageFiles[i].file,
              headers: { 'Content-Type': imageUpload.imageFiles[i].file.type },
            }),
          ),
        );
      }
    } catch {
      toast.error('이미지 업로드에 실패했습니다.');
      flow.setIsSubmitting(false);
      return;
    }

    flow.setIsSubmitting(false);
    flow.complete();
    toast.success('모집 공고가 등록되었습니다!');
  };

  if (displayStep === 'complete') {
    return (
      <div className="flex flex-col items-center gap-6 py-20">
        <h2 className="text-2xl font-semibold">등록 완료!</h2>
        <p className="text-gray-400">모집 공고가 성공적으로 등록되었습니다.</p>
        <Button onClick={() => router.push('/club')}>모집글 확인하기</Button>
      </div>
    );
  }

  return (
    <div
      className={`px-[8%] transition-opacity duration-300 lg:px-[35%] ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {displayStep === 'basicInfo' && (
        <div className="flex flex-col gap-2 py-8">
          <AdminPageHeader
            title="모집글 기본 정보"
            onBack={() => router.push('/admin')}
          />
          <StepRecruitmentBasicInfo
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}
            clubInfo={clubInfo}
            imageFiles={imageUpload.imageFiles}
            handleImageChange={imageUpload.handleImageChange}
            handleImageRemove={imageUpload.handleImageRemove}
            inputRef={imageUpload.inputRef}
            handleDragStart={imageUpload.handleDragStart}
            handleDragOver={imageUpload.handleDragOver}
            handleDragEnd={imageUpload.handleDragEnd}
            draggingId={imageUpload.draggingId}
            onDragOver={imageUpload.onDragOver}
            onDrop={imageUpload.onDrop}
          />
          <Button
            type="button"
            variant="next"
            size="none"
            disabled={!isBasicInfoValid()}
            onClick={handleNextStep}
            className="mt-13 w-full"
          >
            다음
          </Button>
        </div>
      )}

      {displayStep === 'postinfo' && (
        <div className="flex flex-col gap-2 py-8">
          <PrevButton
            onClick={flow.prevStep}
            className="fixed top-16 left-4 z-50 sm:left-8 lg:left-[150px]"
          />
          {flow.isSubmitting ? (
            <DotsPulseLoader wrapperClassName="flex justify-center flex-col items-center mt-4" />
          ) : (
            <Button
              type="button"
              variant="submit"
              disabled={!isContentValid()}
              onClick={handleSubmit}
              className="self-end"
            >
              등록하기
            </Button>
          )}
          <span className="w-full border border-[#71717148]" />
          <StepRecruitmentPostInfo
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      )}
    </div>
  );
}

export default CreateFlowContainer;
