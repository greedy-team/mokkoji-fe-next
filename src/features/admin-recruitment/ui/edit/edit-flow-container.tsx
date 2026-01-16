'use client';

import { useReducer, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ky from 'ky';
import { ClubInfoType } from '@/shared/model/type';
import useImageUpload from '@/shared/model/useImageUpload';
import { Button } from '@/shared/ui/button';
import { PrevButton } from '@/shared/ui/navigation-button';
import DotsPulseLoader from '@/shared/ui/DotsPulseLoader';

import reducer, {
  initialState,
} from '@/features/admin-recruitment/model/reducer/recruitmentFormReducer';
import { RecruitmentFormData } from '@/features/admin-recruitment/model/type';
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

const BASIC_FIELDS: (keyof RecruitmentFormData)[] = [
  'title',
  'recruitStart',
  'recruitEnd',
  'recruitForm',
];
const CONTENT_FIELDS: (keyof RecruitmentFormData)[] = ['content'];

function EditFlowContainer({ clubInfo, recruitments }: Props) {
  const router = useRouter();
  const flow = useEditFlow();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formData, errors } = state;
  const [recruitmentDetail, setRecruitmentDetail] =
    useState<RecruitmentDetail | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
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
    setIsLoadingDetail(true);
    const detail = await getRecruitmentDetail(post.id);

    if (!detail) {
      toast.error('모집글 정보를 불러오는데 실패했습니다.');
      setIsLoadingDetail(false);
      return;
    }

    setRecruitmentDetail(detail);

    dispatch({ type: 'UPDATE_FIELD', name: 'title', value: detail.title });
    dispatch({ type: 'UPDATE_FIELD', name: 'content', value: detail.content });
    dispatch({
      type: 'UPDATE_FIELD',
      name: 'recruitStart',
      value: detail.recruitStart,
    });
    dispatch({
      type: 'UPDATE_FIELD',
      name: 'recruitEnd',
      value: detail.recruitEnd,
    });
    dispatch({
      type: 'UPDATE_FIELD',
      name: 'recruitForm',
      value: detail.recruitForm,
    });

    setIsLoadingDetail(false);
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
    return BASIC_FIELDS.every((field) => formData[field] && !errors[field]);
  };

  const isContentValid = () => {
    return CONTENT_FIELDS.every((field) => formData[field] && !errors[field]);
  };

  const handleNextStep = () => {
    BASIC_FIELDS.forEach(handleBlur);
    if (isBasicInfoValid()) {
      flow.nextStep();
    } else {
      toast.error('모든 필수 항목을 입력해주세요.');
    }
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

  if (isLoadingDetail) {
    return (
      <div className="flex justify-center py-20">
        <DotsPulseLoader />
      </div>
    );
  }

  if (displayStep === 'selectPost') {
    return (
      <>
        <PrevButton
          onClick={() => router.push('/admin')}
          className="fixed top-16 left-4 z-50 sm:left-8 lg:left-[150px]"
        />
        <StepSelectPost
          recruitments={localRecruitments}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      </>
    );
  }

  if (displayStep === 'complete') {
    return (
      <div className="flex flex-col items-center gap-6 py-20">
        <h2 className="text-2xl font-semibold">수정 완료!</h2>
        <p className="text-gray-400">모집 공고가 성공적으로 수정되었습니다.</p>
        <Button onClick={() => router.push('/recruit')}>모집글 확인하기</Button>
      </div>
    );
  }

  return (
    <div
      className={`px-[35%] transition-opacity duration-300 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <h1 className="text-[28px] font-bold">모집 공고</h1>
      <PrevButton
        onClick={flow.goToSelectPost}
        className="fixed top-16 left-4 z-50 sm:left-8 lg:left-[150px]"
      />
      {displayStep === 'basicInfo' && (
        <div className="flex flex-col gap-2 py-8">
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
          <StepRecruitmentPostInfo
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {flow.isSubmitting ? (
            <DotsPulseLoader wrapperClassName="flex justify-center flex-col items-center mt-4" />
          ) : (
            <Button
              type="button"
              variant="submit"
              disabled={!isContentValid()}
              onClick={handleSubmit}
              className="mt-4 w-full"
            >
              수정하기
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default EditFlowContainer;
