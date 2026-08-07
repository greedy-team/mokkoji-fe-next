'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import ky from 'ky';
import { toast } from 'react-toastify';
import useUniversityCode from '@/shared/hooks/useUniversityCode';
import useServerAction from '@/shared/hooks/useServerAction';
import { useSession } from '@/shared/lib/session-context';
import { toApiCode } from '@/shared/lib/urlCodeConverter';
import convertImageToWebp, {
  LOGO_MAX_DIMENSION,
} from '@/shared/lib/convertImageToWebp';
import type { University } from '@/entities/university/model/type';
import postCreateClubApplication from '../api/postCreateClubApplication';
import type { ClubCreateFormData } from '../model/type';
import ClubCreateDescriptionStep from './club-create-description-step';
import ClubCreateBasicStep from './club-create-basic-step';

export type { ClubCreateFormData };

type Step = 'basic' | 'description';

interface ClubCreateFormProps {
  universities: University[];
}

function ClubCreateForm({ universities }: ClubCreateFormProps) {
  const router = useRouter();
  const { session } = useSession();
  const universityCode = useUniversityCode();
  const [formData, setFormData] = useState<ClubCreateFormData>({
    clubName: '',
    universityCode: toApiCode(universityCode),
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

  const { mutate: createClubApplication, isPending: isSubmitting } =
    useServerAction(postCreateClubApplication, {
      showSuccessToast: false,
      onError: () => {
        router.push(`/${universityCode}`);
      },
      onSuccess: async (data) => {
        const uploadLogoUrl = data?.data?.uploadLogoUrl;
        if (logoFile && uploadLogoUrl) {
          const uploadLogoResult = await ky.put(uploadLogoUrl, {
            body: logoFile,
            headers: { 'Content-Type': logoFile.type },
          });
          if (!uploadLogoResult.ok) {
            toast.error('로고 업로드에 실패했습니다.');
            return;
          }
        }

        toast.success(
          <span>
            제출되었습니다.
            <br />
            마이페이지에서 현황을 확인하실 수 있습니다.
          </span>,
        );
        router.push(`/${universityCode}/my`);
      },
    });

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const webpFile = await convertImageToWebp(file, LOGO_MAX_DIMENSION);
    setLogoPreview(URL.createObjectURL(webpFile));
    setLogoFile(webpFile);
    setFormData((prev) => ({ ...prev, logo: webpFile.name }));
  };

  const handleNext = () => {
    setStep('description');
  };

  const handleSubmit = async (description: string) => {
    await createClubApplication({
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
          universities={universities}
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
