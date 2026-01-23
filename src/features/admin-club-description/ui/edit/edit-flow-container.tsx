'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ky from 'ky';
import {
  ClubInfoType,
  ClubCategoryLabel,
  ClubAffiliationLabel,
} from '@/shared/model/type';
import getKeyByValue from '@/shared/lib/getKeyByValue';
import { Button } from '@/shared/ui/button';
import DotsPulseLoader from '@/shared/ui/DotsPulseLoader';
import useClubForm from '@/features/admin-club-description/util/useClubForm';
import { patchClubInfo } from '@/features/admin-club-description/api/postClubRegister';
import AdminPageHeader from '@/features/admin/ui/components/admin-page-header';
import useEditFlow from './use-edit-flow';
import StepClubBasicInfo from '../steps/step-club-basic-info';
import StepClubDescription from '../steps/step-club-description';

interface Props {
  clubInfo: ClubInfoType;
  clubId: number;
}

function EditFlowContainer({ clubInfo, clubId }: Props) {
  const router = useRouter();
  const flow = useEditFlow();
  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    isBasicInfoValid,
    isDescriptionValid,
    handleNextStep,
    setFormData,
  } = useClubForm({ onNextStep: flow.nextStep });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayStep, setDisplayStep] = useState(flow.currentStep);

  useEffect(() => {
    setFormData({
      name: clubInfo.name,
      category: getKeyByValue(ClubCategoryLabel, clubInfo.category) || '',
      affiliation:
        getKeyByValue(ClubAffiliationLabel, clubInfo.affiliation) || '',
      description: clubInfo.description ?? '',
      instagram: clubInfo.instagram ?? '',
      logo: clubInfo.logo ?? '',
    });
    setPreview(clubInfo.logo ?? null);
  }, [clubInfo, setFormData]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    setLogoFile(file);
    handleChange('logo', file.name);
  };

  const handleLogoClick = () => {
    inputRef.current?.click();
  };

  const handleSubmit = async () => {
    flow.setSubmitting(true);

    const data = {
      name: formData.name,
      category: formData.category,
      affiliation: formData.affiliation,
      description: formData.description,
      instagram: formData.instagram,
      logo: formData.logo ?? '',
    };

    const res = await patchClubInfo(clubId, data);

    if (!res.ok) {
      toast.error(res.message);
      flow.setSubmitting(false);
      return;
    }

    if (logoFile && res.data && res.data.data?.updateLogo) {
      try {
        const resUpdateLogo = await ky.put(res.data.data.updateLogo, {
          body: logoFile,
          headers: {
            'Content-Type': logoFile.type,
          },
        });
        if (!resUpdateLogo.ok) {
          toast.error('로고 업데이트 실패!');
          flow.setSubmitting(false);
          return;
        }
      } catch {
        toast.error('로고 업로드에 실패했습니다.');
        flow.setSubmitting(false);
        return;
      }
    }

    if (res.data && res.data.data?.deleteLogo) {
      try {
        const resDeleteLogo = await ky.delete(res.data.data.deleteLogo);
        if (!resDeleteLogo.ok) {
          toast.error('로고 삭제 실패!');
          flow.setSubmitting(false);
          return;
        }
      } catch {
        toast.error('로고 삭제에 실패했습니다.');
        flow.setSubmitting(false);
        return;
      }
    }

    flow.setSubmitting(false);
    flow.complete();
    toast.success('동아리 정보가 수정되었습니다!');
  };

  if (displayStep === 'complete') {
    return (
      <div className="flex flex-col items-center gap-6 py-20">
        <h2 className="text-2xl font-semibold">수정 완료!</h2>
        <p className="text-gray-400">
          동아리 정보가 성공적으로 수정되었습니다.
        </p>
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
            onBack={() => router.push('/admin')}
          />
          <StepClubBasicInfo
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}
            preview={preview}
            onLogoClick={handleLogoClick}
            onFileChange={handleFileChange}
            inputRef={inputRef}
          />
          <Button
            type="button"
            variant="next"
            size="none"
            disabled={!isBasicInfoValid()}
            onClick={handleNextStep}
            className="mt-13 w-full bg-[#1AE166] transition-colors duration-200 hover:bg-[#00c94c]"
          >
            다음
          </Button>
        </div>
      )}

      {displayStep === 'description' && (
        <div className="flex flex-col gap-2 py-8">
          <AdminPageHeader title="동아리 소개" onBack={() => flow.prevStep()} />
          {flow.isSubmitting ? (
            <DotsPulseLoader wrapperClassName="flex justify-center flex-col items-center mt-4" />
          ) : (
            <Button
              type="button"
              variant="submit"
              disabled={!isDescriptionValid()}
              onClick={handleSubmit}
              className="self-end"
            >
              수정하기
            </Button>
          )}
          <span className="w-full border border-[#71717148]" />
          <StepClubDescription
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
