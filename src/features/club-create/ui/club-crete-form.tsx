'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import useFormDraft from '@/shared/hooks/useFormDraft';
import {
  deserializeFile,
  serializeFile,
  type SerializedFile,
} from '@/shared/lib/formDraftStorage';
import uploadToPresignedUrl from '@/shared/api/uploadToPresignedUrl';
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

const DRAFT_KEY = 'club-create';

interface ClubCreateDraft {
  formData: ClubCreateFormData;
  step: Step;
  isConfirmed: boolean;
  logo: SerializedFile | null;
}

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
  const [logoDraft, setLogoDraft] = useState<SerializedFile | null>(null);

  const clearDraft = useFormDraft<ClubCreateDraft>({
    key: DRAFT_KEY,
    value: { formData, step, isConfirmed, logo: logoDraft },
    onRestore: (draft) => {
      setFormData(draft.formData);
      setStep(draft.step);
      setIsConfirmed(draft.isConfirmed);

      if (draft.logo) {
        const file = deserializeFile(draft.logo);
        setLogoDraft(draft.logo);
        setLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
      }
    },
  });

  const { mutate: createClubApplication, isPending: isSubmitting } =
    useServerAction(postCreateClubApplication, {
      showSuccessToast: false,
      onError: () => {
        router.push(`/${universityCode}`);
      },
      onSuccess: async (data) => {
        const uploadLogoUrl = data?.data?.uploadLogoUrl;
        if (logoFile && uploadLogoUrl) {
          const uploadLogoResult = await uploadToPresignedUrl(
            uploadLogoUrl,
            logoFile,
          );
          if (!uploadLogoResult.ok) {
            toast.error('로고 업로드에 실패했습니다.');
            return;
          }
        }

        clearDraft();
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
    setLogoDraft(await serializeFile(webpFile));
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

  const handleDescriptionChange = (description: string) => {
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
          universities={universities}
        />
      )}
      {step === 'description' && (
        <ClubCreateDescriptionStep
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          initialContent={formData.description}
          onContentChange={handleDescriptionChange}
        />
      )}
    </>
  );
}

export default ClubCreateForm;
