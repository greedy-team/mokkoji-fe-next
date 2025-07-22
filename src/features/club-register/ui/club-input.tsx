'use client';

import Input from '@/shared/ui/input';
import { ClubInputProps } from '../model/type';

function ClubInput({ label, name, value, onChange }: ClubInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        variant="default"
      />
    </div>
  );
}

export default ClubInput;
