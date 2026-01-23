'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ky from 'ky';
import { ClubInfoType } from '@/shared/model/type';
import useImageUpload from '@/shared/model/useImageUpload';
import { Button } from '@/shared/ui/button';
import AdminPageHeader from '@/features/admin/ui/components/admin-page-header';
import DotsPulseLoader from '@/shared/ui/DotsPulseLoader';
import useRecruitmentForm from '@/features/admin-recruitment/util/useRecruitmentForm';
import patchRecruitmentForm from '@/features/admin-recruitment/api/patchRecruitmentForm';
import deleteRecruitmentForm from '@/features/admin-recruitment/api/deleteRecruitmentForm';
import getRecruitmentDetail from '@/features/admin-recruitment/api/getRecruitmentDetail';
import StepRecruitmentBasicInfo from '@/features/admin-recruitment/ui/steps/step-recruitment-basic-info';
import StepRecruitmentPostInfo from '@/features/admin-recruitment/ui/steps/step-recruitment-post-info';
import StepSelectPost from '@/features/admin-recruitment/ui/steps/step-select-post';
import { ClubRecruitments, RecruitmentDetail } from '@/views/club/model/type';
import useEditFlow from './use-edit-flow';

interface Props {
  clubInfo: ClubInfoType;
  recruitments: ClubRecruitments[];
}

function EditFlowContainer({ clubInfo, recruitments }: Props) {
  const router = useRouter();
  const flow = useEditFlow();
  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    isBasicInfoValid,
    isContentValid,
    handleNextStep,
    setFormData,
  } = useRecruitmentForm({ onNextStep: flow.nextStep });

  const [recruitmentDetail, setRecruitmentDetail] =
    useState<RecruitmentDetail | null>(null);
  const [isLoadingRecruitmentDetail, setIsLoadingRecruitmentDetail] =
    useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayStep, setDisplayStep] = useState(flow.currentStep);
  const imageUpload = useImageUpload(recruitmentDetail?.imageUrls ?? []);
  const [isDeleting, setIsDeleting] = useState(false);
  const [localRecruitments, setLocalRecruitments] =
    useState<ClubRecruitments[]>(recruitments);

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

  const handleEdit = async (post: ClubRecruitments) => {
    setIsLoadingRecruitmentDetail(true);
    const recruitmentDetailData = await getRecruitmentDetail(post.id);

    if (!recruitmentDetailData) {
      toast.error('모집글 정보를 불러오는데 실패했습니다.');
      setIsLoadingRecruitmentDetail(false);
      return;
    }

    setRecruitmentDetail(recruitmentDetailData);
    setFormData({
      title: recruitmentDetailData.title,
      content: recruitmentDetailData.content,
      recruitStart: recruitmentDetailData.recruitStart,
      recruitEnd: recruitmentDetailData.recruitEnd,
      recruitForm: recruitmentDetailData.recruitForm,
    });

    setIsLoadingRecruitmentDetail(false);
    flow.startEdit(post);
  };

  const handleDelete = async (post: ClubRecruitments) => {
    setIsDeleting(true);
    const result = await deleteRecruitmentForm(post.id);

    if (result.ok) {
      toast.success('모집 공고가 삭제되었습니다.');
      setLocalRecruitments((prev) => prev.filter((r) => r.id !== post.id));
    } else {
      toast.error(result.message || '삭제에 실패했습니다.');
    }
    setIsDeleting(false);
  };

  const handleSubmit = async () => {
    if (!recruitmentDetail) return;

    flow.setSubmitting(true);

    const data = {
      ...formData,
      imageNames: imageUpload.imageFiles.map((f) => f.imageName),
    };

    const res = await patchRecruitmentForm(data, recruitmentDetail.id);

    if (!res.ok) {
      toast.error(res.message);
      flow.setSubmitting(false);
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
      flow.setSubmitting(false);
      return;
    }

    flow.setSubmitting(false);
    flow.complete();
    toast.success('모집 공고가 수정되었습니다!');
  };

  if (isLoadingRecruitmentDetail) {
    return (
      <div className="flex justify-center py-20">
        <DotsPulseLoader />
      </div>
    );
  }

  if (displayStep === 'selectPost') {
    return (
      <StepSelectPost
        recruitments={localRecruitments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
    );
  }

  if (displayStep === 'complete') {
    return (
      <div className="flex flex-col items-center gap-6 py-20">
        <h2 className="text-2xl font-semibold">수정 완료!</h2>
        <p className="text-gray-400">모집 공고가 성공적으로 수정되었습니다.</p>
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
            onBack={flow.goToSelectPost}
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
          <AdminPageHeader title="모집글" onBack={flow.goToSelectPost} />
          {flow.isSubmitting ? (
            <DotsPulseLoader wrapperClassName="flex justify-center flex-col items-center mt-4" />
          ) : (
            <Button
              type="button"
              variant="submit"
              size="none"
              disabled={!isContentValid()}
              onClick={handleSubmit}
              className="self-end"
            >
              수정하기
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

export default EditFlowContainer;
