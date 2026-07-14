'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';
import useUniversityCode from '@/shared/hooks/useUniversityCode';
import { useSession } from '@/shared/lib/session-context';
import postCreateClubApplication from '../api/postCreateClubApplication';
import type { ClubCreateFormData } from '../model/type';
import ClubCreateDescriptionStep from './club-create-description-step';
import ClubCreateBasicStep from './club-create-basic-step';

export type { ClubCreateFormData };

type Step = 'basic' | 'description';

function ClubCreateForm() {
  const router = useRouter();
  const { session } = useSession();
  const universityCode = useUniversityCode();
  const [formData, setFormData] = useState<ClubCreateFormData>({
    clubName: '',
    universityCode: universityCode.toUpperCase(),
    clubCategory: '',
    clubAffiliation: '',
    logo: '',
    instagram: '',
    description: '',
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [step, setStep] = useState<Step>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoPreview(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, logo: file.name }));
  };

  const handleNext = () => {
    setStep('description');
  };

  const handleSubmit = async (description: string) => {
    setIsSubmitting(true);
    const result = await postCreateClubApplication({
      ...formData,
      description,
      applicantName: session?.user.name ?? '',
    });
    setIsSubmitting(false);
    if (result.ok) {
      toast.success(
        <span>
          제출되었습니다.
          <br />
          마이페이지에서 현황을 확인하실 수 있습니다.
        </span>,
      );
      router.push(`/${universityCode}/my`);
    } else {
      toast.error(result.message);
      router.push(`/${universityCode}`);
    }
  };

  return (
    <>
      {step === 'basic' && (
        <ClubCreateBasicStep
          formData={formData}
          setFormData={setFormData}
          logoPreview={logoPreview}
          logoInputRef={logoInputRef}
          handleLogoChange={handleLogoChange}
          isConfirmed={isConfirmed}
          setIsConfirmed={setIsConfirmed}
          onNext={handleNext}
        />
      )}
      {step === 'description' && (
        <ClubCreateDescriptionStep
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}

export default ClubCreateForm;
