'use client';

import { useRef, useState } from 'react';

import ClubCreateDescriptionStep from './club-create-description-step';
import ClubCreateBasicStep from './club-create-basic-step';

export interface ClubCreateFormData {
  universityCode: string;
  applicantName: string;
  clubName: string;
  clubCategory: string;
  clubAffiliation: string;
  logo: string;
  instagram: string;
  description: string;
}

type Step = 'basic' | 'description';

function ClubCreateForm() {
  const [formData, setFormData] = useState<ClubCreateFormData>({
    clubName: '',
    universityCode: '',
    applicantName: '',
    clubCategory: '',
    clubAffiliation: '',
    logo: '',
    instagram: '',
    description: '',
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [step, setStep] = useState<Step>('basic');

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, logo: file.name }));
  };

  const handleNext = () => {
    setStep('description');
  };

  const handleSubmit = (description: string) => {
    setFormData((prev) => ({ ...prev, description }));
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
