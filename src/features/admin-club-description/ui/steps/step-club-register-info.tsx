import Input from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { ClubAffiliationLabel, ClubCategoryLabel } from '@/shared/model/type';
import { ClubFormData } from '../../model/type';

interface StepClubRegisterInfoProps {
  formData: ClubFormData;
  errors: Partial<Record<keyof ClubFormData, string>>;
  onChange: (name: keyof ClubFormData, value: string) => void;
  onBlur: (name: keyof ClubFormData) => void;
}

function StepClubRegisterInfo({
  formData,
  errors,
  onChange,
  onBlur,
}: StepClubRegisterInfoProps) {
  return (
    <div className="flex flex-col gap-7 lg:gap-10">
      <fieldset className="flex flex-col gap-1.5">
        <label
          htmlFor="name"
          className="flex items-center gap-3 text-base font-medium lg:font-semibold"
        >
          동아리 이름
          {errors.name && (
            <p className="pt-1 text-xs font-medium text-red-500">
              {errors.name}
            </p>
          )}
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          variant={errors.name ? 'error' : 'default'}
          onChange={(e) => onChange('name', e.target.value)}
          onBlur={() => onBlur('name')}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-1.5">
        <label
          htmlFor="category"
          className="flex items-center gap-3 text-base font-medium lg:font-semibold"
        >
          카테고리
          {errors.category && (
            <p className="pt-1 text-xs font-medium text-red-500">
              {errors.category}
            </p>
          )}
        </label>
        <div className="mt-2 flex flex-wrap gap-3 lg:gap-5">
          {Object.entries(ClubCategoryLabel).map(([key, label]) => (
            <Button
              variant={
                formData.category === key ? 'optionsSelected' : 'options'
              }
              size="none"
              key={`category-${key}`}
              type="button"
              onClick={() => onChange('category', key)}
              onBlur={() => onBlur('category')}
            >
              {label}
            </Button>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-1.5">
        <label
          htmlFor="affiliation"
          className="flex items-center gap-3 text-base font-medium lg:font-semibold"
        >
          소속
          {errors.affiliation && (
            <p className="pt-1 text-xs font-medium text-red-500">
              {errors.affiliation}
            </p>
          )}
        </label>
        <div className="mt-2 flex flex-wrap gap-3 lg:gap-5">
          {Object.entries(ClubAffiliationLabel).map(([key, label]) => (
            <Button
              variant={
                formData.affiliation === key ? 'optionsSelected' : 'options'
              }
              size="none"
              key={`affiliation-${key}`}
              type="button"
              onClick={() => onChange('affiliation', key)}
              onBlur={() => onBlur('affiliation')}
            >
              {label}
            </Button>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-1.5">
        <label
          htmlFor="clubMasterStudentId"
          className="flex items-center gap-3 text-base font-medium lg:font-semibold"
        >
          동아리 회장 학번
          {errors.clubMasterStudentId && (
            <p className="pt-1 text-xs font-medium text-red-500">
              {errors.clubMasterStudentId}
            </p>
          )}
        </label>
        <Input
          id="clubMasterStudentId"
          name="clubMasterStudentId"
          value={formData.clubMasterStudentId}
          placeholder="8자리 학번을 입력해주세요"
          variant={errors.clubMasterStudentId ? 'error' : 'default'}
          onChange={(e) => onChange('clubMasterStudentId', e.target.value)}
          onBlur={() => onBlur('clubMasterStudentId')}
        />
      </fieldset>
    </div>
  );
}

export default StepClubRegisterInfo;
