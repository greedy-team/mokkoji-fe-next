'use client';

import { useRef, useState } from 'react';

import { useSession } from '@/shared/lib/session-context';
import postCreateClubApplication from '../api/postCreateClubApplication';
import type { ClubCreateFormData } from '../model/type';
import ClubCreateDescriptionStep from './club-create-description-step';
import ClubCreateBasicStep from './club-create-basic-step';

export type { ClubCreateFormData };

type Step = 'basic' | 'description';

function ClubCreateForm() {
  const { session } = useSession();
  const [formData, setFormData] = useState<ClubCreateFormData>({
    clubName: '',
    universityCode: '',
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

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoPreview(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, logo: file.name }));
  };

  const handleNext = () => {
    setStep('description');
  };

  const handleSubmit = (description: string) => {
    postCreateClubApplication({
      ...formData,
      description,
      applicantName: session?.user.name ?? '',
    });
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
        <ClubCreateDescriptionStep onSubmit={handleSubmit} />
      )}
    </>
  );
}

export default ClubCreateForm;
