'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button } from '@/shared/ui/button';
import { PrevButton } from '@/shared/ui/navigation-button';
import DotsPulseLoader from '@/shared/ui/DotsPulseLoader';
import useClubRegisterForm from '@/features/admin-club-description/util/useClubRegisterForm';
import { postClubRegister } from '@/features/admin-club-description/api/postClubRegister';
import AdminPageHeader from '@/features/admin/ui/components/admin-page-header';
import useCreateFlow from './use-create-flow';
import StepClubRegisterInfo from '../steps/step-club-register-info';

function CreateFlowContainer() {
  const router = useRouter();
  const flow = useCreateFlow();
  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    isRegisterInfoValid,
    validateAll,
  } = useClubRegisterForm();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayStep, setDisplayStep] = useState(flow.currentStep);

  useEffect(() => {
    if (flow.currentStep !== displayStep) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayStep(flow.currentStep);
        setIsTransitioning(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [flow.currentStep, displayStep]);

  const handleSubmit = async () => {
    validateAll();

    if (!isRegisterInfoValid()) {
      toast.error('모든 필수 항목을 입력해주세요.');
      return;
    }

    flow.setSubmitting(true);

    const data = {
      name: formData.name,
      category: formData.category,
      affiliation: formData.affiliation,
      clubMasterStudentId: formData.clubMasterStudentId,
    };

    const res = await postClubRegister(data);

    if (!res.ok) {
      toast.error(res.message);
      flow.setSubmitting(false);
      return;
    }

    flow.setSubmitting(false);
    flow.complete();
    toast.success('동아리가 등록되었습니다!');
  };

  if (displayStep === 'complete') {
    return (
      <div className="flex flex-col items-center gap-6 py-20">
        <h2 className="text-2xl font-semibold">등록 완료!</h2>
        <p className="text-gray-400">동아리가 성공적으로 등록되었습니다.</p>
        <Button onClick={() => router.push('/club')}>동아리 확인하기</Button>
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
            title="동아리 기본 정보"
            onBack={() => router.back()}
          />
          <StepClubRegisterInfo
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
              variant="next"
              size="none"
              disabled={!isRegisterInfoValid()}
              onClick={handleSubmit}
              className="mt-13 w-full"
            >
              등록하기
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default CreateFlowContainer;
