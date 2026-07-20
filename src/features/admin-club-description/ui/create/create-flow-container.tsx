'use client';

import useUniversityCode from '@/shared/hooks/useUniversityCode';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button } from '@/shared/ui/button';
import DotsPulseLoader from '@/shared/ui/DotsPulseLoader';
import SharedLoading from '@/shared/ui/loading';
import useServerAction from '@/shared/hooks/useServerAction';
import useClubRegisterForm from '@/features/admin-club-description/util/useClubRegisterForm';
import { postClubRegister } from '@/features/admin-club-description/api/postClubRegister';
import AdminPageHeader from '@/features/admin/ui/components/admin-page-header';
import useCreateFlow from './use-create-flow';
import StepClubRegisterInfo from '../steps/step-club-register-info';

function CreateFlowContent() {
  const router = useRouter();
  const universityCode = useUniversityCode();
  const flow = useCreateFlow();
  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    isRegisterInfoValid,
    validateAll,
  } = useClubRegisterForm();

  const { mutate, isPending } = useServerAction(postClubRegister, {
    onSuccess: () => flow.complete(),
  });

  const handleSubmit = async () => {
    validateAll();

    if (!isRegisterInfoValid()) {
      toast.error('모든 필수 항목을 입력해주세요.');
      return;
    }

    await mutate({
      name: formData.name,
      category: formData.category,
      affiliation: formData.affiliation,
      clubMasterStudentId: formData.clubMasterStudentId,
    });
  };

  if (flow.currentStep === 'completeCreateStep') {
    return (
      <div className="flex flex-col items-center gap-6 py-20">
        <h2 className="text-2xl font-semibold">등록 완료!</h2>
        <p className="text-gray-400">동아리가 성공적으로 등록되었습니다.</p>
        <Button onClick={() => router.push(`/${universityCode}/club`)}>
          동아리 확인하기
        </Button>
      </div>
    );
  }

  return (
    <div className="px-[8%] lg:px-[35%]">
      {flow.currentStep === 'basicInfoCreateStep' && (
        <div className="flex flex-col gap-2 py-8">
          <AdminPageHeader title="동아리 기본 정보" />
          <StepClubRegisterInfo
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {isPending ? (
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

function CreateFlowContainer() {
  return (
    <Suspense fallback={<SharedLoading />}>
      <CreateFlowContent />
    </Suspense>
  );
}

export default CreateFlowContainer;
