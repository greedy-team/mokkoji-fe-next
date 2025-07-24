'use client';

import Input from '@/shared/ui/input';
import Textarea from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import { ClubAffiliationLabel, ClubCategoryLabel } from '@/shared/model/type';
import { ClubInputProps } from '../model/type';

function ClubInput({
  label,
  name,
  value,
  type,
  onChange,
  error,
  onBlur,
}: ClubInputProps) {
  return (
    <div className="flex flex-col gap-1.5 py-2">
      <label
        htmlFor={name}
        className="flex items-center gap-3 text-base font-bold"
      >
        {label}
        {error && (
          <p className="pt-1 text-xs font-medium text-red-500">{error}</p>
        )}
      </label>

      {type === 'input' && (
        <Input
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          variant={error ? 'error' : 'default'}
          className="transition-colors duration-300"
          onBlur={() => onBlur(name)}
        />
      )}

      {type === 'textarea' && (
        <>
          <p className="text-xs text-[#00D451]">600자 이내로 작성해주세요!</p>
          <Textarea
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            variant={error ? 'error' : 'default'}
            maxLength={600}
            className="transition-colors duration-300"
            onBlur={() => onBlur(name)}
          />
          <p className="text-end text-xs text-[#474747]">
            {value.length} <span className="text-[#CCCCCC]">/ 600자</span>
          </p>
        </>
      )}

      {type === 'options' && (
        <div className="mt-2 flex flex-wrap gap-5">
          {Object.entries(
            name === 'category' ? ClubCategoryLabel : ClubAffiliationLabel,
          ).map(([key, itemLabel]) => (
            <Button
              variant={value === key ? 'optionsSelected' : 'options'}
              size="none"
              key={key}
              type="button"
              onClick={() => onChange(name, key)}
              onBlur={() => onBlur(name)}
            >
              {itemLabel}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClubInput;
